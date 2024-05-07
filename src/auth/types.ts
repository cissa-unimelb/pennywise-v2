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

// creates an user instance
export function createUser(
  obj: any
): User {
  const {id,name,email,isAuthorizer,isTreasurer,photoURL,bsb,accountNum,token} = obj;
  return {
    id,
    name,
    email,
    isAuthorizer,
    isTreasurer,
    photoURL,
    bsb,
    accountNum,
    token
  };
}