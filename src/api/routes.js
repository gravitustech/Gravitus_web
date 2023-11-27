// Login Api
export const LOGIN_URL = '/api/generic/email/loginUserNg';

export const LOGIN_URL_NEW = '/api/generic/email/loginUser';

export const LOGOUT_URL = '/api/users/logout?access_token=';

export const RESET_PASSWORD_URL = '/api/generic/email/resetPassword';

// Sign up Api

export const SIGNUP_URL = '/api/generic/email/createUser';

export const REFERRAL_URL = '/api/generic/email/validateUser';

// Spot Api

export const SPOT_PRE_TRADE_USER = '/api/activity/spotTrade/preTradeP2';

export const SPOT_PRE_TRADE_GUEST = '/api/generic/spotTrade/preTradeP2';

export const POST_ORDER = '/api/activity/spotTrade/postTrade';

export const CHART_OHLC = '/api/generic/ohlcData/15/1h/from/to/countBack/';

// Market Api

export const MARKET_DATA = '/api/generic/dashboard/markets';

// Wallet Api

export const WALLET_DATA = '/api/activity/wallet/fetchInfo';

export const WALLET_DATA_BY_ID = '/api/activity/wallet/fetchById';

export const WALLET_DATA_HISTORY = '/api/activity/wallet/statement';

export const WALLET_DEPOSIT = '/api/activity/wallet/address';

export const WALLET_WIDTHDRAW = '/api/activity/wallet/eWithdrawal';

export const WALLET_INR_WIDTHDRAW = '/api/activity/wallet/preRsWithdraw';

export const WALLET_INR_WIDTHDRAW_POST = '/api/activity/wallet/postRsWithdraw';

export const WALLET_INR_DEPOSIT = '/api/activity/wallet/preRsDeposit';

export const WALLET_INR_DEPOSIT_POST = '/api/activity/wallet/postRsDeposit';

export const WALLET_SIGN_WIDTHDRAW = '/api/activity/wallet/wSecurity';

// Profile Api

export const PROFILE_DATA = '/api/activity/dashboard/accountInfo';

export const MOBILE_UPDATE = '/api/activity/manageUsers/updateMobileNo';

export const SEND_OTP = '/api/activity/manageUsers/sendOTP';

export const SEND_MOTP = '/api/activity/manageUsers/sendMOTP';

export const SET_MOBILE = '/api/activity/manageUsers/setMobileNo';

export const RESET_MOBILE = '/api/activity/manageUsers/resetMobileNo';

export const UPDATE_PAYMENT = '/api/activity/manageUsers/payModes';

export const UPDATE_IDENTITY = '/api/activity/manageUsers/identity';

export const RAISE_TICKET = '/api/activity/ticket/request';

export const REPLY_TICKET = '/api/activity/ticket/reply';

export const TICKET_HISTORY = '/api/activity/ticket/history';

// Profile Security

export const SECURITY_FEATURES = '/api/activity/security/secFeatures';

export const UPDATE_AUTH = '/api/activity/security/updateFeatures';

export const SEND_OTP_SECURITY = '/api/activity/security/sendOTP';

export const ENABLE_SECURITY = '/api/activity/security/vSecurity';

export const DISABLE_SECURITY = '/api/activity/security/dSecurity';

export const RESET_SECURITY = '/api/activity/security/rSecurity';

export const SIGNIN_SECURITY = '/api/generic/security/sSecurity';

export const WITHDRAW_SECURITY = '/api/activity/security/wSecurity';
