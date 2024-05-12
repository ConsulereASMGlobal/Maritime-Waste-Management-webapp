import {useEffect, useState} from 'react'
import {useListView} from '../../core/ListViewProvider'
import {UserEditModalHeader} from '../../form-edit-modal/UserEditModalHeader'
import {KTSVG} from '../../../../../../../_metronic/helpers'
import {useQuery} from 'react-query'
import {getUserById} from '../../core/_requests'
import clsx from 'clsx'

interface ModalProps {
  formName?: string
  headerName?: string
  viewPage?: string
}

const AssignHubModal = ({close, confirm, id = ''}: any) => {
  const {isLoading, data, error} = useQuery(
    `users?type=PICKUP_AGENT`,
    () => getUserById('users?type=PICKUP_AGENT'),
    {
      cacheTime: 0,
      enabled: true,
      onError: (err) => {
        // setItemIdForUpdate(undefined)
        console.error(err)
      },
    }
  )

  const [selectUserAgent, setselectUserAgent] = useState('')

  const handleSelect = (e) => {
    setselectUserAgent(e.target.value)
  }

  const makeSelectDropDown = (name = '', options: any = [], customHandle = false) => {
    return (
      <select
        onChange={(e) => handleSelect(e)}
        className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
      >
        {customHandle ? (
          <option value=''>{id}</option>
        ) : (
          <>
            <option value=''>Select One...</option>
            {options.map((eachOption, eachInd) => (
              <option
                key={eachInd + 1 + ''}
                value={eachOption.id}
                selected={selectUserAgent === eachOption.value ? true : false}
              >
                {eachOption?.personalDetails?.name || id || ''}
              </option>
            ))}
          </>
        )}
      </select>
    )
  }

  return (
    <>
      <div
        className='modal fade show d-block'
        id='kt_modal_add_user'
        role='dialog'
        tabIndex={-1}
        aria-modal='true'
      >
        <div
          className={`modal-dialog 
           mw-650px modal-dialog-centered`}
        >
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Assign Rider</h5>
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
            <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>
              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>Select Rider</label>
                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>
                    {makeSelectDropDown('agentId', data)}
                  </span>
                </div>
              </div>
              <div className='row mb-7'>
                <label className='col-lg-4 fw-bold text-muted'>Order Id</label>
                <div className='col-lg-8'>
                  <span className='fw-bolder fs-6 text-dark'>
                    {makeSelectDropDown('assignHubSubmit', [{name: id, value: id}], true)}
                  </span>
                </div>
              </div>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                onClick={close}
                className='btn btn-light'
                data-bs-dismiss='modal'
              >
                Cancel
              </button>
              <button
                onClick={() => confirm({agentId: selectUserAgent, orderId: id})}
                type='button'
                disabled={!selectUserAgent}
                className='btn btn-primary'
              >
                Confirm
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

export {AssignHubModal}
