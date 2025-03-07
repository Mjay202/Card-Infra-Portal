enum FeeFrequency {
  ONE_OFF = 'One Off',
  MONTHLY = 'Monthly',
}

enum FeeImpact {
  ISSUANCE = 'Issuance',
  PIN_REISSUE = 'Pin Reissue',
}

enum AccountPad {
  NONE = 'NONE',
  BRANCH_CODE_PREFIX = 'Branch Code Prefix',
  BRANCH_CODE_SUFFIX = 'Branch Code Suffix',
}

export enum CurrencyType {
  NGN = 'NGN',
  USD = 'USD',
}

export type Fee = {
  name: string;
  value: number;
  frequency: FeeFrequency;
  account_pad: AccountPad;
  time: Date;
  currency: CurrencyType;
  fee_impact: FeeImpact;
  account: number;
};

export enum CardRequestStatus {
  PENDING = 'Pending',
  IN_PROGRESS = 'In Progress',
  READY = 'Ready',
  ACKNOWLEDGED = 'Acknowledged',
}

export enum CardRequestStatusTrack {
  UNTRACKED = 'Untracked',
  DOWNLOADED = 'Downloaded',
  AWAITING_DISPATCH = 'Awaiting Dispatch',
  DISPATCHED = 'Dispatched',
}
export type UserRecord = {
  id: string;
  email: string;
  username: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type UserLoginCredentials = {
    id: string;
    name: string;
    email: string,
    last_login: Date,
    username: string;
    password: string;
};