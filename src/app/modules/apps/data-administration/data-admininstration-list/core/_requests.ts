import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../../_metronic/helpers'
import {User, UsersQueryResponse} from './_models'

const API_URL = process.env.REACT_APP_BASE_API_URL
const USER_URL = `${API_URL}`
const GET_USERS_URL = `${API_URL}`

const getUsers = (query: string, initialApi: string = 'users'): Promise<UsersQueryResponse> => {
  return axios.get(`${GET_USERS_URL + initialApi}?${query}`).then((d: AxiosResponse<any>) => {
    return d?.data?.data ? d.data : d
  })
}

const getUserById = (id?: any, api: any = ''): Promise<User | undefined> => {
  return axios
    .get(`${GET_USERS_URL + api || USER_URL}${id || ''}`)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data || response)
}

const createUser = (user: User, url?: any): Promise<User | undefined> => {
  console.log({user, url})
  const baseURL = url.includes('http') ? url : url ? USER_URL + url : USER_URL
  return axios
    .post(baseURL, user)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const updateUser = (user: User, url?: any): Promise<User | undefined> => {
  const baseURL = url.includes('http') ? url : url ? USER_URL + url : USER_URL
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
