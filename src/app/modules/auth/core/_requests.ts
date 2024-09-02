import axios from 'axios'
import {AuthModel, UserModel} from './_models'

const API_URL = process.env.REACT_APP_BASE_API_URL

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}users/`
export const LOGIN_URL = `${API_URL}user/login`
export const REGISTER_URL = `${API_URL}/register`
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`
export const CHANGE_PASSWORD = `${API_URL}user/changePassword`

// Server should return AuthModel
export function login(mobile: string, password: string, userType: string) {
  return axios.post<AuthModel>(LOGIN_URL, {
    mobile,
    password,
    userType,
  })
}

export function changePassword(oldPassword: string, newPassword: string) {
  return axios.put<any>(CHANGE_PASSWORD, {
    oldPassword,
    newPassword,
  })
}

const instance = axios.create({
  baseURL: 'https://api.example.com', // Your API base URL
  headers: {
    Authorization: 'Bearer YourAccessToken',
    'Content-Type': 'text/plain',
    // Add other headers as needed
  },
})

// Server should return AuthModel
export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  password_confirmation: string
) {
  return instance.post(REGISTER_URL, {
    email,
    first_name: firstname,
    last_name: lastname,
    password,
    password_confirmation,
  })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{result: boolean}>(REQUEST_PASSWORD_URL, {
    email,
  })
}

export function getUserByToken(token: string) {
  return axios.get<UserModel>(GET_USER_BY_ACCESSTOKEN_URL + token)
}
