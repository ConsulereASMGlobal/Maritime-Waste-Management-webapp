/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect, useState, useRef} from 'react'
import {useMutation, useQueryClient} from 'react-query'
import {MenuComponent} from '../../../../../../../_metronic/assets/ts/components'
import {ID, KTIcon, QUERIES} from '../../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {deleteUser, updateUser, createUser} from '../../core/_requests'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import {AssignHubModal} from './AssignPickUPBoy'
import GenerateQrCode from './GenerateQrCode'
import {useLocation} from 'react-router-dom'

type Props = {
  id: any
  allData: any
  action: any
}

const UserActionsCell: FC<Props> = ({id, allData, action = ['edit']}) => {
  const contentRef = useRef(null)
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const {query} = useQueryResponse()
  const queryClient = useQueryClient()
  const {state} = useQueryRequest()
  const [showPickUpModal, setShowAssignHubModal] = useState(false)

  const {pathname} = useLocation()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const openEditModal = (showView = false) => {
    setItemIdForUpdate(id)
    // setItemIdForUpdate({...id, showView})
  }
  const assignPostMethod = useMutation(
    (payload: any) => createUser(payload, `smart-centre/order/assign-agent`),
    {
      // 💡 response of the mutation is passed to onSuccess
      onSuccess: () => {
        // ✅ update detail view directly
        queryClient.invalidateQueries([`return123/orders-${query}`])
        setShowAssignHubModal(false)
      },
    }
  )
  const deleteItem = useMutation(
    () =>
      updateUser(
        id,
        `categories/${id.id}/update
  `
      ),
    {
      // 💡 response of the mutation is passed to onSuccess
      onSuccess: () => {
        // ✅ update detail view directly
        queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])
      },
    }
  )

  const showAssignHubModal = () => {
    setShowAssignHubModal(true)
  }

  const toggleStatus = useMutation(
    () =>
      updateUser(
        {},
        `user/${id.id}/status?type=${state.type || 'deals'}&status=${
          id.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
        }`
      ),
    {
      // 💡 response of the mutation is passed to onSuccess
      onSuccess: () => {
        // ✅ update detail view directly
        queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])
      },
    }
  )
  const [showQrCode, setShowQrCode] = useState(false)

  return (
    <>
      {(action.includes('view_certificate') && (
        <a
          onClick={() => openEditModal()}
          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
        >
          <KTIcon iconName='eye' className='fs-3' />
        </a>
      )) ||
        false}
      {showPickUpModal && (
        <AssignHubModal
          id={id}
          confirm={async (payload) => await assignPostMethod.mutateAsync(payload)}
          close={() => setShowAssignHubModal(false)}
        />
      )}
      {showQrCode && <GenerateQrCode data={id} close={() => setShowQrCode(false)} />}
      <div className='align-items-center'>
        {(action.includes('view') && (
          <a
            // onClick={openEditModal}
            onClick={() => openEditModal(true)}
            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
          >
            <KTIcon iconName='eye' className='fs-3' />
          </a>
        )) ||
          false}

        {/* {(action.includes('download') && (
          <>
            <a
              onClick={() => handleDownload()}
              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
            >
              <KTIcon iconName='file-down' className='fs-3' />
            </a>
          </>
        )) ||
          false} */}

        {(action.includes('edit') && (
          <a
            // onClick={openEditModal}
            onClick={() => openEditModal()}
            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
          >
            <KTIcon iconName='pencil' className='fs-3' />
          </a>
        )) ||
          false}
        {action.includes('assign') && (
          <>
            {id.status && id.status === 'Pickup Assigned' ? (
              '-----'
            ) : (
              <a
                onClick={async () =>
                  allData.status &&
                  ['completed', 'pickup completed'].includes(allData.status.toLowerCase())
                    ? ''
                    : showAssignHubModal()
                }
                style={{
                  cursor:
                    allData.status &&
                    ['completed', 'pickup completed'].includes(allData.status.toLowerCase()) &&
                    'not-allowed',
                }}
              >
                Assign Rider
              </a>
            )}
          </>
        )}
        {action.includes('delete') && action.includes('edit') && (
          <a
            onClick={async () => await deleteItem.mutateAsync()}
            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
          >
            <KTIcon iconName='trash' className='fs-3' />
          </a>
        )}
        {(action.includes('toggle') && (
          <div className='btn btn-icon btn-active-color-secondary'>
            <div className='form-switch'>
              <input
                className='form-check-input'
                type='checkbox'
                id='allowmarketing'
                defaultChecked={id.status === 'ACTIVE' ? true : false}
                onChange={async () => {
                  await toggleStatus.mutateAsync()
                }}
              />
            </div>
          </div>
        )) ||
          false}
        {(action.includes('qr') &&
          (id.status === 'Accepted' ||
            pathname.includes('collect-orders') ||
            pathname.includes('collection-point')) && (
            <a
              onClick={() => setShowQrCode(true)}
              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
            >
              <KTIcon iconName='code' className='fs-3' />
            </a>
          )) ||
          false}
      </div>
      {/* <div
        className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4'
        data-kt-menu='true'
      >
        <div className='menu-item px-3'>
          <a className='menu-link px-3' onClick={openEditModal}>
            Edit
          </a>
        </div>

        <div className='menu-item px-3'>
          <a
            className='menu-link px-3'
            data-kt-users-table-filter='delete_row'
            onClick={async () => await deleteItem.mutateAsync()}
          >
            Delete
          </a>
        </div>
      </div> */}
    </>
  )
}

export {UserActionsCell}
