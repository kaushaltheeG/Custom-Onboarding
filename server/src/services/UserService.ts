import { Collection } from "mongodb";
import IUserService from "../interfaces/services/IUserService";
import User from "../models/User";
import IUser, { ICreateUser } from "../interfaces/models/IUser";
import bcrypt from 'bcryptjs';

class UserService implements IUserService {
  private _userCollection!: Collection<User>

  constructor(userCollection: Collection<User>) {
    this._userCollection = userCollection;
  }

  async createPassowrdHash(password: string): Promise<string> {
    // a proper application will salt the password hash to prevent creating the same password hash if multiple user share the same password
    return await bcrypt.hash(password, 0)
  }

  async insertUser(dto: ICreateUser): Promise<IUser | null> {
    const { password, ...remainingDto } = dto;
    const passwordHash = await this.createPassowrdHash(password);
    const userDto: IUser = { ...remainingDto, passwordHash };
    const user = new User(userDto);
    await this._userCollection.insertOne(user);

    return await this.getUser(user.email, user.passwordHash);
  }

  async getUser(email: string, passwordHash: string): Promise<IUser | null> {
    const user = await this._userCollection.findOne({ email, passwordHash });
    if (!user) {
      return null;
    }
    return new User(user).toDTO();
  }

  async getUsers(): Promise<IUser[]> {
    const users = await this._userCollection.find().toArray();
    const dtoUsers = new Array(users.length)
    for (let i = 0; i < users.length; i++) {
      dtoUsers[i] = new User(users[i]).toDTO();
    }
    return dtoUsers;
  }
}
export default UserService;
