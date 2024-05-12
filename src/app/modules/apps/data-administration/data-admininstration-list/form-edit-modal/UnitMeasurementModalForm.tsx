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
import {errorToast, successToast} from '../../../../../../_metronic/helpers/components/Toaster'

type Props = {
  isUserLoading: boolean
  user?: User | any
}

const editUserSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Name is required'),
  address: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Address is required'),
  mobileNumber: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(15, 'Maximum 50 symbols')
    .required('Mobile Number is required'),
})

const UnitMeasurementModalForm: FC<Props> = ({user = {}, isUserLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()

  const [userForEdit] = useState<any>({
    ...user,
    name: user.name || '',
    address: user.address || '',
    mobileNumber: user.mobileNumber || '',
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
        const payload = {
          firstName: values.name,
          mobile: values.mobileNumber,
          middleName: '',
          lastName: '',
          userType: 'CUSTOMER',
          customerType: 'CORPORATE',
          address: {
            country: '',
            state: '',
            city: '',
            zipCode: '',
            street: values.address,
            landMark: '',
            latitute: 0,
            longitute: 0,
          },
        }
        if (isNotEmpty(values.id)) {
          await updateUser(values)
          successToast('Modified')
        } else {
          await createUser(payload, 'user/register')
          successToast('Added')
          cancel(true)
        }
      } catch (ex) {
        errorToast('Somethig Went Wrong')
        console.error(ex)
      } finally {
        setSubmitting(true)
      }
    },
  })
  return (
    <>
      <form id='kt_modal_add_user_form' className='form' onSubmit={formik.handleSubmit} noValidate>
        <div className='fv-row mb-7'>
          <label className='required fw-bold fs-6 mb-2'>Name</label>
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
          <label className='required fw-bold fs-6 mb-2'>Address</label>
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
          <label className='required fw-bold fs-6 mb-2'>Mobile Number</label>
          <input
            placeholder='Enter Mobile Number'
            {...formik.getFieldProps('mobileNumber')}
            type='text'
            name='mobileNumber'
            className={clsx(
              'form-control form-control-solid mb-3 mb-lg-0',
              {'is-invalid': formik.touched.mobileNumber && formik.errors.mobileNumber},
              {
                'is-valid': formik.touched.mobileNumber && !formik.errors.mobileNumber,
              }
            )}
            autoComplete='off'
            disabled={formik.isSubmitting || isUserLoading}
          />
          {formik.touched.mobileNumber && formik.errors.mobileNumber && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.mobileNumber}</span>
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

export default UnitMeasurementModalForm
