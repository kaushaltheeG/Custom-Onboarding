import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewUserInfo, IUserActions } from '../services/user/actions'; // Adjust the import path as needed
import { Dispatch } from 'redux';
import { getNewUserInfo } from '../services/user/selectors';

const useNewUserDebounceInput = (initialState: any, debounceDelay: number) => {
    const [inputState, setInputState] = useState(initialState);
    const dispatch = useDispatch<Dispatch<IUserActions>>();
    const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const newUserInfo = useSelector(getNewUserInfo);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputState((prev: {any: any}) => ({
            ...prev,
            [name]: value,
        }));

        // Clear the previous timeout
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        for (let key in inputState) {
            // @ts-ignore
            newUserInfo[key] = inputState[key];
        }

        // Set a new timeout to dispatch after the specified delay
        debounceTimeout.current = setTimeout(() => {
            dispatch(addNewUserInfo(newUserInfo)); // Dispatch updated inputState
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

    return [inputState, handleChange] as const; // Return input state and change handler
};

export default useNewUserDebounceInput;
