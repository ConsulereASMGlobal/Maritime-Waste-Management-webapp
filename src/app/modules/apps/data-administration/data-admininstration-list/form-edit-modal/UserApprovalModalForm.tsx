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
import {Link} from 'react-router-dom'
import {KTIcon} from '../../../../../../_metronic/helpers'

type Props = {
  isUserLoading: boolean
  user?: User | any
}

const UserApprovalModalForm: FC<Props> = ({user = {}, isUserLoading}) => {
  const {setItemIdForUpdate} = useListView()
  const {refetch} = useQueryResponse()

  const [userForEdit] = useState<any>({
    ...user,
    customerType: '',
    customerName: '',
    customerAddress: '',
    townCity: '',
    landMark: '',
    zipCode: '',
    country: '',
    contactPerson: '',
    contactEmail: '',
    oiCode: '',
  })

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const formik: any = useFormik({
    initialValues: userForEdit,
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
  const mapData = [
    {
      label: 'Role',
      value: 'Manager',
    },
    {
      label: 'Name',
      value: 'Kamal Hassan',
    },
    {
      label: 'Mobile Number',
      value: '123 234 4567 345',
    },
    {
      label: 'Addr. Line 1',
      value: '20,gr Flr, Rajmahal Building',
    },
    {
      label: 'Addr. Line 2',
      value: ' 37/2, M T Street, B V K Iyengar Road Cross',
    },
    {
      label: 'Townn/ City',
      value: 'Bhopal',
    },
    {
      label: 'Landmark',
      value: 'Anna Nagar Slums, Habib Ganj',
    },
    {
      label: 'Zip Code',
      value: '462023',
    },
    {
      label: 'ID',
      value: '2',
    },
    {
      label: 'OID',
      value: '345',
    },
    {
      label: 'Selfie',
      value: 'pic',
    },
    {
      label: 'Id Picture',
      value: 'pic',
    },
  ]
  return (
    <>
      <form id='' className='container form' onSubmit={formik.handleSubmit} noValidate>
        <div className=''>
          {mapData.map((eachData, eachId) => (
            <div className='row mb-7' key={eachId + 1 + ''}>
              <label className='col-lg-4 fw-bold text-muted'>{eachData.label}</label>
              <div className='col-lg-8'>
                {eachData.value === 'pic' ? (
                  <div
                    className='image-input image-input-outline'
                    data-kt-image-input='true'
                    style={{backgroundImage: `url(${toAbsoluteUrl('/media/300-23.jpg')})`}}
                  >
                    <div
                      className='image-input-wrapper w-125px h-125px'
                      style={{
                        backgroundImage: `url(${toAbsoluteUrl('/media/avatars/300-23.jpg')})`,
                      }}
                    ></div>
                  </div>
                ) : (
                  <span className='fw-bolder fs-6 text-dark'>{eachData.value}</span>
                )}

                {/* <span className='fw-bolder fs-6 text-dark'>{eachData.value}</span> */}
              </div>
            </div>
          ))}
        </div>
        <div className='text-center'>
          <button
            type='reset'
            onClick={() => cancel()}
            className='btn btn-light me-3'
            data-kt-users-modal-action='cancel'
            disabled={formik.isSubmitting || isUserLoading}
          >
            Reject
          </button>

          <button
            type='submit'
            className='btn btn-primary'
            data-kt-users-modal-action='submit'
            style={{color: '#1034A6'}}
            disabled={isUserLoading || formik.isSubmitting || !formik.isValid || !formik.touched}
          >
            <span className='indicator-label'>Accept</span>
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

export default UserApprovalModalForm
