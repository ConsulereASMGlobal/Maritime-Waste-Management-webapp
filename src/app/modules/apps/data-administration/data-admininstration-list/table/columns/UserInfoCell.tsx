/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC, useRef, useState} from 'react'
import {
  generateAddress,
  configCategoryMap,
  toAbsoluteUrl,
} from '../../../../../../../_metronic/helpers'
import {User} from '../../core/_models'
import {ViewImageModal} from '../../../../../../../app/modules/apps/data-administration/data-admininstration-list/table/columns/ViewImageModal'
import ImageLightBox from '../../../../../../../_metronic/helpers/components/ImageLightBox'

type Props = {
  user: any
  showImage?: boolean
  mapData?: string
  showImageOnly?: boolean
  ref?: any
  itemIdForUpdate?: any
}

const UserInfoCell: FC<Props> = ({
  user,
  showImageOnly = false,
  showImage = false,
  mapData = '',
  ref,
  itemIdForUpdate,
}) => {
  const lightBoxRef = useRef<any>(null)
  const [showImageModal, setshowImageModal] = useState({
    show: false,
    clicked: '',
  })

  const accessNestedProperty = (obj, path) => {
    return path.split('[').reduce((acc, key) => {
      return acc && acc[key.replace(']', '')]
    }, obj)
  }
  const configMapData = configCategoryMap
  const handleClick = (image) => {
    console.log({image, lightBoxRef})
    lightBoxRef?.current?.open(image, itemIdForUpdate)
  }

  if (showImageModal.show) {
    return (
      <ViewImageModal
        close={() => setshowImageModal({show: false, clicked: ''})}
        images={
          showImageModal.clicked === 'vehicleImages'
            ? user?.pickupInfo?.vehicleDetails?.vehicleImages
            : showImageModal.clicked === 'debrisImagePathList'
            ? user.debrisImagePathList
            : user.images
        }
        name={showImageModal.clicked}
      />
    )
  }
  const returnData = () => {
    if (mapData.includes('[')) return clipText(accessNestedProperty(user, mapData), 30)
    switch (mapData) {
      case 'images':
        return (
          (user?.images?.length && (
            <div
              onClick={() =>
                setshowImageModal({
                  show: true,
                  clicked: mapData,
                })
              }
            >
              {/* {filterImage(user.images, mapData)?.length ? 'click to view' : '-'} */}
              {user.images?.length ? 'click to view' : '-'}
            </div>
          )) ||
          '-'
        )
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
            <div className='text-muted fw-bold text-muted d-block fs-7'>
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
            {user?.icon ? (
              <img
                onClick={() => handleClick(user?.icon || toAbsoluteUrl(`/media/avatars/blank.png`))}
                src={user?.icon || ''}
                alt={user.name}
              />
            ) : (
              ''
            )}
          </div>
        )
      case 'categoryIcon':
        return (
          <div className='symbol symbol-circle swymbol-50px overflow-hidden me-3'>
            <div className='symbol-label'>
              <img
                onClick={() =>
                  handleClick(
                    user?.orderDetails?.[0]?.categoryIcon ||
                      toAbsoluteUrl(`/media/avatars/blank.png`)
                  )
                }
                src={`${user?.orderDetails?.[0]?.categoryIcon || ''}`}
                alt={user.name}
                className='w-100 bg-[#156467]'
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
        return <span className='text-primary fs-7 fw-bold'>{totalQuantity?.toFixed(2)} kg</span>
      case 'pickup_quantity':
      case 'pickup_quantity_item':
        return user?.orderDetails?.[0].items?.map((x: any, ind: number) => (
          <div key={ind + 1 + ''}>
            {mapData === 'pickup_quantity_item' ? x.itemName : x.quantity?.toFixed(2)} Kg
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
                onClick={() =>
                  handleClick(
                    user?.kycDocument?.[mapData === 'bussinessImage' ? 0 : 1]?.docUrl ||
                      user?.kycDocument?.[mapData === 'bussinessImage' ? 0 : 1] ||
                      '' ||
                      toAbsoluteUrl(`/media/avatars/blank.png`)
                  )
                }
                src={`${
                  user?.kycDocument?.[mapData === 'bussinessImage' ? 0 : 1]?.docUrl ||
                  user?.kycDocument?.[mapData === 'bussinessImage' ? 0 : 1] ||
                  ''
                }`}
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
      case 'pickupointId':
        return (
          user?.pickupointId?.map((eachData, len) => (
            <div>
              {eachData?.pickupPointName || '-'}
              {len === user.pickupointId.length - 1 ? (
                ''
              ) : (
                <>
                  {' '}
                  , <br />
                </>
              )}
            </div>
          )) || ''
        )
      case 'street':
        return clipText(user.address.street)
      case 'createdAt':
      case 'start':
      case 'end':
        return new Date(+user[mapData] || new Date()).toLocaleDateString()

      case 'productionItemDetailsQuantity':
        return user['productionItemDetails']?.map((x: any, ind: number) => (
          <div key={ind + 1 + ''}>{x.quantity}</div>
        ))
      case 'totalAmount':
        return 'RM ' + user.totalAmount
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
        switch (statusData?.toLowerCase()) {
          case 'quantitydeposit':
            return <span className='text-primary fs-7 fw-bold'>+28%</span>
          case 'pickup completed':
          case 'completed':
          case 'accepted':
            return <span className='badge badge-light-success fs-7 fw-bold'>{statusData}</span>
          // return <span className='badge badge-light-danger fs-7 fw-bold'>{statusData}</span>
          case 'created':
            return <span className='badge badge-light-warning fs-7 fw-bold'>{statusData}</span>
          case 'rejected':
            return <span className='badge badge-light-danger fs-7 fw-bold'>{statusData}</span>
          case 'pickup assigned':
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
      {user.id && mapData && <ImageLightBox ref={lightBoxRef} />}
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
