import {FC, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {
  cityList,
  stateList,
  countryList,
  isNotEmpty,
  toAbsoluteUrl,
  KTIcon,
} from '../../../../../../_metronic/helpers'
import {initialUser, User} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {UsersListLoading} from '../components/loading/UsersListLoading'
import {createUser, updateUser} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'
import CountryDropDown from '../../../../../../_metronic/helpers/countryDropDown'
import {errorToast, successToast} from '../../../../../../_metronic/helpers/components/Toaster'
import axios from 'axios'

type Props = {
  isUserLoading: boolean
  user?: User | any
}

const addUserSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  // phone: Yup.string()
  //   .min(7, 'Minimum 7 symbols')
  //   .max(50, 'Maximum 50 symbols')
  //   .required('Phone number is required'),
  // email: Yup.string()
  //   .email('Wrong email format')
  //   .min(3, 'Minimum 3 symbols')
  //   .max(50, 'Maximum 50 symbols')
  //   .required('Emailis required'),
  // country: Yup.string().required('Country  is required'),
  // state: Yup.string().required('State is required'),
  // city: Yup.string().required('City  is required'),
  // address: Yup.string()
  //   .min(3, 'Minimum 3 symbols')
  //   .max(50, 'Maximum 50 symbols')
  //   .required('Address is required'),
  // companyName: Yup.string()
  //   .min(3, 'Minimum 3 symbols')
  //   .max(50, 'Maximum 50 symbols')
  //   .required('Company Name is required'),
})

const editUserSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  password: Yup.string().required('Name is required'),
  phone: Yup.string()
    .min(7, 'Minimum 7 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Phone number is required'),
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Emailis required'),
})

const UserEditModalForm: FC<Props> = ({user = {}, isUserLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()
  const [showPassword, setShowPassword] = useState(false)
  const [userForEdit] = useState<any>({
    ...user,
    name: user.personalDetails?.name || '',
    country: user.address?.country || '',
    state: user.address?.state || '',
    city: user.address?.city || '',
    address: user.address?.street || '',
    companyName: user.companyName || '',
    permitNumber: '',
    zipCode: user?.address?.zipCode || '',
  })

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const formik: any = useFormik({
    initialValues: userForEdit,
    validationSchema: user.id ? editUserSchema : addUserSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        const {name, profileImage, permitNumber, country, state, zipCode, city, address} = values
        const payload = {
          address: {
            city,
            country,
            latitude: 0,
            longitude: 0,
            state,
            street: address,
            zipCode: zipCode,
          },
          kycDocument: {
            docUrl: profileImage,
            docNumber: permitNumber,
          },
          companyDetails: {
            companyId: '',
            name: name,
          },
          userType: 'RECYCLER',
        }
        if (isNotEmpty(values.id)) {
          await updateUser(payload, 'users/' + user.id + '/update')
          successToast('Modified')
        } else {
          await createUser(payload, 'user/register')
          successToast('Added')
        }
      } catch (ex) {
        console.error(ex)
        errorToast('Somethig Went Wrong')
      } finally {
        setSubmitting(true)
        cancel(true)
      }
    },
  })

  const blankImg = toAbsoluteUrl('/media/svg/avatars/blank.svg')

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
      formik.setFieldValue('profileImage', response.data.data.name)
    }
  }
  console.log(formik.values, 'FROM THE FORMIK VALUES')
  return (
    <>
      <form id='kt_modal_add_user_form' className='form' onSubmit={formik.handleSubmit} noValidate>
        <>
          <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'>Company Name</label>
            <input
              placeholder='Enter Name'
              {...formik.getFieldProps('name')}
              type='text'
              name='name'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.name && formik.errors.name},
                {
                  'is-valid': formik.touched.name && !formik.errors.name,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.name && formik.errors.name && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.name}</span>
                </div>
              </div>
            )}
          </div>
          <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'>Phone</label>
            <input
              placeholder='Enter Phone'
              readOnly={formik?.values?.id || false}
              {...formik.getFieldProps('phone')}
              type='number'
              name='phone'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.phone && formik.errors.phone},
                {
                  'is-valid': formik.touched.phone && !formik.errors.phone,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.phone}</span>
                </div>
              </div>
            )}
          </div>
          <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'>Password</label>
            <input
              placeholder='Enter Password'
              type={showPassword ? 'text' : 'password'}
              autoComplete='off'
              {...formik.getFieldProps('password')}
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {
                  'is-invalid': formik.touched.password && formik.errors.password,
                },
                {
                  'is-valid': formik.touched.password && !formik.errors.password,
                }
              )}
            />
            <div
              style={{marginLeft: '33rem', marginTop: '-39px'}}
              onClick={() => setShowPassword(!showPassword)}
            >
              <KTIcon iconName={showPassword ? 'eye-slash' : 'eye'} className='fs-2hx' />
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.password}</span>
                </div>
              </div>
            )}
          </div>
          <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'>Street Address </label>
            <input
              placeholder='Enter Address'
              {...formik.getFieldProps('address')}
              type='text'
              name='address'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.address && formik.errors.address},
                {
                  'is-valid': formik.touched.address && !formik.errors.address,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.address && formik.errors.address && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.address}</span>
                </div>
              </div>
            )}
          </div>

          <CountryDropDown showState showCity name='country' formik={formik} showNameOnly />
          <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'>Zip Code</label>
            <input
              placeholder='Enter Address'
              {...formik.getFieldProps('zipCode')}
              type='text'
              name='zipCode'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.zipCode && formik.errors.zipCode},
                {
                  'is-valid': formik.touched.zipCode && !formik.errors.zipCode,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.zipCode && formik.errors.zipCode && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.zipCode}</span>
                </div>
              </div>
            )}
          </div>
          <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'>Business Permit Number </label>
            <input
              placeholder='Enter Business Permit Number'
              {...formik.getFieldProps('permitNumber')}
              type='number'
              name='permitNumber'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.permitNumber && formik.errors.permitNumber},
                {
                  'is-valid': formik.touched.permitNumber && !formik.errors.permitNumber,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.permitNumber && formik.errors.permitNumber && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.permitNumber}</span>
                </div>
              </div>
            )}
          </div>
          <div className='fv-row mb-7'>
            <label className='d-block fw-bold fs-6 mb-5'>Upload Business Permit</label>
            <div
              className='image-input image-input-outline'
              data-kt-image-input='true'
              style={{backgroundImage: `url('${blankImg}')`}}
            >
              <div
                className='image-input-wrapper w-125px h-125px'
                style={{backgroundImage: `url('${formik.values.profileImage || user.icon}')`}}
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
                  onChange={handleFileChange}
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
            <div className='form-text'>Allowed file types: png, jpg, jpeg.</div>
          </div>
        </>
        <div className='text-center pt-5'>
          <button
            type='reset'
            onClick={() => cancel()}
            className='btn btn-light me-3'
            data-kt-users-modal-action='cancel'
            disabled={formik.isSubmitting || isUserLoading}
          >
            Discard
          </button>

          <button
            type='submit'
            className='btn btn-primary'
            data-kt-users-modal-action='submit'
            style={{color: '#1034A6'}}
            disabled={isUserLoading || formik.isSubmitting || !formik.isValid || !formik.touched}
          >
            <span className='indicator-label'>Submit</span>
            {(formik.isSubmitting || isUserLoading) && (
              <span className='indicator-progress'>
                Please wait...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
      </form>
      {(formik.isSubmitting || isUserLoading) && <UsersListLoading />}
    </>
  )
}

// export {UserEditModalForm}
export default UserEditModalForm
