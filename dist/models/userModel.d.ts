import { User } from "../types/User";
export declare class UserModel {
    create(user: User): Promise<User>;
    authenticate(email: string, password: string): Promise<User | null>;
}
