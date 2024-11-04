import { ObjectId } from "mongodb";

export const isValidPlainObject = (value: any): value is object => {
  return (
      typeof value === 'object' &&
      value !== null &&
      !(value instanceof Date) &&
      !(value instanceof RegExp) &&
      !(value instanceof Error) &&
      !(value instanceof Map) &&
      !(value instanceof Set) &&
      !(value instanceof WeakMap) &&
      !(value instanceof WeakSet) &&
      !ObjectId.isValid(value) &&
      !Array.isArray(value)
  );
};

export const isValidEmail = (value: any): boolean => {
  return value && typeof value === 'string' &&
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(value);
};
