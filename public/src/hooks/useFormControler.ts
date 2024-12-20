import { useDispatch, useSelector } from "react-redux";
import { getNewUserInfo } from "../services/user/selectors";
import { INewUserInfo } from "../services/user/model";
import { getCurrentPageMap } from "../services/site/selectors";
import { IFormActions, setCurrentFormPage, setFormError } from "../services/form/action";
import { Dispatch } from "redux";
import { insertUser, IUserActions } from '../services/user/actions';
import { useNavigate } from "react-router";
import { SESSION_STORAGE_FORM_STATE } from "../utils";
import { getFormError } from "../services/form/selector";

const useFormControler = (state: number): {
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
} => {
  const { stack, queue } = initalizeStackAndQueue(state);
  const newUserInfo = useSelector(getNewUserInfo);
  const currentPageLayoutMap = useSelector(getCurrentPageMap);
  const dispatch = useDispatch<Dispatch<IFormActions | IUserActions>>();
  const formError = useSelector(getFormError);
  const navigate = useNavigate();
  const onPrev = () => {
    if (!stack.length) {
      return;
    }
    const last = stack.pop()!;
    dispatch(setCurrentFormPage(last));
    sessionStorage.setItem(SESSION_STORAGE_FORM_STATE, JSON.stringify(last));
    queue.unshift(last);
    return;
  }

  const onNext = () => {
    if (!queue.length || formError) {
      return;
    }
    // check if field for current page is filled
    if (!checkNewUserInfoIsFilled(newUserInfo, queue[0], currentPageLayoutMap)) {
      dispatch(setFormError(new Error('please make sure every field is filled out')))
      return;
    }
    const current = queue.shift()!;
    stack.push(current);
    dispatch(setCurrentFormPage(queue[0]));
    sessionStorage.setItem(SESSION_STORAGE_FORM_STATE, JSON.stringify(queue[0]));
    dispatch(setFormError(null));
    return;
  }

  const onSubmit = () => {
    dispatch(insertUser(navigate));
  };

  return {
    onPrev,
    onNext,
    onSubmit,
  };
};

const checkNewUserInfoIsFilled = (
  newUserInfo: INewUserInfo,
  pageNum: number,
  currentPageLayoutMap: { [page: number]: string[] }
) => {
  const fieldsToCheck = currentPageLayoutMap[pageNum];

  for (const field of fieldsToCheck) {
    if (!field) {
      continue;
    }
    // @ts-ignore
    if (newUserInfo[field]) {
      continue;
    }

    if (field === 'address' &&
      newUserInfo.streetName &&
      newUserInfo.city &&
      newUserInfo.state &&
      newUserInfo.zip
    ) {
      continue;
    }

    if (field === 'birthday' &&
      newUserInfo.month &&
      newUserInfo.day &&
      newUserInfo.year
    ) {
      continue;
    }

    return false;
  }
  return true;
}

const initalizeStackAndQueue = (state: number): {
  stack: number[],
  queue: number[],
} => {
  const stack = [];
  const queue = [];

  for (const num of [1,2,3]) {
    if (num < state) {
      stack.push(num);
    } else {
      queue.push(num);
    }
  }
  return { stack, queue };
};

export default useFormControler;
