import { useState, useEffect, useRef } from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewUserInfo, IUserActions } from '../services/user/actions'; // Adjust the import path as needed
import { Dispatch } from 'redux';
import { getNewUserInfo } from '../services/user/selectors';
import { SESSION_STORAGE_ONBOARDING_KEY } from '../utils';

const useNewUserDebounceInput = <T,>(initialState: T, debounceDelay: number) => {
  const [inputState, setInputState] = useState<T>(initialState);
  const dispatch = useDispatch<Dispatch<IUserActions>>();
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const newUserInfo = useSelector(getNewUserInfo);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputState((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear the previous timeout
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    const createNewUserInfo = {
      ...newUserInfo,
      [name]: value,
    };

    // Set a new timeout to dispatch after the specified delay
    debounceTimeout.current = setTimeout(() => {
      // updated newUserInfo state
      dispatch(addNewUserInfo(createNewUserInfo));
      // save newUserInfo to session storage
      sessionStorage.setItem(SESSION_STORAGE_ONBOARDING_KEY, JSON.stringify(createNewUserInfo));
    }, debounceDelay);
  };

  useEffect(() => {
    // Cleanup timeout on component unmount
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  return {
    inputState,
    handleChange,
  };
};

export default useNewUserDebounceInput;
