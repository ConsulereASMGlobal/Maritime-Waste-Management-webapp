import {FC, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {isNotEmpty, toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {initialUser, User} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {UsersListLoading} from '../components/loading/UsersListLoading'
import {createUser, updateUser} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'

type Props = {
  isUserLoading: boolean
  user?: User | any
}

const editUserSchema = Yup.object().shape({
  dropOffPoint: Yup.string().required('Facility Master Name is required'),
  addressLineOne: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Address Line 1 is required'),
  addressLineTwo: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Address Line 2 is required'),
  townCity: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Town City is required'),
  landMark: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('landMark  is required'),
  zipCode: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('ZipCode is required'),
  country: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Country is required'),
  latitude: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Latitude is required'),
  longitude: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Longitude is required'),
  operatingHours: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Operating Hours Number is required'),
  operatingDays: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Operating Days is required'),
  code: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Code is required'),
})

const DropOffPointModalForm: FC<Props> = ({user = {}, isUserLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()

  const [userForEdit] = useState<any>({
    ...user,
    dropOffPoint: '',
    addressLineOne: '',
    addressLineTwo: '',
    townCity: '',
    landMark: '',
    zipCode: '',
    country: '',
    latitude: '',
    longitude: '',
    operatingHours: '',
    operatingDays: '',
    code: '',
  })

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const formik: any = useFormik({
    initialValues: userForEdit,
    validationSchema: editUserSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        if (isNotEmpty(values.id)) {
          await updateUser(values)
        } else {
          await createUser(values)
        }
      } catch (ex) {
        console.error(ex)
      } finally {
        setSubmitting(true)
        cancel(true)
      }
    },
  })
  return (
    <>
      <form id='kt_modal_add_user_form' className='form' onSubmit={formik.handleSubmit} noValidate>
        <div className='fv-row mb-7'>
          <label className='required fw-bold fs-6 mb-2'>Process Name</label>
          <input
            placeholder='Enter Process Name'
            {...formik.getFieldProps('dropOffPoint')}
            type='text'
            name='dropOffPoint'
            className={clsx(
              'form-control form-control-solid mb-3 mb-lg-0',
              {'is-invalid': formik.touched.dropOffPoint && formik.errors.dropOffPoint},
              {
                'is-valid': formik.touched.dropOffPoint && !formik.errors.dropOffPoint,
              }
            )}
            autoComplete='off'
            disabled={formik.isSubmitting || isUserLoading}
          />
          {formik.touched.dropOffPoint && formik.errors.dropOffPoint && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.dropOffPoint}</span>
              </div>
            </div>
          )}
        </div>
        <div className='fv-row mb-7'>
          <label className='required fw-bold fs-6 mb-2'>Address Line 1</label>
          <input
            placeholder='Enter Address Line 1'
            {...formik.getFieldProps('addressLineOne')}
            type='text'
            name='addressLineOne'
            className={clsx(
              'form-control form-control-solid mb-3 mb-lg-0',
              {'is-invalid': formik.touched.addressLineOne && formik.errors.addressLineOne},
              {
                'is-valid': formik.touched.addressLineOne && !formik.errors.addressLineOne,
              }
            )}
            autoComplete='off'
            disabled={formik.isSubmitting || isUserLoading}
          />
          {formik.touched.addressLineOne && formik.errors.addressLineOne && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.addressLineOne}</span>
              </div>
            </div>
          )}
        </div>
        <div className='fv-row mb-7'>
          <label className='required fw-bold fs-6 mb-2'>Address Line 2</label>
          <input
            placeholder='Enter Address Line 2'
            {...formik.getFieldProps('addressLineTwo')}
            type='text'
            name='addressLineTwo'
            className={clsx(
              'form-control form-control-solid mb-3 mb-lg-0',
              {'is-invalid': formik.touched.addressLineTwo && formik.errors.addressLineTwo},
              {
                'is-valid': formik.touched.addressLineTwo && !formik.errors.addressLineTwo,
              }
            )}
            autoComplete='off'
            disabled={formik.isSubmitting || isUserLoading}
          />
          {formik.touched.addressLineTwo && formik.errors.addressLineTwo && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.addressLineTwo}</span>
              </div>
            </div>
          )}
        </div>
        <div className='fv-row mb-7'>
          <label className='required fw-bold fs-6 mb-2'>Town/ City</label>
          <input
            placeholder='Enter Town/ City'
            {...formik.getFieldProps('townCity')}
            type='text'
            name='townCity'
            className={clsx(
              'form-control form-control-solid mb-3 mb-lg-0',
              {'is-invalid': formik.touched.townCity && formik.errors.townCity},
              {
                'is-valid': formik.touched.townCity && !formik.errors.townCity,
              }
            )}
            autoComplete='off'
            disabled={formik.isSubmitting || isUserLoading}
          />
          {formik.touched.townCity && formik.errors.townCity && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.townCity}</span>
              </div>
            </div>
          )}
        </div>
        <div className='fv-row mb-7'>
          <label className='required fw-bold fs-6 mb-2'>Landmark</label>
          <input
            placeholder='Enter Landmark'
            {...formik.getFieldProps('landMark')}
            type='text'
            name='landMark'
            className={clsx(
              'form-control form-control-solid mb-3 mb-lg-0',
              {'is-invalid': formik.touched.landMark && formik.errors.landMark},
              {
                'is-valid': formik.touched.landMark && !formik.errors.landMark,
              }
            )}
            autoComplete='off'
            disabled={formik.isSubmitting || isUserLoading}
          />
          {formik.touched.landMark && formik.errors.landMark && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.landMark}</span>
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
        <div className='fv-row mb-7'>
          <label className='required fw-bold fs-6 mb-2'>Country</label>
          <input
            placeholder='Enter Country'
            {...formik.getFieldProps('country')}
            type='text'
            name='country'
            className={clsx(
              'form-control form-control-solid mb-3 mb-lg-0',
              {'is-invalid': formik.touched.country && formik.errors.country},
              {
                'is-valid': formik.touched.country && !formik.errors.country,
              }
            )}
            autoComplete='off'
            disabled={formik.isSubmitting || isUserLoading}
          />
          {formik.touched.country && formik.errors.country && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.country}</span>
              </div>
            </div>
          )}
        </div>
        <div className='fv-row mb-7'>
          <label className='required fw-bold fs-6 mb-2'>Latitude</label>
          <input
            placeholder='Enter Latitude'
            {...formik.getFieldProps('latitude')}
            type='text'
            name='latitude'
            className={clsx(
              'form-control form-control-solid mb-3 mb-lg-0',
              {'is-invalid': formik.touched.latitude && formik.errors.latitude},
              {
                'is-valid': formik.touched.latitude && !formik.errors.latitude,
              }
            )}
            autoComplete='off'
            disabled={formik.isSubmitting || isUserLoading}
          />
          {formik.touched.latitude && formik.errors.latitude && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.latitude}</span>
              </div>
            </div>
          )}
        </div>
        <div className='fv-row mb-7'>
          <label className='required fw-bold fs-6 mb-2'>Longitude</label>
          <input
            placeholder='Enter Longitude'
            {...formik.getFieldProps('longitude')}
            type='text'
            name='longitude'
            className={clsx(
              'form-control form-control-solid mb-3 mb-lg-0',
              {'is-invalid': formik.touched.longitude && formik.errors.longitude},
              {
                'is-valid': formik.touched.longitude && !formik.errors.longitude,
              }
            )}
            autoComplete='off'
            disabled={formik.isSubmitting || isUserLoading}
          />
          {formik.touched.longitude && formik.errors.longitude && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.longitude}</span>
              </div>
            </div>
          )}
        </div>
        <div className='fv-row mb-7'>
          <label className='required fw-bold fs-6 mb-2'>Operating Hours</label>
          <input
            placeholder='Enter Operating Hours'
            {...formik.getFieldProps('operatingHours')}
            type='text'
            name='operatingHours'
            className={clsx(
              'form-control form-control-solid mb-3 mb-lg-0',
              {
                'is-invalid': formik.touched.operatingHours && formik.errors.operatingHours,
              },
              {
                'is-valid': formik.touched.operatingHours && !formik.errors.operatingHours,
              }
            )}
            autoComplete='off'
            disabled={formik.isSubmitting || isUserLoading}
          />
          {formik.touched.operatingHours && formik.errors.operatingHours && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.operatingHours}</span>
              </div>
            </div>
          )}
        </div>
        <div className='fv-row mb-7'>
          <label className='required fw-bold fs-6 mb-2'>Operating Days</label>
          <input
            placeholder='Enter Operating Days'
            {...formik.getFieldProps('operatingDays')}
            type='text'
            name='operatingDays'
            className={clsx(
              'form-control form-control-solid mb-3 mb-lg-0',
              {'is-invalid': formik.touched.operatingDays && formik.errors.operatingDays},
              {
                'is-valid': formik.touched.operatingDays && !formik.errors.operatingDays,
              }
            )}
            autoComplete='off'
            disabled={formik.isSubmitting || isUserLoading}
          />
          {formik.touched.operatingDays && formik.errors.operatingDays && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.operatingDays}</span>
              </div>
            </div>
          )}
        </div>
        <div className='fv-row mb-7'>
          <label className='required fw-bold fs-6 mb-2'>Code</label>
          <input
            placeholder='Enter Code'
            {...formik.getFieldProps('code')}
            type='text'
            name='code'
            className={clsx(
              'form-control form-control-solid mb-3 mb-lg-0',
              {'is-invalid': formik.touched.code && formik.errors.code},
              {
                'is-valid': formik.touched.code && !formik.errors.code,
              }
            )}
            autoComplete='off'
            disabled={formik.isSubmitting || isUserLoading}
          />
          {formik.touched.code && formik.errors.code && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.code}</span>
              </div>
            </div>
          )}
        </div>
        <div className='text-center pt-15'>
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

export default DropOffPointModalForm
