import {useState} from 'react'
import {KTIcon} from '../../../../../../_metronic/helpers'

const PasswordFormField = ({formik, label, name, ml = '16rem'}) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }
  return (
    <div className='fv-row mb-7'>
      <label htmlFor='confirmpassword' className='form-label fs-6 fw-bolder mb-3'>
        {label}
      </label>
      <input
        placeholder={`Enter ${label}`}
        type={showPassword ? 'text' : 'password'}
        className='form-control form-control-lg form-control-solid '
        id='confirmpassword'
        {...formik.getFieldProps(name)}
      />
      <div style={{marginLeft: ml, marginTop: '-39px'}} onClick={handleShowPassword}>
        <KTIcon iconName={showPassword ? 'eye-slash' : 'eye'} className='fs-2hx' />
      </div>

      {formik.touched[name] && formik.errors[name] && (
        <div className='fv-plugins-message-container'>
          <div className='fv-help-block'>{formik.errors[name]}</div>
        </div>
      )}
    </div>
  )
}

export default PasswordFormField
