import React, {useEffect, useState} from 'react'
import clsx from 'clsx'
import {countryList, stateList, cityList} from './../helpers/stateCity'
export default function CountryDropDown({
  name = 'country',
  formik,
  showCity = false,
  showState = false,
  showNameOnly = false,
  isReadOnly = false,
}) {
  const [cityFitlerList, setCityFitlerList] = useState([])

  useEffect(() => {
    if (formik.values.country || !formik.values.country) {
      formik.setFieldValue('city', '')
      formik.setFieldValue('state', '')
    }
  }, [formik.values.country])

  useEffect(() => {
    if (formik.values.state) {
      // const filteredCityList: any = cityList.filter((x) => x.province === formik.values.state)
      const filteredCityList = cityList[formik.values.state] || []
      setCityFitlerList(filteredCityList)
      formik.setFieldValue('city', '')
    }
  }, [formik.values.state])

  const makeSelectDropDown = (
    name = '',
    options: any = [],
    formik,
    disabled = false,
    optionValue = ''
  ) => {
    console.log({options})
    return (
      <select
        disabled={disabled || isReadOnly}
        className={clsx(
          'form-control form-control-solid mb-3 mb-lg-0',
          {'is-invalid': formik.touched[name] && formik.errors[name]},
          {
            'is-valid': formik.touched[name] && !formik.errors[name],
          }
        )}
        {...formik.getFieldProps(name)}
      >
        <option value={''}>Select One...</option>
        {options.map((eachOption, eachInd) => (
          <option
            key={eachInd + 1 + ''}
            value={
              (optionValue && eachOption[optionValue]) ||
              eachOption.value ||
              eachOption.key ||
              eachOption.id ||
              eachOption
            }
          >
            {eachOption.label || eachOption.name || eachOption}
          </option>
        ))}
      </select>
    )
  }
  return (
    <>
      <div className='fv-row mb-7'>
        <label className='required fw-bold fs-6 mb-2'>Country</label>
        {makeSelectDropDown(name, countryList, formik)}
        {formik.touched[name] && formik.errors[name] && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors[name]}</span>
            </div>
          </div>
        )}
      </div>
      {(showState && (
        <div className='fv-row mb-7'>
          <label className='required fw-bold fs-6 mb-2'>Province</label>
          {makeSelectDropDown('state', stateList, formik, !formik.values.country)}
          {formik.touched.state && formik.errors.state && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.state}</span>
              </div>
            </div>
          )}
        </div>
      )) ||
        null}
      {(showCity && (
        <div className='fv-row mb-7'>
          <label className='required fw-bold fs-6 mb-2'>City</label>
          {makeSelectDropDown('city', cityFitlerList, formik, !formik.values.state, 'name')}
          {formik.touched.city && formik.errors.city && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.city}</span>
              </div>
            </div>
          )}
        </div>
      )) ||
        null}
    </>
  )
}
