import { User } from "./user.model";


export interface JwtResponse {
token: string;
user: User;
}