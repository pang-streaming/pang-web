export interface User {
  email: string;
  id: string;
  name: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}
