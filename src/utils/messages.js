import localizeFilter from '../filters/localize.filter'

export default {
  logout: localizeFilter('Messages_Logout'),
  login: localizeFilter('Messages_Login'),
  'auth/user-not-found': localizeFilter('Messages_User_Not_Found'),
  'auth/wrong-password': localizeFilter('Messages_Wrong_Password'),
  'auth/email-already-in-use': localizeFilter('Messages_Email_Already_Use'),
}
