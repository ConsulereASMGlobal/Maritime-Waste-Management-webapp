import {useEffect} from 'react'
import {useListView} from '../../core/ListViewProvider'
import {UserEditModalHeader} from '../../form-edit-modal/UserEditModalHeader'
import {KTSVG} from '../../../../../../../_metronic/helpers'
import {useLocation} from 'react-router-dom'

interface ModalProps {
  formName?: string
  headerName?: string
  viewPage?: string
}

const ViewImageModal = ({close, images, name}: any) => {
  const configName = {
    PRE_STAGE: 'Before',
    IN_PROGRESS_STAGE: 'In Progress',
    POST_STAGE: 'After',
    LOADING: 'Loading',
    SLIP: 'Slip',
  }
  const filterImage = images.filter((x) => x.imageType === name) || []

  const {pathname} = useLocation()
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
        {/* <div className='modal-dialog modal-dialog-centered mw-650px'> */}
        <div
          className={`modal-dialog 
           mw-850px modal-dialog-centered`}
        >
          {/* begin::Modal content */}
          <div className='modal-content'>
            {/* <UserEditModalHeader headerName={'Confirmation'} /> */}
            <div className='modal-header'>
              <h5 className='modal-title'>
                {pathname === '/apps/collect-orders' ? 'Chain of Custody' : configName[name]}
              </h5>
              <div
                className='btn btn-icon btn-sm btn-active-light-primary ms-2'
                data-bs-dismiss='modal'
                aria-label='Close'
                onClick={close}
              >
                <KTSVG
                  path='/media/icons/duotune/arrows/arr061.svg'
                  className='svg-icon svg-icon-2x'
                />
              </div>
            </div>
            {/* begin::Modal body */}
            <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  flexWrap: 'wrap',
                  flexDirection: 'row',
                  gap: 8,
                }}
              >
                {(filterImage?.length ? filterImage : images)?.map((eachImage, eachind) => (
                  <img
                    height={200}
                    width={200}
                    src={eachImage.url || eachImage.docUrl || eachImage}
                    key={eachind + 1 + ''}
                    alt=''
                  />
                ))}
              </div>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                onClick={close}
                className='btn btn-light'
                data-bs-dismiss='modal'
              >
                Close
              </button>
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

export {ViewImageModal}
