export interface LoginUserParams {
  email: string
  password: string
}

export interface RegisterUserParams extends LoginUserParams {
  username: string
}

export interface UserType {
  email: string
  token: string
  username: string
  bio: string
  image: string
}
