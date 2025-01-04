import { User } from '../user.entity';

export interface CreateUser {
  name: string;
  lineUserId: string;
}

export type UpdateUser = {
  id: number;
} & Partial<User>;
