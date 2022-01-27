
export interface LoginUserParams {
  email: string
  password: string
}

export interface RegisterUserParams extends LoginUserParams {
  username: string
}

export interface UserType {
  token?: string
  email?: string
  username?: string
  bio?: string
  image?: string
}

export interface UserResponse {
  user: UserType
}
