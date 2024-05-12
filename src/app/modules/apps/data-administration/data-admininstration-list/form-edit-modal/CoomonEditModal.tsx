import {useRef, useEffect} from 'react'
import {UserEditModalHeader} from './UserEditModalHeader'
import {UserEditModalFormWrapper} from './CoomonEditModalWrapper'
import {useListView} from '../core/ListViewProvider'
import ImageLightBox from '../../../../../../_metronic/helpers/components/ImageLightBox'

interface ModalProps {
  formName?: string
  headerName?: string
  getByIdApi?: string
  showViewPage?: boolean
  arrayDropdown?: any
  modalSize?: any
}

const UserEditModal = ({
  modalSize = 'mw-650px',
  showViewPage = false,
  headerName,
  formName = '',
  getByIdApi = '',
  arrayDropdown = [],
}: ModalProps) => {
  const lightBoxRef = useRef<any>(null)

  useEffect(() => {
    document.body.classList.add('modal-open')
    return () => {
      document.body.classList.remove('modal-open')
    }
  }, [])
  const {itemIdForUpdate} = useListView()
  if (itemIdForUpdate === undefined) return null
  const hideModal: boolean = itemIdForUpdate?.hideModal || false
  return (
    <>
      <ImageLightBox ref={lightBoxRef} />
      <div
        className={`modal fade show ${!hideModal && 'd-block'}`}
        id='kt_modal_add_user'
        role='dialog'
        tabIndex={-1}
        aria-modal='true'
      >
        {/*  <div className='modal-dialog modal-dialog-centered mw-650px'> */}
        <div
          // className={`modal-dialog ${
          //   (showViewPage && 'modal-lg') || modalSize
          // } modal-dialog-centered`}
          className={`modal-dialog modal-lg modal-dialog-centered`}
        >
          <div className='modal-content'>
            <UserEditModalHeader
              // headerName={showViewPage ? 'View' : headerName || itemIdForUpdate ? 'Edit' : 'Add'}
              headerName={
                (formName === 'ProductionManagementModalForm' && 'View') ||
                (showViewPage ? 'View' : headerName || itemIdForUpdate ? 'Edit' : 'Add')
              }
            />
            <div className={`modal-body scroll-y ${!showViewPage && 'mx-5 mx-xl-15 my-7'}`}>
              <UserEditModalFormWrapper
                passRef={lightBoxRef}
                formName={formName}
                getByIdApi={getByIdApi}
                showViewPage={showViewPage}
                arrayDropdown={arrayDropdown}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <div className='modal-backdrop fade show'></div> */}
      {!hideModal && <div className='modal-backdrop fade show' />}
    </>
  )
}

export {UserEditModal}
