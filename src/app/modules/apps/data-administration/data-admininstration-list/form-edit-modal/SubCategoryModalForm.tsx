import {FC, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {allCategory, isNotEmpty, toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {initialUser, User} from '../core/_models'
import clsx from 'clsx'
import {useListView} from '../core/ListViewProvider'
import {UsersListLoading} from '../components/loading/UsersListLoading'
import {createUser, updateUser} from '../core/_requests'
import {useQueryResponse} from '../core/QueryResponseProvider'
import axios from 'axios'
import {errorToast, successToast} from '../../../../../../_metronic/helpers/components/Toaster'

type Props = {
  isUserLoading: boolean
  user?: User | any
  arrayDropdown?: any
}

const editUserSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Name is required'),
  displayName: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Display Name is required'),
  categoryId: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Name is required'),
})

const FinishedGoodModalForm: FC<Props> = ({user = {}, isUserLoading, arrayDropdown = []}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()

  const [userForEdit] = useState<any>({
    ...user,
    name: user.name || '',
    displayName: user.name || '',
    categoryId: user.categoryId || '',
    icon: user.icon || '',
    imageIcon: user.icon || '',
    displayOnDashboard: user.displayOnDashboard === true ? 'YES' : 'NO',
  })

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const blankImg = toAbsoluteUrl('/media/svg/avatars/blank.svg')

  const formik: any = useFormik({
    initialValues: userForEdit,
    validationSchema: editUserSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        const payload = {
          ...values,
          displayOnDashboard: values.displayOnDashboard === 'YES',
        }
        console.log({payload})
        if (isNotEmpty(values.id)) {
          await updateUser(payload, `items/${payload.id}/update`)
          successToast('Modified')
        } else {
          await createUser(payload, 'item')
          successToast('Added')
        }
      } catch (ex) {
        errorToast('Something Went Wrong')
        console.error(ex)
      } finally {
        setSubmitting(true)
        cancel(true)
      }
    },
  })
  const makeSelectDropDown = (name = '', options: any = []) => {
    return (
      <select
        className={clsx(
          'form-control form-control-solid mb-3 mb-lg-0',
          {'is-invalid': formik.touched[name] && formik.errors[name]},
          {
            'is-valid': formik.touched[name] && !formik.errors[name],
          }
        )}
        {...formik.getFieldProps(name)}
      >
        <option value=''>Select One...</option>
        {options.map((eachOption, eachInd) => (
          <option key={eachInd + 1 + ''} value={eachOption.value || eachOption.id}>
            {eachOption.label || eachOption.name}
          </option>
        ))}
      </select>
    )
  }

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
  return (
    <>
      <form id='kt_modal_add_user_form' className='form' onSubmit={formik.handleSubmit} noValidate>
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
            <label className='required fw-bold fs-6 mb-2'>Display Name</label>
            <input
              placeholder='Enter Display Name'
              {...formik.getFieldProps('displayName')}
              type='text'
              name='displayName'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.displayName && formik.errors.displayName},
                {
                  'is-valid': formik.touched.displayName && !formik.errors.displayName,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {formik.touched.displayName && formik.errors.displayName && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.displayName}</span>
                </div>
              </div>
            )}
          </div>
          <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'>Category</label>
            {makeSelectDropDown('categoryId', arrayDropdown)}
            {formik.touched.categoryId && formik.errors.categoryId && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.categoryId}</span>
                </div>
              </div>
            )}
          </div>
          <div className='mb-7 row'>
            <label className='fw-bold fs-6 mb-2'>Display on Dashboard</label>
            <div className='d-flex col-6 gap-4'>
              <div className='form-check form-check-custom form-check-solid'>
                <input
                  className='form-check-input me-3'
                  {...formik.getFieldProps('displayOnDashboard')}
                  name='displayOnDashboard'
                  type='radio'
                  value='YES'
                  id='kt_modal_update_role_option_yes'
                  checked={formik.values.displayOnDashboard === 'YES'} // Automatically handle checked status
                  disabled={formik.isSubmitting || isUserLoading}
                />
                <label className='form-check-label' htmlFor='kt_modal_update_role_option_yes'>
                  <div className='fw-bolder text-gray-800'>YES</div>
                </label>
                <div className='separator separator-dashed my-5'></div>
              </div>

              <div className='form-check form-check-custom form-check-solid'>
                <input
                  className='form-check-input me-3'
                  {...formik.getFieldProps('displayOnDashboard')}
                  name='displayOnDashboard'
                  type='radio'
                  value='NO'
                  id='kt_modal_update_role_option_no'
                  checked={formik.values.displayOnDashboard === 'NO'} // Automatically handle checked status
                  disabled={formik.isSubmitting || isUserLoading}
                />
                <label className='form-check-label' htmlFor='kt_modal_update_role_option_no'>
                  <div className='fw-bolder text-gray-800'>NO</div>
                </label>
                <div className='separator separator-dashed my-5'></div>
              </div>
            </div>
          </div>

          <div className='fv-row mb-7'>
            {/* begin::Label */}
            <label className='d-block fw-bold fs-6 mb-5'>Logo</label>
            {/* end::Label */}

            {/* begin::Image input */}
            <div
              className='image-input image-input-outline'
              data-kt-image-input='true'
              style={{backgroundImage: `url('${blankImg}')`}}
            >
              {/* begin::Preview existing avatar */}
              <div
                className='image-input-wrapper w-125px h-125px'
                style={{backgroundImage: `url('${formik.values.imageIcon || user.icon}')`}}
              ></div>
              {/* end::Preview existing avatar */}

              {/* begin::Label */}
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
              {/* end::Label */}

              {/* begin::Cancel */}
              <span
                className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                data-kt-image-input-action='cancel'
                data-bs-toggle='tooltip'
                title='Cancel avatar'
              >
                <i className='bi bi-x fs-2'></i>
              </span>
              {/* end::Cancel */}

              {/* begin::Remove */}
              {/*  <span
                className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                data-kt-image-input-action='remove'
                data-bs-toggle='tooltip'
                title='Remove avatar'
              >
                <i className='bi bi-x fs-2'></i>
              </span> */}
              {/* end::Remove */}
            </div>
            {/* end::Image input */}

            {/* begin::Hint */}
            <div className='form-text'>Allowed file types: png, jpg, jpeg.</div>
            {/* end::Hint */}
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
        </div>
      </form>
      {(formik.isSubmitting || isUserLoading) && <UsersListLoading />}
    </>
  )
}

// export {FinishedGoodModalForm}
export default FinishedGoodModalForm
