import IUser, { ICreateUser } from "../models/IUser";

interface IUserService {
  createPasswordHash(password: string): Promise<string>;
  insertUser(dto: ICreateUser): Promise<IUser | null>;
  getUser(email: string, passwordHash: string): Promise<IUser | null>;
  getUsers(): Promise<IUser[]>;
}
export default IUserService;
