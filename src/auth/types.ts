export interface User {
  id: string;
  name: string;
  email: string;
  isAuthorizer: boolean;
  isTreasurer: boolean;
  photoURL: string;
  token?: string;

  // these are set in bank form
  bsb?: string;
  accountNum?: string;
  // TODO: add an account name
}

// creates an user instance
export function createUser(
  obj: any
): User {
  if (obj == null){
    return {id: "",name: "",email: "",isAuthorizer: false,isTreasurer: false,photoURL: "",bsb:"",accountNum:""};
  } 
    

  const {id,name,email,isAuthorizer,isTreasurer,photoURL,bsb,accountNum} = obj;
  
  return {
    id,
    name,
    email,
    isAuthorizer,
    isTreasurer,
    photoURL,
    bsb,
    accountNum
  };
}