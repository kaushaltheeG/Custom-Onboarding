import { useDispatch, useSelector } from "react-redux";
import { getNewUserInfo } from "../services/user/selectors";
import { INewUser } from "../services/user/api";
import { getCurrentPageMap } from "../services/site/selectors";
import { IFormActions, setCurrentFormPage } from "../services/form/action";
import { Dispatch } from "redux";

const useFormControler = (state: number): {
  onPrev: () => void;
  onNext: () => void;
  // onSubmit: () => void;
} => {
  const { stack, queue } = initalizeStackAndQueue(state);
  const newUserInfo = useSelector(getNewUserInfo);
  const currentPageLayoutMap = useSelector(getCurrentPageMap);
  const dispatch = useDispatch<Dispatch<IFormActions>>();

  const onPrev = () => {
    console.log('stack')
    console.log(stack)
    if (!stack.length) {
      return;
    }
    const last = stack.pop()!;
    dispatch(setCurrentFormPage(last));
    queue.unshift(last);
    return;
  }

  const onNext = () => {
    if (!queue.length) {
      return;
    }
    // check if field for current page is filled
    if (!checkNewUserInfoIsFilled(newUserInfo, queue[0], currentPageLayoutMap)) {
      // dispatch error
      return;
    }
    const current = queue.shift()!;
    stack.push(current);
    dispatch(setCurrentFormPage(queue[0]));
    return;
  }

  // const onSubmit
  return {
    onPrev,
    onNext,
  };
};

const checkNewUserInfoIsFilled = (
  newUserInfo: INewUser,
  pageNum: number,
  currentPageLayoutMap: {[page: number]: string[]}
) => {
  const fieldsToCheck = currentPageLayoutMap[pageNum];
  for (const field of fieldsToCheck) {
    // @ts-ignore
    if (newUserInfo[field]) {
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
