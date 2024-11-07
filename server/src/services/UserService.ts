import { Collection } from "mongodb";
import IUserService from "../interfaces/services/IUserService";
import User from "../models/user";
import IUser, { ICreateUser } from "../interfaces/models/IUser";
import assert from "assert";
import crypto from 'crypto';

class UserService implements IUserService {
  private _userCollection!: Collection<IUser>

  constructor(userCollection: Collection<IUser>) {
    this._userCollection = userCollection;
  }

  /**
   *  a proper application will salt the password hash to prevent creating
   *  the same password hash if multiple user share the same password
  */
  async createPassowrdHash(password: string): Promise<string> {
    try {
      return crypto.createHash('sha256').update(password).digest('hex');
    } catch (error) {
      throw error;
    }
  }

  async insertUser(dto: ICreateUser): Promise<IUser | null> {
    try {
      const { password, ...remainingDto } = dto;
      const passwordHash = await this.createPassowrdHash(password);
      const userDto: IUser = { ...remainingDto, passwordHash };
      const user = new User(userDto).toDTO();
      await this._userCollection.insertOne(user);
  
      return await this.getUser(user.email, user.passwordHash);
    } catch (error) {
      if (error instanceof assert.AssertionError) {
        throw new Error(error.message);
      } else {
        throw error;
      }
    }
  }

  async getUser(email: string, passwordHash: string): Promise<IUser | null> {
    try {
      const user = await this._userCollection.findOne({ email, passwordHash });
      if (!user) {
        return null;
      }
      return new User(user).toDTO();
    } catch (error) {
      if (error instanceof assert.AssertionError) {
        throw new Error(error.message);
      } else {
        throw error;
      }
    }
  }

  async getUsers(): Promise<IUser[]> {
    try {
      const users = await this._userCollection.find().toArray();
      const dtoUsers = new Array(users.length)
      for (let i = 0; i < users.length; i++) {
        dtoUsers[i] = new User(users[i]).toDTO();
      }
      return dtoUsers;
    } catch (error) {
      if (error instanceof assert.AssertionError) {
        throw new Error(error.message);
      } else {
        throw error;
      }
    }
  }
}
export default UserService;
