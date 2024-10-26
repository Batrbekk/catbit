export interface Regexp {
  value: string;
  flags: string;
}

export interface Form {
  regexp: Regexp;
  step: number;
  placeholder: string;
  length: number | null;
  minLength: null;
  maxLength: null;
  required: boolean | null;
  _id: string;
  valuteId: string;
  type: number;
  title: string;
  key: string;
  __v: number;
}

export type City = Record<string, number>;

export interface Currency {
  categories: string[];
  minGive: number;
  percentGive: number;
  percentGet: number;
  course: number;
  minfee: number;
  isCash: boolean;
  limitPercentBuy: number;
  limitPercentSell: number;
  step: number;
  limitPlace: number;
  useWhitebitWallet: boolean;
  withdrawable: boolean;
  depositable: boolean;
  confirmations: number | null;
  withFirekassa: boolean;
  invoiceQw: boolean;
  invoiceCard: boolean;
  invoiceYou: boolean;
  giveWarn: string | null;
  getWarn: string | null;
  useSbercoreForDeposit: boolean;
  precision: number;
  _id: string;
  title: string;
  key: string;
  bestchangeKey: string;
  image: string;
  rawKey?: string;
  maxGet: number | string;
  forms: Form[];
  isGet?: boolean;
  isGive?: boolean;
  customPercents?: string[];
  isLimit?: boolean;
  network?: string;
  bestChangeCities?: string[];
  cash?: boolean;
  maxGiveAtOnce?: string;
}

export interface CrossRateCity {
  bestchangeCityId: number;
  courierCommissionPercent: number;
  courierCommissionAmount: number;
  treasureCommissionPercent: number;
  treasureCommissionAmount: number;
  minWithdrawalAmount: number;
  isActive: boolean;
  isBasicCommission: boolean;
  hasOffice: boolean;
  _id: string;
  qrCommissionPercent: number;
  qrCommissionAmount: number;
  name: string;
  bestchangeCity: string;
  __v: number;
}

export interface CustomPercentClass {
  name: string;
  percentGive: number;
  percentGet: number;
}

export interface From {
  categories: string[];
  isGet: boolean;
  isGive: boolean;
  minGive: number;
  percentGive: number;
  percentGet: number;
  customPercents: CustomPercentClass[];
  course: number;
  minfee: number;
  isCash: boolean;
  limitPercentBuy: number;
  limitPercentSell: number;
  step: number;
  limitPlace: number;
  useWhitebitWallet: boolean;
  withdrawable: boolean;
  depositable: boolean;
  confirmations: null;
  withFirekassa: boolean;
  invoiceQw: boolean;
  invoiceCard: boolean;
  invoiceYou: boolean;
  giveWarn: null;
  getWarn: null;
  useSbercoreForDeposit: boolean;
  precision: number;
  _id: string;
  title: string;
  key: string;
  bestchangeKey: string;
  image: string;
  __v: number;
  rawKey: string;
  isLimit?: boolean;
  network?: string;
  bestChangeCities?: undefined[];
  cash?: boolean;
}

export interface To {
  categories: string[];
  isGet: boolean;
  isGive: boolean;
  minGive: number;
  percentGive: number;
  percentGet: number;
  customPercents: Array<CustomPercentClass | string>;
  course: number;
  minfee: number;
  isCash: boolean;
  limitPercentBuy: number;
  limitPercentSell: number;
  step: number;
  limitPlace: number;
  useWhitebitWallet: boolean;
  withdrawable: boolean;
  depositable: boolean;
  confirmations: number | null;
  withFirekassa: boolean;
  invoiceQw: boolean;
  invoiceCard: boolean;
  invoiceYou: boolean;
  giveWarn: null | string;
  getWarn: null | string;
  useSbercoreForDeposit: boolean;
  precision: number;
  _id: string;
  title: string;
  key: string;
  bestchangeKey: string;
  image: string;
  __v: number;
  rawKey: string;
  isLimit?: boolean;
  network?: string;
  bestChangeCities?: undefined[];
  cash?: boolean;
}

export interface CrossRate {
  out: number;
  isActive: boolean;
  isDisabled: boolean;
  makeTopIsActive: boolean;
  makeTopLimitPercentGet: number;
  makeTopLimitPercentGive: number;
  makeTopLimitMult: number;
  makeTopStep: number;
  makeTopIgnoredExchangeNames: number[];
  makeTopNoResultsStrategy: string;
  makePlaceIsActive: boolean;
  makePlaceNumber: number;
  makePlaceStep: number;
  makePlaceIgnoredExchangeNames: undefined[];
  makePlaceNoResultsStrategy: string;
  isFixed: boolean;
  _id: string;
  from: From;
  to: To;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  city?: City | null;
}
