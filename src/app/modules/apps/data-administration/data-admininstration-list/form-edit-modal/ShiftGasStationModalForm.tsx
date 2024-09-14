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
import {useAuth} from '../../../../auth'
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
const ShiftModalForm: FC<Props> = ({user = {}, isUserLoading}) => {
  const {setItemIdForUpdate} = useListView()

  const {auth} = useAuth()
  const hideDropdown = auth?.data?.userType === 'SMART_CENTRE' || false
  const {refetch} = useQueryResponse()
  const [userForEdit] = useState<any>({
    ...user,
    name: user.personalDetails?.name || '',
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
    centerId: user.franchiseId || '',
    zipCode: user.address?.zipCode || '',
    proofEstablishment: user.kycDocument?.[0]?.docUrl || '',
    proofOfIdentity: user.kycDocument?.[1]?.docUrl || '',
    proofOfFacility: user.personalDetails?.proofOfFacility || '',
  })

  const [assignHubPlastic, setAssignHubPlastic] = useState([])
  const [isEnabled, setIsEnabled] = useState(true)

  const {data: response} = useQuery(
    'process',
    () => getUserById(null, 'users?page=1&size=10&type=FRANCHISE'),
    {
      cacheTime: 0,
      onError: (err) => {
        setItemIdForUpdate(undefined)
        console.error(err)
      },
      enabled: isEnabled, // Set this to true to run the query once
    }
  )

  useEffect(() => {
    if (response?.length) {
      setIsEnabled(false)
      const tempAllCategories = response.map((eachRes) => {
        return {
          label: eachRes?.companyDetails?.name || '',
          value: eachRes.id,
        }
      })
      setAssignHubPlastic(tempAllCategories)
    }
  }, [response])

  const vesselType = [
    {label: 'Ship', value: 'Ship'},
    {label: 'Fishing Vessel', value: 'Fishing Vessel'},
    {label: 'Recreational Vessel', value: 'Recreational Vessel'},
    {label: 'Yacht', value: 'Yacht'},
  ]

  const {responseData} = useFetchCommon({api: 'banks', sameLabelId: true})
  console.log({responseData})
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
          proofOfIdentity,
          centerId,
          PPRS,
          ISO9001,
          zipCode,
          accountHolderName,
          countryCode,
          vehicleNumber,
          firstName,
          vehicleType,
        } = values
        const payload = {
          vehicleNumber,
          vehicleType,
          lastName: '',
          email: email,
          mobile: phone,
          userType: 'PICKUP_POINT',
          countryCode: country,
          firstName: firstName,
          address: {
            street: address,
            city,
            country: countryCode,
            latitute: 37.785834,
            longitute: -122.406417,
            zipCode: zipCode,
            countryCode: '',
          },
          bankDetails: {
            bankName,
            accountNo: accountName,
            upiId: '',
            ifscCode: '',
            accountName: accountHolderName,
          },
          password: password,
          status: 'ACTIVE',
          franchiseId: !hideDropdown ? auth?.data?.userId : centerId,
          franchiseName: 'Trash for Cash',
          kycDocument: [
            {
              docUrl: proofEstablishment,
              docNumber: '',
              docType: 'POE',
            },
            {
              docUrl: proofOfIdentity,
              docNumber: '',
              docType: 'POI',
            },
          ],
        }
        if (isNotEmpty(values.id)) {
          await updateUser(payload, 'users/' + user.id + '/update')
          successToast('Modified')
        } else {
          await createUser(payload, 'user/register')
          successToast('Added')
        }
        cancel(true)
      } catch (ex) {
        errorToast('Error')
        console.error(ex)
      } finally {
        setSubmitting(true)
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
        {(hideDropdown && (
          <div className='fv-row mb-7'>
            <label className='fw-bold fs-6 mb-2'>Shipping Company</label>
            {makeSelectDropDown('centerId', assignHubPlastic)}
          </div>
        )) ||
          null}
        <div className='fv-row mb-7'>
          <label className='required fw-bold fs-6 mb-2'>Vessel No</label>
          <input
            placeholder='Enter Vessel No'
            {...formik.getFieldProps('vehicleNumber')}
            type='text'
            name='vehicleNumber'
            className={clsx(
              'form-control form-control-solid mb-3 mb-lg-0',
              {'is-invalid': formik.touched.vehicleNumber && formik.errors.vehicleNumber},
              {
                'is-valid': formik.touched.vehicleNumber && !formik.errors.vehicleNumber,
              }
            )}
            autoComplete='off'
            disabled={formik.isSubmitting || isUserLoading}
          />
          {formik.touched.vehicleNumber && formik.errors.vehicleNumber && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.vehicleNumber}</span>
              </div>
            </div>
          )}
        </div>
        <div className='fv-row mb-7'>
          <label className='fw-bold fs-6 mb-2'>Vessel Type</label>
          {makeSelectDropDown('vehicleType', vesselType)}
        </div>
        <div className='fv-row mb-7'>
          <label className='required fw-bold fs-6 mb-2'>Captain Name</label>
          <input
            placeholder='Enter Captain Name'
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

        {/*     <div className='fv-row mb-7'>
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
            {/* <CountryDropDown name='country' formik={formik} showNameOnly showState /> */}
            <div className='fv-row mb-7'>
              <label className='required fw-bold fs-6 mb-2'>Country</label>
              {makeSelectDropDown('countryCode', countryList)}
            </div>
          </>
        )) ||
          false}
        <div className='fv-row mb-7'>
          <label className='required fw-bold fs-6 mb-2'>Home Port/ City</label>
          <input
            placeholder='Enter Home Port'
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
          {formik.touched.city && formik.errors.city && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.city}</span>
              </div>
            </div>
          )}
        </div>
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
        <div className='flex flex-wrap'>
          <UploadImage name='proofEstablishment' formik={formik} label='Ship Picture' />
          <UploadImage name='proofOfIdentity' formik={formik} label='Captain Picture' />
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
export default ShiftModalForm
