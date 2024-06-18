/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {ViewImageModal} from '../../../../app/modules/apps/data-administration/data-admininstration-list/table/columns/ViewImageModal'

type Props = {
  className: string
  data?: any
}

const TablesWidget10: React.FC<Props> = ({className, data = []}) => {
  const [showImageModal, setshowImageModal] = useState({
    show: false,
    clicked: '',
  })

  if (showImageModal.show) {
    return (
      <ViewImageModal
        close={() => setshowImageModal({show: false, clicked: ''})}
        images={showImageModal.clicked}
      />
    )
  }
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Recent Collections</span>
          <span className='text-muted mt-1 fw-semibold fs-7'>Last 10 collections</span>
        </h3>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
            {/* begin::Table head */}
            <thead>
              <tr className='fw-bold text-muted text-left'>
                <th className='min-w-150px'>Aggregator</th>
                <th className='min-w-140px'>Address</th>
                <th className='min-w-120px'>Collection Agent</th>
                <th className='min-w-120px'>Item</th>
                <th className='min-w-120px'>Quantity</th>
                <th className='min-w-100px'>Images</th>
                <th className='min-w-100px'>Payment</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {data?.length &&
                data?.slice(0, 10).map((eachData, eachIndex) => {
                  return (
                    <tr key={eachIndex + 1} className='text-left'>
                      <td>
                        <div className='d-flex align-items-center'>
                          {/* <div className='symbol symbol-45px me-5'>
                            <img src={teamImage?.url || ''} alt='' />
                          </div> */}
                          <div className='d-flex justify-content-start flex-column'>
                            <a href='#' className='text-dark text-hover-primary fs-6'>
                              {eachData?.dropOffPointInfo?.name}
                            </a>
                            {/* <span className='text-muted fw-semibold text-muted d-block fs-7'>
                              {eachData?.customerInfo?.address?.country}
                            </span> */}
                          </div>
                        </div>
                      </td>
                      <td>
                        <a href='#' className='text-success text-hover-primary d-block fs-6'>
                          {eachData?.dropOffPointInfo?.address?.street}
                        </a>
                      </td>
                      <td>
                        <a href='#' className='text-dark text-hover-primary d-block fs-6'>
                          {eachData?.customerInfo?.name}
                        </a>
                      </td>
                      <td>
                        <a href='#' className='text-dark text-hover-primary d-block fs-6'>
                          {eachData.orderDetails[0]?.items.map(
                            (x, len) =>
                              `${x.itemName} ${
                                eachData.orderDetails[0]?.items.length - 1 === len ? '' : ' , '
                              }`
                          )}
                        </a>
                        {/*  <span className='text-muted fw-semibold text-muted d-block fs-7'>
                          Houses &amp; Hotels
                        </span> */}
                      </td>
                      <td>
                        <a href='#' className='badge badge-light-primary fs-8'>
                          {eachData.orderDetails[0]?.items.map(
                            (x, len) =>
                              `${x.quantity} ${
                                eachData.orderDetails[0]?.items?.length - 1 === len ? '' : ' , '
                              }`
                          )}
                        </a>
                      </td>
                      <td>
                        <div className='d-flex '>
                          <span
                            className='badge badge-light-primary fs-8 fw-bold'
                            onClick={() =>
                              eachData?.images?.length > 0
                                ? setshowImageModal({
                                    show: true,
                                    clicked: eachData.images,
                                  })
                                : ''
                            }
                          >
                            {' '}
                            click to view
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className='badge badge-light-primary fs-8'>{eachData.totalAmount}</div>
                        {/* <a href='#' className='badge badge-light-primary fs-8'>
                          {eachData.orderDetails[0]?.items.map(
                            (x, len) =>
                              `${x.quantity} ${
                                eachData.orderDetails[0]?.items?.length - 1 === len ? '' : ' , '
                              }`
                          )}
                        </a> */}
                      </td>
                    </tr>
                  )
                })}
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
      {/* begin::Body */}
    </div>
  )
}

export {TablesWidget10}
