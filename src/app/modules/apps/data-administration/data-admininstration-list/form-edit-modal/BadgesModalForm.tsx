import {FC, useEffect, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {isNotEmpty} from '../../../../../../_metronic/helpers'
import {User} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {UsersListLoading} from '../components/loading/UsersListLoading'
import {createUser, getUserById, updateUser} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'
import {useQuery} from 'react-query'
// import Select from 'react-select'
import Select from 'react-select'
import {useFetchCommon} from '../../../../../../_metronic/helpers/crud-helper/useQuery'
import {useAuth} from '../../../../auth'
import {errorToast, successToast} from '../../../../../../_metronic/helpers/components/Toaster'
import UploadImage from '../../../../../../_metronic/helpers/components/ImageUpload'

type Props = {
  isUserLoading: boolean
  user?: User | any
}

const editUserSchema = Yup.object().shape({
  // name: Yup.string()
  //   .min(3, 'Minimum 3 symbols')
  //   .max(50, 'Maximum 50 symbols')
  //   .required('Name is required'),
  // address: Yup.string()
  //   .min(3, 'Minimum 3 symbols')
  //   .max(50, 'Maximum 50 symbols')
  //   .required('Address is required'),
  // mobileNumber: Yup.string()
  //   .min(3, 'Minimum 3 symbols')
  //   .max(15, 'Maximum 50 symbols')
  //   .required('Mobile Number is required'),
})

const UnitMeasurementModalForm: FC<Props> = ({user = {}, isUserLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()
  console.log({user})

  const [userForEdit] = useState<any>({
    ...user,
  })

  const [userList, setUserList] = useState([])
  const [finishedGoodsList, setFinishedGoodsList] = useState<any>([])
  const [selectedInCategoryDropdown, setselectedInCategoryDropdown] = useState<any>()

  useEffect(() => {
    if (user?.facilityType) {
      const changeData = user.facilityType.map((x) => ({label: x?.name || x}))
      console.log('first', changeData)
      setselectedInCategoryDropdown(changeData)
    }
  }, [user])

  const [rawMaterialList, setRawMaterialList] = useState<any>([])

  const {responseData: diversionDetails, isFetching} = useFetchCommon({
    api: 'users?type=PICKUP_POINT',
    isDropDown: false,
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
          userType: 'PICKUP_POINT',
          customerType: 'CORPORATE',
          badgeName: values.badgeName,
          requirement: values.requirement,
          points: values.points,
          // depositCount: selectedInCategoryDropdown.length,
          depositCount: values.points,
          images: [
            {
              id: 'img1',
              url: values.proofEstablishment,
            },
            {
              id: 'img2',
              url: values.proofOfIdentity,
            },
          ],
          pickupPoints: selectedInCategoryDropdown.map((x) => ({
            id: x.value,
            pickupPointName: x.label,
          })),
        }

        if (isNotEmpty(values.id)) {
          await updateUser(payload, `users/${values.id}/update`)
          successToast('Modified')
          cancel(true)
        } else {
          await createUser(payload, 'badge')
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
  const inputForm = ({label, name, placeholder, required = true}) => {
    return (
      <div className='fv-row mb-7'>
        <label className={`${required ? 'required' : ''} fw-bold fs-6 mb-2`}>{label}</label>
        <input
          placeholder={placeholder}
          {...formik.getFieldProps(name)}
          type='text'
          name={name}
          className={clsx(
            'form-control form-control-solid mb-3 mb-lg-0',
            {'is-invalid': formik.touched[name] && formik.errors[name]},
            {
              'is-valid': formik.touched[name] && !formik.errors[name],
            }
          )}
          autoComplete='off'
          disabled={formik.isSubmitting || isUserLoading}
        />
        {formik.touched[name] && formik.errors[name] && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors[name]}</span>
            </div>
          </div>
        )}
      </div>
    )
  }

  const handleSelect = (e, options, name, action) => {
    if (name === 'inCategoryId') {
      setselectedInCategoryDropdown(e)
    }
    if (action.removedValue?.length) {
      formik.setFieldValue(name === 'inCategoryId' ? 'inMaterials' : 'outMaterials', [])
      setRawMaterialList([])
    } else if (action?.removedValue) {
      const newFilteredData: any = (
        name === 'inCategoryId' ? rawMaterialList : finishedGoodsList
      )?.filter((x) => x.categoryId !== action.removedValue.id)
      const filterInOutCategory = formik.values[
        name === 'inCategoryId' ? 'inMaterials' : 'outMaterials'
      ]?.filter((x) => x.categoryId !== action.removedValue.id)
      formik.setFieldValue('inMaterials', filterInOutCategory)
      name === 'inCategoryId'
        ? setRawMaterialList(newFilteredData)
        : setFinishedGoodsList(newFilteredData)
    } else {
      const value = e[e.length - 1]?.value || ''
      const filter = options?.filter((x) => x.value === value)
      if (name === 'inCategoryId' && filter.length) {
        formik.setFieldValue('inCategoryName', filter[0]?.name || '')
        // formik.setFieldValue('inMaterials', [])
      } else {
        if (filter.length) {
          formik.setFieldValue('outCategoryName', filter[0]?.name || '')
          // formik.setFieldValue('outMaterials', [])
        }
      }
      formik.setFieldValue([name], value)
    }
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
          onChange={(selected, action) => handleSelect(selected, options, name, action)}
        />
      </>
    )
  }

  const dropdownFacility =
    diversionDetails?.map((x) => {
      return {
        label: x?.personalDetails?.name,
        value: x.id,
      }
    }) || []

  return (
    <>
      <form id='kt_modal_add_user_form' className='form' onSubmit={formik.handleSubmit} noValidate>
        <div className='grid'>
          {inputForm({label: 'Badge Name', name: 'badgeName', placeholder: 'Enter Badge Name'})}
          {inputForm({
            label: 'Badge Description',
            name: 'requirement',
            placeholder: 'Enter Badge Description',
          })}
          {inputForm({
            label: 'Enter the quantity of waste disposed',
            name: 'requirement',
            placeholder: 'Enter quntity in kgs',
          })}
        </div>
        <div className='grid grid-cols-3 gap-2'>
          <UploadImage name='proofEstablishment' formik={formik} label='Badge Icon' />
          <UploadImage name='proofOfIdentity' formik={formik} label='Display Icon' />
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
            style={{backgroundColor: '#333333'}}
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
      {(formik.isSubmitting || isUserLoading || isFetching) && <UsersListLoading />}
    </>
  )
}

export default UnitMeasurementModalForm
