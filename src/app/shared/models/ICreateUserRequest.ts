export interface ICreateUserRequest {
  name: string;
  email: string;
  isAdmin: boolean;
  password: string;
  department: string;
}
