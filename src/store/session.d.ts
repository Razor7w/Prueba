export interface UserSubmit {
  // eslint-disable-next-line camelcase
  user_name: string
  password: string
}

export interface UserData {
  id: number
  name: string
  email: string
  // eslint-disable-next-line camelcase
  email_verified_at: string
  role: number
  // eslint-disable-next-line camelcase
  created_at: string
  // eslint-disable-next-line camelcase
  updated_at: string
}
