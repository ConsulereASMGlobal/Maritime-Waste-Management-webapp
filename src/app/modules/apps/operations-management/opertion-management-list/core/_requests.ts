import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../../_metronic/helpers'
import {User, UsersQueryResponse} from './_models'

const API_URL = process.env.REACT_APP_THEME_API_URL
const USER_URL = `${API_URL}/user`
const GET_USERS_URL = `${API_URL}/users/query`

const getUsers = (query: string): Promise<UsersQueryResponse> => {
  return axios
    .get(`${GET_USERS_URL}?${query}`)
    .then((d: AxiosResponse<UsersQueryResponse>) => d.data)
}

const getUserById = (id?: any, api: any = ''): Promise<User | undefined> => {
  return axios
    .get(`${GET_USERS_URL + api || USER_URL}${id || ''}`)
    .then((response: AxiosResponse<Response<User>>) =>
      response?.data?.data ? response.data : response
    )
    .then((response: Response<User>) => (response?.data?.data ? response.data : response.data))
}

const createUser = (user: any, url?: any): Promise<User | undefined> => {
  const baseURL = url?.includes('http') ? url : url ? USER_URL + url : USER_URL
  return axios
    .post(baseURL, user)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const updateUser = (user: any, url?: any): Promise<User | undefined> => {
  const baseURL = url?.includes('http') ? url : url ? USER_URL + url : USER_URL
  return axios
    .put(baseURL, user)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const deleteUser = (userId: ID): Promise<void> => {
  return axios.delete(`${USER_URL}/${userId}`).then(() => {})
}

const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
  const requests = userIds.map((id) => axios.delete(`${USER_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {getUsers, deleteUser, deleteSelectedUsers, getUserById, createUser, updateUser}
