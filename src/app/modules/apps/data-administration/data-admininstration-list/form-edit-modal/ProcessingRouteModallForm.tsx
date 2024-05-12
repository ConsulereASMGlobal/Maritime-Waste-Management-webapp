import {FC, useEffect, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {isNotEmpty, toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {initialUser, User} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {UsersListLoading} from '../components/loading/UsersListLoading'
import {createUser, updateUser} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'
import {successToast, errorToast} from '../../../../../../_metronic/helpers/components/Toaster'
import {useQuery} from 'react-query'
import {getUserById} from '../core/_requests'
import axios from 'axios'
import Select from 'react-select'
import React from 'react'

type Props = {
  isUserLoading: boolean
  user?: User | any
}

const editUserSchema = Yup.object().shape({
  processName: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Name is required'),
})

const ProcessingRouteModalForm: FC<Props> = ({user = {}, isUserLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()

  const [userForEdit] = useState<any>({
    ...user,
    processName: user.name || '',
    roleName: user.roleName || '',
    inMaterials: user.inMaterials || [],
    outMaterials: user.outMaterials || [],
    inCategoryId: user.inCategoryId || '',
    testArray: user.testArray || [],
    outCategoryId: user.outCategoryId || '',
    status: 'ACTIVE',
    inUnit: user.inUnit || 'KG',
  })

  const [rawMaterialList, setRawMaterialList] = useState<any>([])
  const [finishedGoodsList, setFinishedGoodsList] = useState<any>([])
  const [categoryList, setCategoryList] = useState([])
  const [isEnabled, setIsEnabled] = useState(false)
  const [fetchInputCategory, setfetchInputCategory] = useState(false)
  const [selectedInCategoryDropdown, setselectedInCategoryDropdown] = useState(
    user?.inCategoryId?.map((x) => ({...x, label: x.name})) || []
  )
  const [selectedOutCategoryDropdown, setselectedOutCategoryDropdown] = useState(
    user?.outCategoryId?.map((x) => ({...x, label: x.name})) || []
  )

  const commonfetchCategory = async (mapArray, setFunction) => {
    try {
      const promises = mapArray.map((item) => getUserById(null, `categories/${item.id}/items`))
      const results = await Promise.all(promises)
      const flattenedResults = results.flat()
      console.log({flattenedResults})
      if (flattenedResults?.length) {
        setFunction(
          flattenedResults.map((x) => ({
            name: x.name,
            categoryId: x.categoryId,
            value: x.id,
            id: x.id,
          }))
        )
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    if (user?.inCategoryId?.length) {
      commonfetchCategory(user.inCategoryId, setRawMaterialList)
    }
    if (user?.outCategoryId?.length) {
      commonfetchCategory(user.outCategoryId, setFinishedGoodsList)
    }
  }, [user])

  const formik: any = useFormik({
    initialValues: userForEdit,
    validationSchema: editUserSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        let res: any
        const payload: any = {
          id: values.id,
          inUnit: values.inUnit,
          status: 'ACTIVE',
          name: values.processName,
          inMaterials: values.inMaterials,
          outMaterials: values.outMaterials,
          icon: values.imageIcon || values.icon,
          inCategoryName: '',
          outCategoryName: '',
          inCategoryId: selectedInCategoryDropdown,
          outCategoryId: selectedOutCategoryDropdown,
        }
        if (isNotEmpty(values.id)) {
          res = await updateUser(payload, `materialProcess/${values.id}/update`)
        } else {
          res = await createUser(payload, 'materialProcess')
          // console.log({payload, values, isEnabled, fetchInputCategory})
        }
        successToast(res?.msg || 'success')
        cancel(true)
      } catch (ex) {
        errorToast('something went wrong')
        console.error(ex)
      } finally {
        setSubmitting(true)
        // cancel(true)
      }
    },
  })

  const {data: categoryListResp} = useQuery(
    'clients/101212/categories',
    () => getUserById(null, 'clients/101212/categories'),
    {
      cacheTime: 0,
      onError: (err) => {
        setItemIdForUpdate(undefined)
        console.error(err)
      },
      enabled: true, // Set this to true to run the query once
    }
  )
  useEffect(() => {
    if (categoryListResp?.length) {
      const tempAllCategories = categoryListResp?.map((eachRes) => {
        return {
          name: eachRes.name,
          value: eachRes.id,
          id: eachRes.id,
          label: eachRes.name,
        }
      })
      setCategoryList(tempAllCategories)
    }
  }, [categoryListResp])

  const {data: outMaterialsList} = useQuery(
    `categories/${formik?.values?.outCategoryId}/items`,
    () => getUserById(null, `categories/${formik?.values?.outCategoryId}/items`),
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
    if (outMaterialsList?.length) {
      let finalTempData: any = []
      setIsEnabled(false)
      const tempAllCategories = outMaterialsList?.map((eachRes) => {
        return {
          name: eachRes.name,
          categoryId: eachRes.categoryId,
          value: eachRes.id,
          id: eachRes.id,
        }
      })
      finalTempData = [...finishedGoodsList, ...tempAllCategories]
      setFinishedGoodsList(finalTempData)
    }
  }, [outMaterialsList])

  const {data: inMaterialResponse} = useQuery(
    `categories/${formik?.values?.inCategoryId}/items`,
    () => getUserById(null, `categories/${formik?.values?.inCategoryId}/items`),
    {
      cacheTime: 0,
      onError: (err) => {
        setItemIdForUpdate(undefined)
        console.error(err)
      },
      enabled: fetchInputCategory, // Set this to true to run the query once
    }
  )
  useEffect(() => {
    if (inMaterialResponse) {
      let combinedList: any = []
      setfetchInputCategory(false)
      // console.log({inMaterialResponse})
      const tempAllCategories = inMaterialResponse.map((eachRes) => {
        return {
          name: eachRes.name,
          categoryId: eachRes.categoryId,
          value: eachRes.id,
          id: eachRes.id,
        }
      })
      combinedList = [...rawMaterialList, ...tempAllCategories]
      setRawMaterialList(combinedList)
    }
  }, [inMaterialResponse])

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
      formik.setFieldValue('imageIcon', response.data.data.name)
    }
  }

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const blankImg = toAbsoluteUrl('/media/svg/avatars/blank.svg')

  const checkIsClicked = (id, mapValue) => {
    if (formik?.values[mapValue]?.length === 0) return false
    const filterData = formik.values[mapValue]?.filter((x) => (x.id || x.value) === id)
    if (filterData.length) return true
    return false
  }

  const setUserClicked = (value, mapValue) => {
    const arrayList = formik.values[mapValue]
    let tempListArray: any = []
    if (checkIsClicked(value.value, mapValue)) {
      const filterSelected = arrayList.filter((x) => (x.value || x.id) !== value.value)
      tempListArray = filterSelected
    } else {
      tempListArray = [...arrayList, {...value}]
    }
    formik.setFieldValue([mapValue], tempListArray)
  }

  const handleSelect = (e, options, name, action) => {
    if (name === 'inCategoryId') {
      setselectedInCategoryDropdown(e)
    } else {
      setselectedOutCategoryDropdown(e)
    }
    if (action.removedValue?.length) {
      formik.setFieldValue(name === 'inCategoryId' ? 'inMaterials' : 'outMaterials', [])
      setRawMaterialList([])
    } else if (action?.removedValue) {
      const newFilteredData: any = (
        name === 'inCategoryId' ? rawMaterialList : finishedGoodsList
      ).filter((x) => x.categoryId !== action.removedValue.id)
      const filterInOutCategory = formik.values[
        name === 'inCategoryId' ? 'inMaterials' : 'outMaterials'
      ].filter((x) => x.categoryId !== action.removedValue.id)
      formik.setFieldValue('inMaterials', filterInOutCategory)
      name === 'inCategoryId'
        ? setRawMaterialList(newFilteredData)
        : setFinishedGoodsList(newFilteredData)
    } else {
      const value = e[e.length - 1]?.value || ''
      const filter = options.filter((x) => x.value === value)
      if (name === 'inCategoryId' && filter.length) {
        setfetchInputCategory(true)
        formik.setFieldValue('inCategoryName', filter[0].name)
        // formik.setFieldValue('inMaterials', [])
      } else {
        if (filter.length) {
          setIsEnabled(true)
          formik.setFieldValue('outCategoryName', filter[0].name)
          // formik.setFieldValue('outMaterials', [])
        }
      }
      formik.setFieldValue([name], value)
    }
  }

  const makeSelectDropDown = (name = '', options: any = [], value) => {
    return (
      <>
        <Select
          isMulti
          name={name}
          options={options}
          className='basic-multi-select'
          classNamePrefix='select'
          // value={selectedInCategoryDropdown}
          value={value}
          onChange={(selected, action) => handleSelect(selected, options, name, action)}
        />
      </>
    )
  }

  const checkBoxList = [
    {label: 'KG', value: 'KG'},
    {label: 'Bags', value: 'BAG'},
  ]
  return (
    <>
      <form id='kt_modal_add_user_form' className='form' onSubmit={formik.handleSubmit} noValidate>
        <div className='fv-row mb-7'>
          <label className='required fw-bold fs-6 mb-2'>Process Name</label>
          <input
            placeholder='Enter Process Name'
            {...formik.getFieldProps('processName')}
            type='text'
            name='processName'
            className={clsx(
              'form-control form-control-solid mb-3 mb-lg-0',
              {'is-invalid': formik.touched.processName && formik.errors.processName},
              {
                'is-valid': formik.touched.processName && !formik.errors.processName,
              }
            )}
            autoComplete='off'
            disabled={formik.isSubmitting || isUserLoading}
          />
          {formik.touched.processName && formik.errors.processName && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.processName}</span>
              </div>
            </div>
          )}
        </div>
        <div
          className='d-flex flex-column scroll-y me-n7 pe-7'
          id='kt_modal_add_user_scroll'
          data-kt-scroll='true'
          data-kt-scroll-activate='{default: false, lg: true}'
          data-kt-scroll-max-height='auto'
          data-kt-scroll-dependencies='#kt_modal_add_user_header'
          data-kt-scroll-wrappers='#kt_modal_add_user_scroll'
          data-kt-scroll-offset='300px'
        >
          <div className='container text-center'></div>
          <div className='mb-7 row'>
            <label className=' fw-bold fs-6 mb-2'>Unit</label>
            {checkBoxList.map((eachCheckBoxList, idx) => (
              <div key={idx + 1 + ''} className='d-flex col-6'>
                <div className='form-check form-check-custom form-check-solid'>
                  <input
                    className='form-check-input me-3'
                    name={eachCheckBoxList.value}
                    type='checkbox'
                    value={eachCheckBoxList.value}
                    id={'kt_modal_update_role_option_0' + idx + 1}
                    checked={formik.values['inUnit'] === eachCheckBoxList.value ? true : false}
                    disabled={formik.isSubmitting || isUserLoading}
                    onClick={(e: any) => {
                      formik.setFieldValue('inUnit', e.target.name)
                    }}
                  />
                  <label className='form-check-label' htmlFor='kt_modal_update_role_option_0'>
                    <div className='fw-bolder text-gray-800'>{eachCheckBoxList.label}</div>
                  </label>
                  <div className='separator separator-dashed my-5'></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='d-flex flex-column me-n7 pe-7'>
          <div className='container text-center'></div>
          <div className='mb-7 row'>
            <label className='fw-bold fs-6 mb-2'>Select Input Categories</label>
            {makeSelectDropDown('inCategoryId', categoryList, selectedInCategoryDropdown)}
            {formik.touched.inCategoryId && formik.errors.inCategoryId && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.inCategoryId}</span>
                </div>
              </div>
            )}

            {rawMaterialList.map((eachCheckBoxList, idx) => (
              <div key={idx + 1 + ''} className='d-flex col-6'>
                <div className='form-check form-check-custom form-check-solid'>
                  {/* outMaterials */}
                  <input
                    className='form-check-input me-3'
                    // {...formik.getFieldProps('inputCategories')}
                    name={eachCheckBoxList.value}
                    type='checkbox'
                    value={eachCheckBoxList.value}
                    onClick={() => {
                      setUserClicked(eachCheckBoxList, 'inMaterials')
                    }}
                    id={'kt_modal_update_role_option_0' + idx + 1}
                    checked={checkIsClicked(eachCheckBoxList.value, 'inMaterials')}
                    disabled={formik.isSubmitting || isUserLoading}
                  />
                  <label className='form-check-label' htmlFor='kt_modal_update_role_option_0'>
                    <div className='fw-bolder text-gray-800'>{eachCheckBoxList.name}</div>
                  </label>
                  <div className='separator separator-dashed my-5'></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='d-flex flex-column me-n7 pe-7'>
          <div className='container text-center'></div>
          <div className='mb-7 row'>
            <label className='fw-bold fs-6 mb-2'>Select Output Categories</label>
            {makeSelectDropDown('outCategoryId', categoryList, selectedOutCategoryDropdown)}
            {formik.touched.outCategoryId && formik.errors.outCategoryId && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.outCategoryId}</span>
                </div>
              </div>
            )}
            {finishedGoodsList.map((eachCheckBoxList, idx) => (
              <div key={idx + 1 + ''} className='d-flex col-6'>
                <div className='form-check form-check-custom form-check-solid'>
                  <input
                    className='form-check-input me-3'
                    // {...formik.getFieldProps('outputCategories')}
                    name={eachCheckBoxList.value}
                    type='checkbox'
                    value={eachCheckBoxList.value}
                    onClick={() => {
                      setUserClicked(eachCheckBoxList, 'outMaterials')
                    }}
                    id={'kt_modal_update_role_option_0' + idx + 1}
                    checked={checkIsClicked(eachCheckBoxList.value, 'outMaterials')}
                    disabled={formik.isSubmitting || isUserLoading}
                  />
                  <label className='form-check-label' htmlFor='kt_modal_update_role_option_0'>
                    <div className='fw-bolder text-gray-800'>{eachCheckBoxList.name}</div>
                  </label>
                  <div className='separator separator-dashed my-5'></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='fv-row mb-7'>
          <label className='d-block fw-bold fs-6 mb-5'>Logo</label>
          <div
            className='image-input image-input-outline'
            data-kt-image-input='true'
            style={{backgroundImage: `url('${blankImg}')`}}
          >
            <div
              className='image-input-wrapper w-125px h-125px'
              style={{backgroundImage: `url('${formik.values.imageIcon || user.icon}')`}}
            ></div>
            <label
              className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
              data-kt-image-input-action='change'
              data-bs-toggle='tooltip'
              title='Change avatar'
            >
              <i className='bi bi-pencil-fill fs-7'></i>
              <input
                type='file'
                name='avatar'
                accept='.png, .jpg, .jpeg'
                onChange={handleFileChange}
              />
              <input type='hidden' name='avatar_remove' />
            </label>
            <span
              className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
              data-kt-image-input-action='cancel'
              data-bs-toggle='tooltip'
              title='Cancel avatar'
            >
              <i className='bi bi-x fs-2'></i>
            </span>
          </div>
          <div className='form-text'>Allowed file types: png, jpg, jpeg.</div>
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

// export {ProcessingRouteModalForm}
export default ProcessingRouteModalForm
