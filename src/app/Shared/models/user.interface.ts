export type Roles = 'MODERATOR' | 'ADMIN';

export interface User {
  email:string;
  password: string;
}

export interface UserResponse extends User {
  message: string;
  token: string;
  userId: number;
  role: Roles;
}