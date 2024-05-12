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
  const isPersmissionActive: any = (name: string) => {
    return user?.permissions?.includes(name) || false
  }

  const [userForEdit] = useState<any>({
    ...user,
    processName: user.name || '',
    roleName: user.roleName || '',
    inMaterials: user.inMaterials || [],
    outMaterials: user.outMaterials || [],
    status: 'ACTIVE',
  })

  const [isEnabled, setIsEnabled] = useState(true)
  const [rawMaterialList, setRawMaterialList] = useState<any>([])
  const [finishedGoodsList, setFinishedGoodsList] = useState<any>([])

  const {data: finishedGoodsListRes} = useQuery(
    'clients/101212/categories',
    () => getUserById(null, 'clients/101212/categories'),
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
    if (finishedGoodsListRes?.length) {
      setIsEnabled(false)
      const tempAllCategories = finishedGoodsListRes?.map((eachRes) => {
        return {
          name: eachRes.name,
          value: eachRes.id,
          id: eachRes.id,
        }
      })

      setFinishedGoodsList(tempAllCategories)
    }
  }, [finishedGoodsListRes])

  const {data: rawMaterialListResp} = useQuery(
    'clients/101212/categories',
    () => getUserById(null, 'clients/101212/categories'),
    {
      cacheTime: 0,
      onError: (err) => {
        setItemIdForUpdate(undefined)
        console.error(err)
      },
      enabled: isEnabled, // Set this to true to run the query once
    }
  )
  const formik: any = useFormik({
    initialValues: userForEdit,
    validationSchema: editUserSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        let res: any
        const payload: any = {
          id: values.id,
          status: 'ACTIVE',
          name: values.processName,
          inMaterials: values.inMaterials,
          outMaterials: values.outMaterials,
          icon: values.imageIcon || values.icon,
          permissions: getPermissionArrays(values),
        }
        if (isNotEmpty(values.id)) {
          res = await updateUser(payload, `materialProcess/${values.id}/update`)
        } else {
          res = await createUser(payload, 'materialProcess')
          console.log({payload})
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
  // console.log({formik: formik.values})
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

  useEffect(() => {
    if (rawMaterialListResp?.length) {
      setIsEnabled(false)
      const tempAllCategories = rawMaterialListResp.map((eachRes) => {
        return {
          name: eachRes.name,
          value: eachRes.id,
          id: eachRes.id,
        }
      })

      setRawMaterialList(tempAllCategories)
    }
  }, [rawMaterialListResp])

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const getPermissionArrays = (obj, excludeKeys = ['id', 'status', 'roleName']) => {
    return Object.keys(obj).filter((key) => obj[key] === true && !excludeKeys.includes(key))
  }

  const blankImg = toAbsoluteUrl('/media/svg/avatars/blank.svg')

  const commonCheckBoxList = [
    {name: 'Mixed', value: 'MIXED', id: 'MIXED'},
    {name: 'Sorted', value: 'SORTED', id: 'SORTED'},
    {name: 'Baled', value: 'BALED', id: 'BALED'},
    {name: 'Shredded', value: 'SHREDDED', id: 'SHREDDED'},
  ]

  const commonCheckBoxList_one = [
    {name: 'Mixed', value: 'MIXED_1', id: 'MIXED_1'},
    {name: 'Sorted', value: 'SORTED_2', id: 'SORTED_2'},
    {name: 'Baled', value: 'BALED_3', id: 'BALED_3'},
    {name: 'Shredded', value: 'SHREDDED_4', id: 'SHREDDED_4'},
  ]

  const checkIsClicked = (id, mapValue) => {
    if (formik.values[mapValue]?.length === 0) return false
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
  console.log(user, 'FROM THE USER')
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
        <div className='d-flex flex-column scroll-y me-n7 pe-7'>
          <div className='container text-center'></div>
          <div className='mb-7 row'>
            <label className='fw-bold fs-6 mb-2'>Select Input Categories</label>
            {rawMaterialList.map((eachCheckBoxList, idx) => (
              <div key={idx + 1 + ''} className='d-flex col-6'>
                <div className='form-check form-check-custom form-check-solid'>
                  {/* outMaterials */}
                  <input
                    className='form-check-input me-3'
                    // {...formik.getFieldProps('inputCategories')}
                    name={eachCheckBoxList?.value}
                    type='checkbox'
                    value={eachCheckBoxList.value}
                    onClick={() => {
                      setUserClicked(eachCheckBoxList, 'inMaterials')
                    }}
                    id={'kt_modal_update_role_option_0' + idx + 1}
                    checked={checkIsClicked(eachCheckBoxList?.value, 'inMaterials')}
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
        <div className='d-flex flex-column scroll-y me-n7 pe-7'>
          <div className='container text-center'></div>
          <div className='mb-7 row'>
            <label className='fw-bold fs-6 mb-2'>Select Output Categories</label>
            {finishedGoodsList.map((eachCheckBoxList, idx) => (
              <div key={idx + 1 + ''} className='d-flex col-6'>
                <div className='form-check form-check-custom form-check-solid'>
                  <input
                    className='form-check-input me-3'
                    // {...formik.getFieldProps('outputCategories')}
                    name={eachCheckBoxList?.value}
                    type='checkbox'
                    value={eachCheckBoxList?.value}
                    onClick={() => {
                      setUserClicked(eachCheckBoxList, 'outMaterials')
                    }}
                    id={'kt_modal_update_role_option_0' + idx + 1}
                    checked={checkIsClicked(eachCheckBoxList?.value, 'outMaterials')}
                    disabled={formik.isSubmitting || isUserLoading}
                  />
                  <label className='form-check-label' htmlFor='kt_modal_update_role_option_0'>
                    <div className='fw-bolder text-gray-800'>{eachCheckBoxList?.name}</div>
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
