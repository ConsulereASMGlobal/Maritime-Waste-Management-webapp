import {FC, useEffect, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {
  isNotEmpty,
  // countryList,
  stateList,
  cityList,
  toAbsoluteUrl,
} from '../../../../../../_metronic/helpers'
import {initialUser, User} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {UsersListLoading} from '../components/loading/UsersListLoading'
import {createUser, updateUser} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'
import axios from 'axios'
import CountryDropDown from '../../../../../../_metronic/helpers/countryDropDown'
import {useQuery} from 'react-query'
import {getUserById} from '../core/_requests'
import {errorToast, successToast} from '../../../../../../_metronic/helpers/components/Toaster'
import PasswordFormField from '../../../../accounts/components/settings/cards/PasswordFiledForm'
import UploadImage from '../../../../../../_metronic/helpers/components/ImageUpload'
import {useFetchCommon} from '../../../../../../_metronic/helpers/crud-helper/useQuery'
import {countryList} from '../../../../../../_metronic/helpers/allCOuntry'

type Props = {
  isUserLoading: boolean
  user?: User | any
}

const editUserSchema = (isEdit = false) =>
  Yup.object().shape({
    // name: Yup.string().required('Name is required'),
    // phone: Yup.string()
    //   .min(7, 'Minimum 7 symbols')
    //   .max(50, 'Maximum 50 symbols')
    //   .required('Phone number is required'),
    // email: Yup.string()
    //   .email('Wrong email format')
    //   .min(3, 'Minimum 3 symbols')
    //   .max(50, 'Maximum 50 symbols')
    //   .required('Emailis required'),
    // address: Yup.string().required('Address is required'),
    // bankName: Yup.string()
    //   .min(3, 'Minimum 3 symbols')
    //   .max(50, 'Maximum 50 symbols')
    //   .required('bankName is required'),
    // accountName: Yup.string()
    //   .min(3, 'Minimum 3 symbols')
    //   .max(50, 'Maximum 50 symbols')
    //   .required('accountName is required'),
    // proofEstablishment: Yup.mixed().required('Icon is required'),
    // ...((!isEdit && {
    //   countryCode: Yup.string().required('Country Code is required'),
    //   country: Yup.string().required('Country  is required'),
    //   state: Yup.string().required('State is required'),
    //   city: Yup.string().required('City  is required'),
    //   password: Yup.string()
    //     .min(3, 'Minimum 3 symbols')
    //     .max(50, 'Maximum 50 symbols')
    //     .required('Password is required'),
    //   companyName: Yup.string()
    //     .min(3, 'Minimum 3 symbols')
    //     .max(50, 'Maximum 50 symbols')
    //     .required('Company Name is required'),
    // }) ||
    //   {}),
    // proofEstablishment: Yup.mixed().required('Image is required'),
    // proofOfIdentity: Yup.mixed().required('Image is required'),
    // proofOfFacility: Yup.mixed().required('Image is required'),
  })
const UserEditModalForm: FC<Props> = ({user = {}, isUserLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()
  const [userForEdit] = useState<any>({
    ...user,
    name: user.companyDetails?.name || '',
    phone: user.personalDetails?.mobile || '',
    password: user.password || '',
    email: user.personalDetails?.email || '',
    country: user.address?.country || '',
    state: user.address?.state || '',
    city: user.address?.city || '',
    address: user.address?.street || '',
    companyName: user.companyName || '',
    bankName: user?.bankDetails?.bankName || '',
    accountName: user?.bankDetails?.accountNo || '',
    accountHolderName: user.bankDetails?.accountName || '',
    countryCode: 'Malaysia',
    centerId: user.centerId || '',
    zipCode: user.address?.zipCode || '',
    proofEstablishment: user.kycDocument?.[0]?.docUrl || '',
    proofOfIdentity: user.personalDetails?.proofOfIdentity || '',
    proofOfFacility: user.personalDetails?.proofOfFacility || '',
  })

  const {responseData} = useFetchCommon({api: 'banks', sameLabelId: true})
  console.log({responseData}, 'recyling')
  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }
  const isEdit: boolean = user.id
  const formik: any = useFormik({
    initialValues: userForEdit,
    validationSchema: editUserSchema(isEdit),
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        const {
          name,
          phone,
          bankName,
          accountName,
          password,
          email,
          country,
          state,
          city,
          address,
          proofEstablishment,
          centerId,
          PPRS,
          zipCode,
          ISO9001,
          accountHolderName,
          firstName,
          countryCode,
        } = values
        const payload = {
          address: {
            city,
            country: countryCode,
            bankName,
            accountName,
            state,
            street: address,
            zipCode: zipCode,
          },
          bankDetails: {
            bankName,
            accountNo: accountName,
            upiId: '',
            ifscCode: '',
            accountName: accountHolderName,
          },
          companyDetails: {
            companyId: '',
            name: name,
          },
          email,
          firstName: firstName,
          password,
          lastName: '',
          mobile: phone,
          userType: 'FRANCHISE',
          kycDocument: [
            {
              docType: 'POE',
              docUrl: proofEstablishment,
              docNumber: '',
            },
          ],
          centerId,
          PPRS,
          ISO9001,
        }
        if (isNotEmpty(values.id)) {
          await updateUser(payload, 'users/' + user.id + '/update')
          successToast('Modified')
        } else {
          await createUser(payload, 'user/register')
          successToast('Added')
        }
      } catch (ex) {
        errorToast('Error')
        console.error(ex)
      } finally {
        setSubmitting(true)
        cancel(true)
      }
    },
  })
  const makeSelectDropDown = (name = '', options: any = []) => {
    return (
      <select
        // className='form-select form-select-solid form-select-lg'
        className={clsx(
          'form-control form-control-solid mb-3 mb-lg-0',
          {'is-invalid': formik.touched[name] && formik.errors[name]},
          {
            'is-valid': formik.touched[name] && !formik.errors[name],
          }
        )}
        {...formik.getFieldProps(name)}
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
      formik.setFieldValue('proofEstablishment', response.data.data.name)
    }
  }
  const blankImg = toAbsoluteUrl('/media/svg/avatars/blank.svg')

  return (
    <>
      <form id='kt_modal_add_user_form' className='form' onSubmit={formik.handleSubmit} noValidate>
        {/*      <div className='fv-row mb-7'>
          <label className='required fw-bold fs-6 mb-2'>Franchise</label>
          {makeSelectDropDown('centerId', assignHubPlastic)}
        </div> */}
        <div className='fv-row mb-7'>
          <label className='required fw-bold fs-6 mb-2'>Shipping Company Name</label>
          <input
            placeholder='Enter Business Name'
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
          <label className='required fw-bold fs-6 mb-2'>Representative Name</label>
          <input
            placeholder='Enter Representative Name'
            {...formik.getFieldProps('firstName')}
            type='text'
            name='firstName'
            className={clsx(
              'form-control form-control-solid mb-3 mb-lg-0',
              {'is-invalid': formik.touched.firstName && formik.errors.firstName},
              {
                'is-valid': formik.touched.firstName && !formik.errors.firstName,
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
        {/* {(!isEdit && (
          <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'>User Name</label>
            <input
              placeholder='Enter User Name'
              {...formik.getFieldProps('companyName')}
              type='text'
              name='companyName'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.companyName && formik.errors.companyName},
                {
                  'is-valid': formik.touched.companyName && !formik.errors.companyName,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.companyName && formik.errors.companyName && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.companyName}</span>
                </div>
              </div>
            )}
          </div>
        )) ||
          null} */}

        {/* <div className='fv-row mb-7'>
          <label className='required fw-bold fs-6 mb-2'>Country Code</label>
          {makeSelectDropDown('countryCode', countryList)}
        </div> */}

        <div className='fv-row mb-7'>
          <label className='required fw-bold fs-6 mb-2'>Mobile No</label>
          <small className=''> (will be used for App Login)</small>
          <input
            placeholder='Enter mobile number (9XX XXX XXXX)'
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
        {(!isEdit && (
          <PasswordFormField ml={'46rem'} formik={formik} name={'password'} label={'Password'} />
        )) ||
          null}
        <div className='fv-row mb-7'>
          <label className='fw-bold fs-6 mb-2'>Email</label>
          <input
            placeholder='Enter Email'
            {...formik.getFieldProps('email')}
            type='text'
            name='email'
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
        {(!isEdit && (
          <>
            {/* <CountryDropDown name='country' formik={formik} showNameOnly /> */}
            <div className='fv-row mb-7'>
              <label className='required fw-bold fs-6 mb-2'>Country</label>
              {makeSelectDropDown('countryCode', countryList)}
            </div>
          </>
        )) ||
          false}
        <div className='fv-row mb-7'>
          <label className='required fw-bold fs-6 mb-2'>City</label>
          <input
            placeholder='Enter City'
            {...formik.getFieldProps('city')}
            type='text'
            name='city'
            className={clsx(
              'form-control form-control-solid mb-3 mb-lg-0',
              {'is-invalid': formik.touched.city && formik.errors.city},
              {
                'is-valid': formik.touched.city && !formik.errors.city,
              }
            )}
            autoComplete='off'
            disabled={formik.isSubmitting || isUserLoading}
          />
          <br />
          <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'>{isEdit ? 'Street' : 'Street'} </label>
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

          {formik.touched.city && formik.errors.city && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.city}</span>
              </div>
            </div>
          )}
        </div>
        <div className='fv-row mb-7'>
          <label className='required fw-bold fs-6 mb-2'>Zip Code</label>
          <input
            placeholder='Enter Zip Code'
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
        {/* <div className='mb-7 row'>
          <label className='fw-bold fs-6 mb-2'>Certifications available</label>
          <div className='d-flex col-6 gap-4'>
            <div className='form-check form-check-custom form-check-solid'>
              <input
                className='form-check-input me-3'
                {...formik.getFieldProps('role')}
                name={'PPRS'}
                type='checkbox'
                id={'kt_modal_update_role_option_0'}
                checked={formik.values['PPRS']}
                disabled={formik.isSubmitting || isUserLoading}
              />
              <label className='form-check-label' htmlFor='kt_modal_update_role_option_0'>
                <div className='fw-bolder text-gray-800'>PPRS</div>
              </label>
              <div className='separator separator-dashed my-5'></div>
            </div>
            <div className='form-check form-check-custom form-check-solid'>
              <input
                className='form-check-input me-3'
                {...formik.getFieldProps('role')}
                name={'ISO9001'}
                type='checkbox'
                id={'kt_modal_update_role_option_0'}
                checked={formik.values['ISO9001']}
                disabled={formik.isSubmitting || isUserLoading}
              />
              <label className='form-check-label' htmlFor='kt_modal_update_role_option_0'>
                <div className='fw-bolder text-gray-800'>ISO 9001</div>
              </label>
              <div className='separator separator-dashed my-5'></div>
            </div>
          </div>
        </div> */}
        <div className='flex flex-wrap'>
          <UploadImage name='proofEstablishment' formik={formik} label='Incorporation Document' />
          {/* <UploadImage name='proofOfIdentity' formik={formik} label='Proof of Identity' /> */}
          {/* <UploadImage name='proofOfFacility' formik={formik} label='Proof of Facility' /> */}
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
            style={{color: '#043e66'}}
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

// export {ShiftModalForm}
export default UserEditModalForm
