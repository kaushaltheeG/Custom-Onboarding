import { useState, useEffect, useRef } from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewUserInfo, IUserActions } from '../services/user/actions'; // Adjust the import path as needed
import { Dispatch } from 'redux';
import { getNewUserInfo } from '../services/user/selectors';
import { IFormActions, setFormError } from '../services/form/action';

const useNewUserDebounceInput = (initialState: any, debounceDelay: number) => {
    const [inputState, setInputState] = useState(initialState);
    const dispatch = useDispatch<Dispatch<IUserActions | IFormActions>>();
    const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const newUserInfo = useSelector(getNewUserInfo);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setInputState((prev: {any: any}) => ({
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
            dispatch(addNewUserInfo(createNewUserInfo)); // Dispatch updated inputState
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

    const checkPassword = React.useCallback((passwordOne: string, passwordTwo: string, formError: Error | null) => {
      if (!passwordOne.length || !passwordTwo.length) {
        return; 
      }
      if (passwordTwo !== passwordOne && !formError) {
        dispatch(setFormError(new Error('passwords do not match, please recheck')));
        return;
      }
      if (formError) {
        dispatch(setFormError(null));
      }
    },[dispatch]);

    return {
      inputState,
      handleChange,
      checkPassword,
    };
};

export default useNewUserDebounceInput;
