import assert from "assert";
import IUser from "../interfaces/models/IUser";
import Base from "./base";
import { isValidEmail } from "../utils/validations";

class User extends Base<IUser> {
  private _firstName!: IUser['firstName'];
  private _lastName!: IUser['lastName'];
  private _email!: IUser['email'];
  private _passwordHash!: IUser['passwordHash'];
  private _data!: IUser['data'];

  constructor(dto: IUser) {
    super(dto);
    const { firstName, lastName, passwordHash, email, data } = dto;
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._passwordHash = passwordHash;
    this._data = data;
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
    assert(isValidEmail(value), 'Email must be a valid email');
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
    this._data = value;
  }
}
export default User;