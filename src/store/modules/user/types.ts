export type Role = 'root' | 'tourist' | 'registered'

export interface UserState {
  userid: string
  username: string
  token: string
  role: Role
}
