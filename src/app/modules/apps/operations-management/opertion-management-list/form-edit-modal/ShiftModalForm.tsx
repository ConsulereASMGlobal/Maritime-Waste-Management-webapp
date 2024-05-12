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
  ShiftName: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Shift Name is required'),
  startTime: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Start Time is required'),
  endTime: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('End Time is required'),
})

const ShiftModalForm: FC<Props> = ({user = {}, isUserLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()

  const [userForEdit] = useState<any>({
    ...user,
    ShiftName: '',
    startTime: '',
    endTime: '',
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
          <label className='required fw-bold fs-6 mb-2'>Shift Name</label>
          <input
            placeholder='Enter Shift Name'
            {...formik.getFieldProps('ShiftName')}
            type='text'
            name='ShiftName'
            className={clsx(
              'form-control form-control-solid mb-3 mb-lg-0',
              {'is-invalid': formik.touched.ShiftName && formik.errors.ShiftName},
              {
                'is-valid': formik.touched.ShiftName && !formik.errors.ShiftName,
              }
            )}
            autoComplete='off'
            disabled={formik.isSubmitting || isUserLoading}
          />
          {formik.touched.ShiftName && formik.errors.ShiftName && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.ShiftName}</span>
              </div>
            </div>
          )}
        </div>
        <div className='fv-row mb-7'>
          <label className='required fw-bold fs-6 mb-2'>Start Time</label>
          <input
            placeholder='Enter Start Time'
            {...formik.getFieldProps('startTime')}
            type='text'
            name='startTime'
            className={clsx(
              'form-control form-control-solid mb-3 mb-lg-0',
              {'is-invalid': formik.touched.startTime && formik.errors.startTime},
              {
                'is-valid': formik.touched.startTime && !formik.errors.startTime,
              }
            )}
            autoComplete='off'
            disabled={formik.isSubmitting || isUserLoading}
          />
          {formik.touched.startTime && formik.errors.startTime && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.startTime}</span>
              </div>
            </div>
          )}
        </div>
        <div className='fv-row mb-7'>
          <label className='required fw-bold fs-6 mb-2'>Start Time</label>
          <input
            placeholder='Enter End Time'
            {...formik.getFieldProps('endTime')}
            type='text'
            name='endTime'
            className={clsx(
              'form-control form-control-solid mb-3 mb-lg-0',
              {'is-invalid': formik.touched.endTime && formik.errors.endTime},
              {
                'is-valid': formik.touched.endTime && !formik.errors.endTime,
              }
            )}
            autoComplete='off'
            disabled={formik.isSubmitting || isUserLoading}
          />
          {formik.touched.endTime && formik.errors.endTime && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.endTime}</span>
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

// export {ShiftModalForm}
export default ShiftModalForm
