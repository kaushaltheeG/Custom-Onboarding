import assert from "assert";
import IUser, { isValidPendingCustomer } from "../interfaces/models/IUser"; // isValidUserData
import Base from "./base";
import { isValidEmail } from "../utils/validations";

class User extends Base<IUser> {
  private _firstName!: IUser['firstName'];
  private _lastName!: IUser['lastName'];
  private _email!: IUser['email'];
  private _passwordHash!: IUser['passwordHash'];
  private _data!: IUser['data'];
  private _pendingCustomer!: IUser['pendingCustomer'];

  constructor(dto: IUser) {
    super(dto);
    const { firstName, lastName, passwordHash, email, data, pendingCustomer } = dto;
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._passwordHash = passwordHash;
    this._data = data;
    this._pendingCustomer = pendingCustomer;
  }

  get firstName() {
    return this._firstName;
  }

  set firstName(value: string) {
    assert(typeof value === 'string', 'The new first name should be a type of string');
    assert(value.length, 'The new first name should not be an empty string');
    this._firstName = value;
  }

  get lastName() {
    return this._lastName;
  }

  set lastName(value: string) {
    assert(typeof value === 'string', 'The new last name should be a type of string');
    assert(value.length, 'The new last name should not be an empty string');
    this._lastName = value;
  }

  get email() {
    return this._email;
  }

  set email(value: string) {
    assert(isValidEmail(value), 'email must be a valid email');
    this._email = value;
  }

  get passwordHash() {
    return this._passwordHash;
  }

  set passwordHash(value: string) {
    this._passwordHash = value;
  }

  get data() {
    return this._data;
  }

  set data(value: IUser['data']) {
    // assert(isValidUserData(value), 'invalid user data, please recheck the user data fields and their value types');
    this._data = value;
  }

  get pendingCustomer() {
    return this._pendingCustomer;
  }

  set pendingCustomer(value: IUser['pendingCustomer']) {
    assert(isValidPendingCustomer(value), 'invalid pending customer data, please recheck the user data fields and their value types');
    this._pendingCustomer = value;
  }

}
export default User;