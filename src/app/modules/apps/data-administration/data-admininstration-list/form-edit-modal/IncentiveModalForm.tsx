import {FC, useState, useEffect} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {
  isNotEmpty,
  currencyList,
  unitListItem,
  toAbsoluteUrl,
} from '../../../../../../_metronic/helpers'
import {initialUser, User} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {UsersListLoading} from '../components/loading/UsersListLoading'
import {createUser, updateUser} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'
import {useQuery} from 'react-query'
import {getUserById} from '../core/_requests'
import {errorToast, successToast} from '../../../../../../_metronic/helpers/components/Toaster'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Select from 'react-select'
import {useFetchCommon} from '../../../../../../_metronic/helpers/crud-helper/useQuery'

type Props = {
  isUserLoading: boolean
  user?: any
}
/* 
 "name": "Deal Name",
    "itemId": "",
    "itemName": "",
    "pickupointId": "",
    "pickupointName": "",
    "start": 33333333333,
    "end": 111111111111,
    "dealPrice": 20,
    "status": "ACTIVE"
*/

const editUserSchema = Yup.object().shape({
  /*  price: Yup.number().required('Price is required'),
  currency: Yup.string().required('Currency is required'),
  categoryId: Yup.string().required('Category is required'),
  itemId: Yup.string().required('Item is required'),
  unit: Yup.string().required('Base Price is required'), */
})

