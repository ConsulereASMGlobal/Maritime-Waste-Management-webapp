import React from 'react'
import axios from 'axios'
import {toAbsoluteUrl} from '../../AssetHelpers'

function UploadImage({label, name, formik}: any) {
  const handleFileChange = async (event) => {
    const file = event.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    const response = await axios.post(process.env.REACT_APP_BASE_IMAGE_UPLOAD_URL + '', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        token:
          'Bearer eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJjcmVhdGVkVGltZSI6MTY5MzMyMTg2MDU1MCwiZXhwaXJ5VGltZSI6MTY5MzMyMTg5MDU1MCwidXNlclR5cGUiOiJTTUFSVF9DRU5UUkUiLCJ1c2VySWQiOiI2NGM5NDRhMWUwZDQzMTU1MDE1ZmJjYzIifQ.MOqTincx0tq--3BvYrH2WsM4PvydIMiKY2ZDj5ImaGQ',
      },
    })
    if (response?.data?.data?.name) {
      formik.setFieldValue(name, response.data.data.name)
    }
  }
  const blankImg = toAbsoluteUrl('/media/svg/avatars/blank.svg')
  return (
    <div className='fv-row mb-7'>
      <label className='d-block required fw-bold fs-6 mb-5'>{label}</label>
      <div
        className='image-input image-input-outline'
        data-kt-image-input='true'
        style={{backgroundImage: `url('${blankImg}')`}}
      >
        <div
          className='image-input-wrapper w-125px h-125px'
          style={{backgroundImage: `url('${formik.values[name]}')`}}
        ></div>
        <label
          className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
          data-kt-image-input-action='change'
          data-bs-toggle='tooltip'
          title='Change avatar'
        >
          <i className='bi bi-pencil-fill fs-7'></i>
          <input
            type='file'
            name='avatar'
            accept='.png, .jpg, .jpeg'
            onChange={(file) => handleFileChange(file)}
          />
          <input type='hidden' name='avatar_remove' />
        </label>
        <span
          className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
          data-kt-image-input-action='cancel'
          data-bs-toggle='tooltip'
          title='Cancel avatar'
        >
          <i className='bi bi-x fs-2'></i>
        </span>
      </div>
      <div className='form-text '>Allowed file types: png, jpg, jpeg.</div>
    </div>
  )
}

export default UploadImage
