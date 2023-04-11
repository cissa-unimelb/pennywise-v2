export interface User {
  id: string;
  name: string;
  email: string;
  isAuthorizer: boolean;
  isTreasurer: boolean;
  bsb?: string;
  accountNum?: string;
  photoURL: string;
}

enum Category {
  Admin = 'admin',
  Food = 'food',
  Venue = 'venue',
  Prizes = 'prizes',
  Misc = 'misc',
  IT = 'it',
  Ads = 'advertisingit',
  Merch = 'merch',
  Gifts = 'gifts',
}
// enum Event {
//   IC = 'Industry Connect',
//   Codebrew = 'Codebrew',
//   Catalyst = 'Catalyst',
//   DT = 'DiversTEA',
//   Other = 'Other',
// }
export interface Form{
  id: string;
  author: String;
  paymentDate: Date;
  approvalDate: Date;
  amount: Number;
  description: string;
  category: Category;
  event: string;
  receiptURL: string;
  approver: string;
  isReimbursement: boolean;
}