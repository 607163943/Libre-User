export interface UserInfo {
  name: string
  tokenName: string
  tokenValue: string
}

export interface UserProfileInfo {
  name: string
  email: string
  phone: string
}

export interface UserPasswordForm {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export interface UserPasswordSubmit {
  oldPassword: string
  newPassword: string
}

export interface UserLendTableData {
  id: number
  bookName: string
  authorName: string
  publisherName: string
  coverUrl: string
  dueTime: string
  state: string
}

export interface UserLendHistoryTableData {
  id: number
  bookName: string
  authorName: string
  publisherName: string
  coverUrl: string
  lendTime: string
  returnTime: string
  state: string
}
