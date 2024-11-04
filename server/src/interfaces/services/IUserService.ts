import IUser from "../models/IUser";

interface IUserService {
  createPassowrdHash(password: string): Promise<string>;
  insertUser(dto: IUser): Promise<boolean>;
  getUser(email: string, passwordHash: string): Promise<IUser | null>;
  getUsers(): Promise<IUser[]>;
}
export default IUserService;