const RemarksModalForm: FC<Props> = ({user = {}, isUserLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()
  const [initialQuery, setInitialQuery] = useState<any>('clients/101212/categories')
  const {responseData} = useFetchCommon({
    api: 'users?type=PICKUP_POINT',
    label: ['personalDetails', 'name'],
  })

  const [userForEdit] = useState<any>({
    ...user,
    categoryId: user.categoryId || '',
    itemId: user.itemId || '',
    unit: user.unit || '',
    start: user.start || '',
    end: user.end || '',
    incentive: user.incentive || '',
  })

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const {data: response} = useQuery(initialQuery, () => getUserById(null, initialQuery), {
    cacheTime: 0,
    onError: (err) => {
      setItemIdForUpdate(undefined)
      console.error(err)
    },
  })
  const [categoryList, setCategoryList] = useState([])
  const [itemList, setItemList] = useState([])
  const [finishedGoodsList, setFinishedGoodsList] = useState<any>([])

  const [selectedOutCategoryDropdown, setselectedOutCategoryDropdown] = useState(
    user?.outCategoryId?.map((x) => ({...x, label: x.name})) || []
  )

  const formik: any = useFormik({
    initialValues: userForEdit,
    validationSchema: editUserSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        const payload = {
          ...values,
          status: 'ACTIVE',
          pickupointId: selectedOutCategoryDropdown.map((eachData) => {
            return {
              name: eachData.label,
              id: eachData.value,
            }
          }),
          dealPrice: values.unit,
          start: new Date(values?.start).getTime(),
          end: new Date(values?.end).getTime(),
        }
        if (isNotEmpty(values.id)) {
          await updateUser(payload, `deals/${values.id}/update`)
          successToast('Modified')
          cancel(true)
        } else {
          console.log({payload, selectedOutCategoryDropdown})
          await createUser(payload, 'deal')
          successToast('Added')
          cancel(true)
        }
      } catch (ex) {
        console.error(ex)
        errorToast('Something Went Wrong')
      } finally {
        setSubmitting(true)
      }
    },
  })

  const {responseData: priceList} = useFetchCommon({
    api: `categories/${formik?.values?.categoryId}/price`,
    isEnabled: formik?.values?.categoryId ? true : false,
    // label: ['price'],
    isDropDown: false,
  })

  useEffect(() => {
    if (priceList.length) {
      const filterData = priceList.filter((x) => x.itemId === formik?.values?.itemId)
      if (filterData.length) {
        formik.setFieldValue('incentive', filterData[0]?.price)
      }
    }
  }, [priceList, formik?.values?.itemId])

  useEffect(() => {
    if (response && initialQuery === 'clients/101212/categories') {
      const tempAllCategories = response.map((eachRes) => {
        return {
          label: eachRes.name,
          value: eachRes.id,
        }
      })
      setCategoryList(tempAllCategories)
      tempAllCategories.length &&
        user.categoryId &&
        setInitialQuery(
          user.categoryId
            ? `categories/${formik?.values?.categoryId}/items`
            : `categories/${tempAllCategories[0].value}/items`
        )
    }
    if (response && initialQuery !== 'clients/101212/categories') {
      const tempAllItems = response.map((eachRes) => {
        return {
          label: eachRes.name,
          value: eachRes.id,
        }
      })
      setItemList(tempAllItems)
    }
  }, [response])

  const handleSelect = (e) => {
    formik.setFieldValue('categoryId', e.target.value)
    formik.setFieldValue('itemId', '')
    setInitialQuery(`categories/${e.target.value}/items`)
  }

  const handleMultiSelect = (e, options, name, action) => {
    setselectedOutCategoryDropdown(e)
    if (action.removedValue?.length) {
      formik.setFieldValue('outMaterials', [])
    } else if (action?.removedValue) {
      const newFilteredData: any = finishedGoodsList.filter(
        (x) => x.categoryId !== action.removedValue.id
      )
      const filterInOutCategory = formik?.values['outMaterials']?.filter(
        (x) => x?.categoryId !== action?.removedValue?.id
      )
      formik.setFieldValue('inMaterials', filterInOutCategory)
      setFinishedGoodsList(newFilteredData)
    } else {
      const value = e[e.length - 1]?.value || ''
      const filter = options.filter((x) => x.value === value)
      if (filter.length) {
        formik.setFieldValue('outCategoryName', filter[0].name)
      }
      formik.setFieldValue([name], value)
    }
  }

  const makeSelectDropDown = (name = '', options: any = [], customHandle = false) => {
    return (
      <select
        onChange={(e) => (customHandle ? handleSelect(e) : null)}
        // className='form-select form-select-solid form-select-lg'
        className={clsx(
          'form-control form-control-solid mb-3 mb-lg-0',
          {'is-invalid': formik.touched[name] && formik.errors[name]},
          {
            'is-valid': formik.touched[name] && !formik.errors[name],
          }
        )}
        {...((!customHandle && {...formik.getFieldProps(name)}) || {})}
      >
        <option value=''>Select One...</option>
        {options.map((eachOption, eachInd) => (
          <option
            key={eachInd + 1 + ''}
            value={eachOption.value}
            selected={userForEdit.categoryId === eachOption.value ? true : false}
          >
            {eachOption.label}
          </option>
        ))}
      </select>
    )
  }

  const multiSelect = (name = '', options: any = [], value) => {
    return (
      <>
        <Select
          isMulti
          name={name}
          options={options}
          className='basic-multi-select'
          classNamePrefix='select'
          value={value}
          onChange={(selected, action) => handleMultiSelect(selected, options, name, action)}
        />
      </>
    )
  }

  return (
    <>
      <form id='kt_modal_add_user_form' className='form' onSubmit={formik.handleSubmit} noValidate>
        <div className='fv-row mb-7'>
          <label className='required fw-bold fs-6 mb-2'>Deal Name</label>
          <input
            placeholder='Add Deal Name'
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
          <label className='required fw-bold fs-6 mb-2'>Category</label>
          {makeSelectDropDown('categoryId', categoryList, true)}
          {formik.touched.categoryId && formik.errors.categoryId && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.categoryId}</span>
              </div>
            </div>
          )}
        </div>
        <div className='fv-row mb-7'>
          <label className='required fw-bold fs-6 mb-2'>Select Item</label>
          {makeSelectDropDown('itemId', itemList)}
          {formik.touched.itemId && formik.errors.itemId && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.itemId}</span>
              </div>
            </div>
          )}
        </div>
        <div className='fv-row mb-7'>
          <label className='required fw-bold fs-6 mb-2'>Base Price</label>
          <input
            readOnly
            placeholder='Add Incentive'
            {...formik.getFieldProps('incentive')}
            type='number'
            name='incentive'
            className={clsx(
              'form-control form-control-solid mb-3 mb-lg-0',
              {'is-invalid': formik.touched.incentive && formik.errors.incentive},
              {
                'is-valid': formik.touched.incentive && !formik.errors.incentive,
              }
            )}
            autoComplete='off'
            disabled={formik.isSubmitting || isUserLoading}
          />
          {formik.touched.incentive && formik.errors.incentive && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.incentive}</span>
              </div>
            </div>
          )}
        </div>
        <div className='fv-row mb-7'>
          <label className='required fw-bold fs-6 mb-2'>Incentive</label>
          <input
            placeholder='Add Incentive'
            {...formik.getFieldProps('unit')}
            type='number'
            name='unit'
            className={clsx(
              'form-control form-control-solid mb-3 mb-lg-0',
              {'is-invalid': formik.touched.unit && formik.errors.unit},
              {
                'is-valid': formik.touched.unit && !formik.errors.unit,
              }
            )}
            autoComplete='off'
            disabled={formik.isSubmitting || isUserLoading}
          />
          {formik.touched.unit && formik.errors.unit && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.unit}</span>
              </div>
            </div>
          )}
        </div>{' '}
        <div className='fv-row mb-7'>
          <label className='fw-bold fs-6 mb-2'>Aggregator</label>
          {multiSelect('facilityStaff', responseData, selectedOutCategoryDropdown)}
        </div>
        <div className='grid grid-cols-2 gap-2'>
          <div>
            <label className='required fw-bold fs-6 mb-2'>Start Date</label>
            <br />
            <DatePicker
              placeholderText={`Select Date`}
              className='form-control form-control-solid '
              selected={(formik?.values?.start && new Date(formik?.values?.start || null)) || null}
              // onChange={(date) => handleChange(eachSearch.name, new Date(date).toLocaleDateString())}
              onChange={(date) => formik.setFieldValue('start', new Date(date))}
            />
          </div>
          <div>
            <label className='required fw-bold fs-6 mb-2'>End Date</label>
            <br />
            <DatePicker
              placeholderText={`Select Date`}
              className='form-control form-control-solid '
              selected={(formik?.values?.end && new Date(formik?.values?.end || null)) || null}
              // onChange={(date) => handleChange(eachSearch.name, new Date(date).toLocaleDateString())}
              onChange={(date) => formik.setFieldValue('end', new Date(date))}
            />
          </div>
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

// export {RemarksModalForm}
export default RemarksModalForm
