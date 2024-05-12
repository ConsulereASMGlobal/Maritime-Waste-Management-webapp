/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {
  generateAddress,
  configCategoryMap,
  toAbsoluteUrl,
} from '../../../../../../../_metronic/helpers'
import {User} from '../../core/_models'

type Props = {
  user: any
  showImage?: boolean
  mapData?: string
  showImageOnly?: boolean
}

const UserInfoCell: FC<Props> = ({
  user,
  showImageOnly = false,
  showImage = false,
  mapData = '',
}) => {
  const accessNestedProperty = (obj, path) => {
    return path.split('[').reduce((acc, key) => {
      return acc && acc[key.replace(']', '')]
    }, obj)
  }
  const configMapData = configCategoryMap
  const returnData = () => {
    if (mapData.includes('[')) return clipText(accessNestedProperty(user, mapData), 30)
    switch (mapData) {
      case 'facilityType':
        return user?.facilityType?.toUpperCase()
      case 'categoryMap':
        return <div>{configMapData[user.categoryId] || ''}</div>
      case 'format':
        return user.companyDetails.format || 'OWN'
      case 'personalDetail':
        return (
          <div>
            <div>{user.personalDetails?.mobile}</div>
            <div className='text-muted fw-semibold text-muted d-block fs-7'>
              {user.personalDetails?.email}
            </div>
          </div>
        )
      case 'contactDetail':
        return (
          <div>
            <div>{user.companyDetails?.mobile}</div>
            <div className='text-muted fw-semibold text-muted d-block fs-7'>
              {user.companyDetails?.email}
            </div>
          </div>
        )
      case 'icon':
        return (
          <div className='symbol symbol-circle'>
            {user?.icon ? <img src={user?.icon || ''} alt={user.name} /> : ''}
          </div>
        )
      case 'categoryIcon':
        return (
          <div className='symbol symbol-circle swymbol-50px overflow-hidden me-3'>
            <div className='symbol-label'>
              <img
                src={`${user?.orderDetails?.[0]?.categoryIcon || ''}`}
                alt={user.name}
                className='w-100'
              />
            </div>
          </div>
        )
      case 'categoryName':
        return user?.orderDetails?.[0]?.categoryName || user?.categoryName || ''
      case 'quantityDeposit':
        const totalQuantity =
          user?.orderDetails?.[0]?.items?.reduce((acc, curr) => {
            return acc + curr.quantity
          }, 0) || 0
        return <span className='text-primary fs-7 fw-bold'>{totalQuantity?.toFixed(2)}</span>
      case 'pickup_quantity':
      case 'pickup_quantity_item':
        return user?.orderDetails?.[0].items?.map((x: any, ind: number) => (
          <div key={ind + 1 + ''}>
            {mapData === 'pickup_quantity_item' ? x.itemName : x.quantity?.toFixed(2)}
          </div>
        ))
      case 'proofEstablishment':
      case 'proofOfIdentity':
      case 'proofOfFacility':
      case 'bussinessImage':
      case 'personalImage':
        return (
          <div className='symbol symbol-circle swymbol-50px overflow-hidden me-3'>
            <div className='symbol-label'>
              <img
                src={`${user?.documents?.[mapData === 'bussinessImage' ? 0 : 1] || ''}`}
                alt={user.name}
                className='w-100'
              />
            </div>
          </div>
        )
      case 'pickup_address':
        return clipText(generateAddress(user.pickupInfo?.address))
      case 'address':
        // return generateAddress(user.address || user.pickupInfo?.address)

        const addressConcat = generateAddress(
          user.address || user.pickupInfo?.address || user.dropOffPointInfo?.address
        )
        return (
          <div data-bs-toggle='tooltip' title={addressConcat}>
            {clipText(addressConcat, 30)}
          </div>
        )
      case 'manager':
        return user.companyDetails.name
      case 'geoLocation':
        // return user.address.latitute + ' , ' + user.address.longitute
        return (
          <>
            <div>{user.address.latitute}</div>
            <div>{user.address.longitute}</div>
          </>
        )
      case 'pickupCompletedAt':
        return (
          (user?.pickupInfo?.pickupCompletedAt &&
            new Date(+user?.pickupInfo?.pickupCompletedAt || new Date()).toLocaleDateString()) ||
          ''
        )
      case 'pickupDate':
        return new Date(+user?.pickupInfo?.pickupDate || new Date()).toLocaleDateString()
      case 'paymentMode':
        return (
          <span
            className={`badge badge-light-${
              user?.[mapData] === 'CASH'
                ? 'info'
                : user?.[mapData] === 'WALLET'
                ? 'primary'
                : 'success'
            } fs-7 fw-bold`}
          >
            {user?.[mapData] || user?.personalDetails?.[mapData]}
          </span>
        )
      case 'street':
        return clipText(user.address.street)
      case 'createdAt':
        return new Date(+user?.createdAt || new Date()).toLocaleDateString()

      case 'productionItemDetailsQuantity':
        return user['productionItemDetails']?.map((x: any, ind: number) => (
          <div key={ind + 1 + ''}>{x.quantity}</div>
        ))
      case 'cityProvince':
        return user.address.city + ' , ' + user.address.state
      case 'inMaterials':
      case 'outMaterials':
      case 'productionItemDetails':
        return user[mapData]?.map((x: any, ind: number) => (
          <div key={ind + 1 + ''}>{x.name || x.itemName}</div>
        ))
      case 'status':
        const statusData = user?.[mapData] || user?.personalDetails?.[mapData]
        switch (statusData) {
          case 'quantityDeposit':
            return <span className='text-primary fs-7 fw-bold'>+28%</span>
          case 'Pickup Completed':
          case 'Completed':
            return <span className='badge badge-light-success fs-7 fw-bold'>{statusData}</span>
          case 'Accepted':
            return <span className='badge badge-light-danger fs-7 fw-bold'>{statusData}</span>
          case 'Pickup Assigned':
            return <span className='badge badge-light-primary fs-7 fw-bold'>{statusData}</span>

          default:
            return user?.[mapData] || user?.personalDetails?.[mapData]
        }
      default:
        return typeof user[mapData] === 'boolean' ? (
          user[mapData] ? (
            'Yes'
          ) : (
            'No'
          )
        ) : typeof user[mapData] === 'number' ? (
          user?.[mapData] === 0 ? (
            <span className='badge badge-light-danger fs-7 fw-bold'>
              {user?.[mapData]?.toFixed(2)}
            </span>
          ) : (
            user?.[mapData]?.toFixed(2) || user?.personalDetails?.[mapData]?.toFixed(2) || ''
          )
        ) : (
          clipText(user?.[mapData], 25) || clipText(user?.personalDetails?.[mapData], 25) || ''
        )
    }
  }
  return (
    <div className='align-items-center'>
      {showImageOnly && (
        <div className='symbol symbol-circle swymbol-50px overflow-hidden me-3'>
          <div className='symbol-label'>
            <img
              src={user.icon || toAbsoluteUrl(`/media/${user.avatar}`)}
              alt={user.name}
              className='w-100'
            />
          </div>
        </div>
      )}
      {showImage && (
        <div className='symbol symbol-circle swymbol-50px overflow-hidden me-3'>
          <a href='#'>
            {user.avatar ? (
              <div className='symbol-label'>
                <img
                  src={user.icon || toAbsoluteUrl(`/media/${user.avatar}`)}
                  alt={user.name}
                  className='w-100'
                />
              </div>
            ) : (
              <div
                className={clsx(
                  'symbol-label fs-3',
                  `bg-light-${user.initials?.state}`,
                  `text-${user.initials?.state}`
                )}
              >
                {user.initials?.label}
              </div>
            )}
          </a>
        </div>
      )}
      {!showImageOnly && (
        <div className='d-flex flex-column'>
          <a href='#' className='text-gray-800 text-hover-primary mb-1'>
            {returnData()}
          </a>
        </div>
      )}
    </div>
  )
}

function clipText(text, maxLength = 25, clipper = '...') {
  if (!text) return text
  return text.length > maxLength ? text.slice(0, maxLength - clipper.length) + clipper : text
}

export {UserInfoCell}
