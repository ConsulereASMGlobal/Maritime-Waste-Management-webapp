/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {IUpdateEmail, IUpdatePassword, updateEmail, updatePassword} from '../SettingsModel'
import {changePassword} from '../../../../auth/core/_requests'
import PasswordFormField from './PasswordFiledForm'

const passwordFormValidationSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  newPassword: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  passwordConfirmation: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required')
    .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
})

const SignInMethod: React.FC = () => {
  const [passwordUpdateData, setPasswordUpdateData] = useState<IUpdatePassword>(updatePassword)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)
  const [showPasswordForm, setPasswordForm] = useState<boolean>(false)

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [])

  const [loading2, setLoading2] = useState(false)

  const formik2 = useFormik<IUpdatePassword>({
    initialValues: {
      ...passwordUpdateData,
    },
    validationSchema: passwordFormValidationSchema,
    onSubmit: async (values, {setStatus, resetForm}) => {
      setLoading2(true)
      setStatus('')
      try {
        const res = await changePassword(values.currentPassword, values.newPassword)
        setStatus({status: 200, msg: res?.data?.data})
        setLoading2(false)
        setPasswordForm(false)
        setPasswordUpdateData(values)
        const newTimeoutId = setTimeout(() => {
          setStatus('')
        }, 3000)
        setTimeoutId(newTimeoutId)
        // formik2.setValues({currentPassword: '', newPassword: '', passwordConfirmation: ''})
        resetForm()
      } catch (error: any) {
        setStatus({status: 400, msg: 'Error'})
        setLoading2(false)
      }
    },
  })

  return (
    <div className='card mb-5 mb-xl-10'>
      <div id='kt_account_signin_method' className='show'>
        <div className='card-body border-top p-9'>
          {(formik2?.status?.msg && (
            <div
              className={`mb-lg-15 alert alert-${
                (formik2.status?.status === 200 && 'success') || 'danger'
              }`}
            >
              <div className='alert-text font-weight-bold'>{formik2.status.msg}</div>
            </div>
          )) ||
            null}

          <div className='d-flex flex-wrap align-items-center mb-10'>
            <div id='kt_signin_password' className={' ' + (showPasswordForm && 'd-none')}>
              <div className='fs-6 fw-bolder mb-1'>Password</div>
              <div className='fw-bold text-gray-600'>************</div>
            </div>

            <div
              id='kt_signin_password_edit'
              className={'flex-row-fluid ' + (!showPasswordForm && 'd-none')}
            >
              <form
                onSubmit={formik2.handleSubmit}
                id='kt_signin_change_password'
                className='form'
                noValidate
              >
                <div className='row mb-1'>
                  <PasswordFormField
                    formik={formik2}
                    name={'currentPassword'}
                    label={'Current Password'}
                  />
                  <PasswordFormField formik={formik2} name={'newPassword'} label={'New Password'} />
                  <PasswordFormField
                    formik={formik2}
                    name={'passwordConfirmation'}
                    label={'Confirm New Password'}
                  />
                </div>
                <div className='form-text mb-5'>
                  Password must be at least 8 character and contain symbols
                </div>

                <div className='d-flex'>
                  <button
                    id='kt_password_submit'
                    type='submit'
                    className='btn btn-primary me-2 px-6'
                  >
                    {!loading2 && 'Update Password'}
                    {loading2 && (
                      <span className='indicator-progress' style={{display: 'block'}}>
                        Please wait...{' '}
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setPasswordForm(false)
                    }}
                    id='kt_password_cancel'
                    type='button'
                    className='btn btn-color-gray-400 btn-active-light-primary px-6'
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>

            <div
              id='kt_signin_password_button'
              className={'ms-auto ' + (showPasswordForm && 'd-none')}
            >
              <button
                onClick={() => {
                  setPasswordForm(true)
                }}
                className='btn btn-light btn-active-light-primary'
              >
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {SignInMethod}
