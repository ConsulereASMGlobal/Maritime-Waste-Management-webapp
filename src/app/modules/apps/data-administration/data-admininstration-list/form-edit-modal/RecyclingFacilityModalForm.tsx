import {FC, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {
  cityList,
  stateList,
  countryList,
  isNotEmpty,
  toAbsoluteUrl,
} from '../../../../../../_metronic/helpers'
import {initialUser, User} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {UsersListLoading} from '../components/loading/UsersListLoading'
import {createUser, updateUser} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'
import CountryDropDown from '../../../../../../_metronic/helpers/countryDropDown'
import {errorToast, successToast} from '../../../../../../_metronic/helpers/components/Toaster'
import PasswordFormField from '../../../../accounts/components/settings/cards/PasswordFiledForm'
import UploadImage from '../../../../../../_metronic/helpers/components/ImageUpload'

type Props = {
  isUserLoading: boolean
  user?: User | any
}

const addUserSchema = Yup.object().shape({
  format: Yup.string().required('Format is required'),
  name: Yup.string().required('Format is required'),
  phone: Yup.string()
    .min(7, 'Minimum 7 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Phone number is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Emailis required'),
  country: Yup.string().required('Country  is required'),
  state: Yup.string().required('State is required'),
  city: Yup.string().required('City  is required'),
  address: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Address is required'),
  profileImage: Yup.mixed().required('Image is required'),
  bussinessImage: Yup.mixed().required('Image is required'),
})

const editUserSchema = Yup.object().shape({
  format: Yup.string().required('Format is required'),
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
  const [userForEdit] = useState<any>({
    ...user,
    format: (user.id && (user.facilityType || 'OWN')) || '',
    name: user.personalDetails?.name || '',
    phone: user.personalDetails?.mobile || '',
    password: user.password || '',
    email: user.personalDetails?.email || '',
    country: user.address?.country || '',
    state: user.address?.state || '',
    city: user.address?.city || '',
    address: user.address?.street || '',
    companyName: user?.companyDetails?.name || '',
    managerName: user?.companyDetails?.managerName || '',
    companyAddress: user?.companyDetails?.address,
    companyEmail: user?.companyDetails?.email,
    companyMobile: user?.companyDetails?.mobile,
    profileImage: user.personalDetails?.profileImage || '',
    bussinessImage: user.personalDetails?.bussinessImage || '',
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
        const {
          name,
          phone,
          password,
          email,
          country,
          state,
          city,
          address,
          companyName,
          managerName,
          companyMobile,
          companyEmail,
          companyAddress,
          format,
          profileImage,
          bussinessImage,
        } = values
        const payload = {
          address: {
            city,
            country,
            latitude: 0,
            longitude: 0,
            state,
            street: address,
            zipCode: '',
          },
          companyDetails: {
            managerName,
            companyId: user.companyId,
            name: companyName,
            mobile: companyMobile,
            email: companyEmail,
            address: companyAddress,
          },
          email,
          facilityType: format,
          firstName: name,
          lastName: '',
          mobile: phone,
          password,
          profileImage,
          bussinessImage,
          userType: 'SMART_CENTRE',
        }
        if (isNotEmpty(values.id)) {
          await updateUser(payload, 'users/' + user.id + '/update')
          successToast('Modified')
        } else {
          await createUser(payload, 'user/register')
          successToast('Added')
        }
      } catch (ex) {
        errorToast('Something Went Wrong')

        console.error(ex)
      } finally {
        setSubmitting(true)
        cancel(true)
      }
    },
  })
  const makeSelectDropDown = (format = '', options: any = []) => {
    return (
      <select
        // disabled={user.id || false}
        // className='form-select form-select-solid form-select-lg'
        className={clsx(
          'form-control form-control-solid mb-3 mb-lg-0',
          {'is-invalid': formik.touched[format] && formik.errors[format]},
          {
            'is-valid': formik.touched[format] && !formik.errors[format],
          }
        )}
        {...formik.getFieldProps(format)}
      >
        <option value=''>Select One...</option>
        {options.map((eachOption, eachInd) => (
          <option key={eachInd + 1 + ''} value={eachOption.value}>
            {eachOption.label}
          </option>
        ))}
      </select>
    )
  }
  const formatDropDown = [
    {label: 'Franchise', value: 'franchise'},
    {label: 'Own', value: 'own'},
  ]

  return (
    <>
      <form id='kt_modal_add_user_form' className='form' onSubmit={formik.handleSubmit} noValidate>
        <div className='row'>
          <h2 className='fw-bolder d-flex align-items- mb-5 mt-5 flex-center text-dark'>
            Company Information
          </h2>
          <div
            className='col-6 card btn-outline btn-outline-dashed '
            style={{padding: '10px 41px'}}
          >
            <div className='fv-row mb-7'>
              <label className='required fw-bold fs-6 mb-2'>Representative Name</label>
              {makeSelectDropDown('format', formatDropDown)}
            </div>
            <div className='fv-row mb-7'>
              <label className='required fw-bold fs-6 mb-2'>Company Name</label>
              <input
                placeholder='Enter Company Name'
                {...formik.getFieldProps('name')}
                type='text'
                format='text'
                // readOnly={user.id || false}
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
              <label className='required fw-bold fs-6 mb-2'>Mobile No</label>
              <input
                placeholder='Enter mobile number (+60 XX XXX XXXX)'
                {...formik.getFieldProps('phone')}
                type='number'
                format='phone'
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
            {!user.id && <PasswordFormField formik={formik} name={'password'} label={'Password'} />}
            <div className='fv-row mb-7'>
              <label className='required fw-bold fs-6 mb-2'>Email</label>
              <input
                placeholder='Enter Email'
                {...formik.getFieldProps('email')}
                type='text'
                format='email'
                className={clsx(
                  'form-control form-control-solid mb-3 mb-lg-0',
                  {'is-invalid': formik.touched.email && formik.errors.email},
                  {
                    'is-valid': formik.touched.email && !formik.errors.email,
                  }
                )}
                autoComplete='off'
                disabled={formik.isSubmitting || isUserLoading}
              />
              {formik.touched.email && formik.errors.email && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.email}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div
            className='col-6 card btn-outline btn-outline-dashed '
            style={{padding: '10px 41px'}}
          >
            {/*  <h2 className='fw-bolder d-flex align-items- mb-5 mt-5 flex-center text-dark'>
              Representative Information
            </h2>
            <div className='fv-row mb-7'>
              <label className='required fw-bold fs-6 mb-2'>Manager Name</label>
              <input
                placeholder='Manager Name'
                {...formik.getFieldProps('managerName')}
                type='text'
                format='managerName'
                className={clsx(
                  'form-control form-control-solid mb-3 mb-lg-0',
                  {'is-invalid': formik.touched.managerName && formik.errors.managerName},
                  {
                    'is-valid': formik.touched.managerName && !formik.errors.managerName,
                  }
                )}
                autoComplete='off'
                disabled={formik.isSubmitting || isUserLoading}
              />
              {formik.touched.managerName && formik.errors.managerName && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.managerName}</span>
                  </div>
                </div>
              )}
            </div>
            <div className='fv-row mb-7'>
              <label className='required fw-bold fs-6 mb-2'>Mobile No</label>
              <input
                placeholder='Enter mobile number (9XX XXX XXXX)'
                {...formik.getFieldProps('companyMobile')}
                type='number'
                format='companyMobile'
                className={clsx(
                  'form-control form-control-solid mb-3 mb-lg-0',
                  {'is-invalid': formik.touched.companyMobile && formik.errors.companyMobile},
                  {
                    'is-valid': formik.touched.companyMobile && !formik.errors.companyMobile,
                  }
                )}
                autoComplete='off'
                disabled={formik.isSubmitting || isUserLoading}
              />
              {formik.touched.companyMobile && formik.errors.companyMobile && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.companyMobile}</span>
                  </div>
                </div>
              )}
            </div>
            <div className='fv-row mb-7'>
              <label className='required fw-bold fs-6 mb-2'>Email</label>
              <input
                placeholder='Enter Email'
                {...formik.getFieldProps('companyEmail')}
                type='text'
                format='companyEmail'
                className={clsx(
                  'form-control form-control-solid mb-3 mb-lg-0',
                  {'is-invalid': formik.touched.companyEmail && formik.errors.companyEmail},
                  {
                    'is-valid': formik.touched.companyEmail && !formik.errors.companyEmail,
                  }
                )}
                autoComplete='off'
                disabled={formik.isSubmitting || isUserLoading}
              />
              {formik.touched.companyEmail && formik.errors.companyEmail && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.companyEmail}</span>
                  </div>
                </div>
              )}
            </div>
            <div className='fv-row mb-7'>
              <label className='required fw-bold fs-6 mb-2'>Address</label>
              <input
                placeholder='Enter Address'
                {...formik.getFieldProps('companyAddress')}
                type='text'
                format='companyAddress'
                className={clsx(
                  'form-control form-control-solid mb-3 mb-lg-0',
                  {'is-invalid': formik.touched.companyAddress && formik.errors.companyAddress},
                  {
                    'is-valid': formik.touched.companyAddress && !formik.errors.companyAddress,
                  }
                )}
                autoComplete='off'
                disabled={formik.isSubmitting || isUserLoading}
              />
              {formik.touched.companyAddress && formik.errors.companyAddress && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.companyAddress}</span>
                  </div>
                </div>
              )}
            </div> */}
            <div className='fv-row mb-7'>
              <label className='required fw-bold fs-6 mb-2'>Register Address</label>
              <input
                placeholder='Enter Register Address'
                {...formik.getFieldProps('address')}
                type='text'
                // readOnly={user.id || false}
                format='address'
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
            <CountryDropDown
              showState
              showCity
              name='country'
              formik={formik}
              showNameOnly
              isReadOnly={user.id || false}
            />
            <div className='flex flex-wrap'>
              <UploadImage name='profileImage' formik={formik} label='Upload SSM' />
              {/* <UploadImage name='bussinessImage' formik={formik} label='Upload Agreement' /> */}
            </div>
          </div>
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
        </div>
      </form>
      {(formik.isSubmitting || isUserLoading) && <UsersListLoading />}
    </>
  )
}

// export {UserEditModalForm}
export default UserEditModalForm
