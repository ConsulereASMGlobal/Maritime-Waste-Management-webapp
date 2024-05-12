import {useEffect} from 'react'
import {UserEditModalHeader} from './UserEditModalHeader'
import {UserEditModalFormWrapper} from './UserEditModalFormWrapper'
// import {useListView} from '../core/ListViewProvider'
import {useListView} from '../../../data-administration/data-admininstration-list/core/ListViewProvider'
import CertificateComponent from '../../../data-administration/data-admininstration-list/table/columns/CertificateComponent'
interface ModalProps {
  formName?: string
}

const UserEditModal = ({formName = ''}: ModalProps) => {
  useEffect(() => {
    document.body.classList.add('modal-open')
    return () => {
      document.body.classList.remove('modal-open')
    }
  }, [])
  const {itemIdForUpdate} = useListView()
  if (itemIdForUpdate === undefined) return null
  return (
    <>
      <div
        className='modal fade show d-block'
        id='kt_modal_add_user'
        role='dialog'
        tabIndex={-1}
        aria-modal='true'
      >
        {/* begin::Modal dialog */}
        {/* <div className='modal-dialog modal-xl modal-dialog-centered mw-650px'> */}
        <div className='modal-dialog modal-xl modal-dialog-centered'>
          {/* begin::Modal content */}
          <div className='modal-content'>
            <UserEditModalHeader />
            {/* begin::Modal body */}
            <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>
              <CertificateComponent />
              {/* <UserEditModalFormWrapper formName={formName} /> */}
            </div>
            {/* end::Modal body */}
          </div>
          {/* end::Modal content */}
        </div>
        {/* end::Modal dialog */}
      </div>
      {/* begin::Modal Backdrop */}
      <div className='modal-backdrop fade show'></div>
      {/* end::Modal Backdrop */}
    </>
  )
}

export {UserEditModal}
