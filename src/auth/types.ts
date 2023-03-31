export interface User {
  id: string;
  name: string;
  email: string;
  isAuthorizer: boolean;
  isTreasurer: boolean;
  bsb?: string;
  accountNum?: string;
  photoURL: string;
  token?: string;
}
