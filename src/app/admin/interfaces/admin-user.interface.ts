export interface AdminUserInterface {
  nick: string;
  password: string;
  email: string;
  name: string;
  code?: string;
  token?: string;
}

export interface AdminLogUserInterface {
  nick: string;
  password: string;
}
