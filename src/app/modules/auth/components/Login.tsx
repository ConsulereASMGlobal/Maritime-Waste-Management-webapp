/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import {getUserByToken, login} from '../core/_requests'
import {KTIcon, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {useAuth} from '../core/Auth'

const loginSchema = Yup.object().shape({
  mobile: Yup.string()
    // .number('Wrong mobile format')
    .min(9, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
})

const initialValues = {
  mobile: '1234567890',
  password: 'admin@123',
}

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
  const [loading, setLoading] = useState(false)
  const {saveAuth, setCurrentUser} = useAuth()

  const [lastLogin, setLastLogin] = useState<string>('SMART_CENTRE')

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      try {
        setStatus('')
        const {data: auth} = await login(values.mobile, values.password, lastLogin)
        saveAuth(auth)
        const {data: user} = await getUserByToken(auth.data.userId)
        setCurrentUser(user)
      } catch (error) {
        console.error(error)
        saveAuth(undefined)
        setStatus('The login details are incorrect')
        setSubmitting(false)
        setLoading(false)
      }
    },
  })

  const [showPassword, setShowPassword] = useState(false)

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      {(formik.status && (
        <div className='mb-lg-5 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      )) ||
        null}
      <div className='fv-row mb-8'>
        <label className='form-label fs-6 fw-bolder text-white'>User Type</label>
        <select
          className='form-select form-select-solid fw-bolder'
          data-kt-select2='true'
          data-placeholder='Select option'
          data-allow-clear='true'
          data-kt-user-table-filter='two-step'
          data-hide-search='true'
          onChange={(e) => setLastLogin(e.target.value)}
          value={lastLogin}
        >
          <option value='SMART_CENTRE'>SMART_CENTRE</option>
          <option value='FRANCHISE'>FRANCHISE</option>
        </select>
      </div>
      <div className='fv-row mb-8'>
        <label className='form-label fs-6 fw-bolder text-white'>Login</label>
        <input
          placeholder='Email'
          {...formik.getFieldProps('mobile')}
          className={clsx(
            'form-control bg-white',
            {'is-invalid': formik.touched.mobile && formik.errors.mobile},
            {
              'is-valid': formik.touched.mobile && !formik.errors.mobile,
            }
          )}
          type='mobile'
          name='mobile'
          autoComplete='off'
        />
        {formik.touched.mobile && formik.errors.mobile && (
          <div className='fv-plugins-message-container'>
            <span role='alert'>{formik.errors.mobile}</span>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-3'>
        <label className='form-label fw-bolder text-white fs-6 mb-0'>Password</label>
        <input
          type={showPassword ? 'text' : 'password'}
          autoComplete='off'
          {...formik.getFieldProps('password')}
          className={clsx(
            'form-control bg-white',
            {
              'is-invalid': formik.touched.password && formik.errors.password,
            },
            {
              'is-valid': formik.touched.password && !formik.errors.password,
            }
          )}
        />
        <div style={{marginLeft: '28rem', marginTop: '-39px'}} onClick={handleShowPassword}>
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
      {/* end::Form group */}

      {/* begin::Wrapper */}
      <div className='d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8'>
        <div />

        {/* begin::Link */}
        <Link to='/auth/forgot-password' className='link-primary text-white'>
          Forgot Password ?
        </Link>
        {/* end::Link */}
      </div>
      {/* end::Wrapper */}

      {/* begin::Action */}
      <div className='d-grid mb-10'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-primary'
          style={{backgroundColor: '#E89611', color: 'black'}}
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>Continue</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
      {/* end::Action */}
    </form>
  )
}
