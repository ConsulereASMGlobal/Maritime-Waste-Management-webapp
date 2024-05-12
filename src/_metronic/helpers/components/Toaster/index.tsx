/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'

import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const CustomToaster: any = ({message, info}: {message: any; info: any}) => {
  return (
    <ToastContainer
      position='top-right'
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      draggable
      pauseOnHover
    />
  )
}

export const successToast = (message) => toast.success(message || '')
export const errorToast = (message) => toast.error(message || '')

export default CustomToaster
