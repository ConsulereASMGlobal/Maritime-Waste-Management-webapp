/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {KTIcon} from '../../../helpers'
import {userInfo} from 'os'

type Props = {
  className: string
  data?: any
}

const TablesWidget13: React.FC<Props> = ({className, data = []}) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Recent Supply</span>
          <span className='text-muted mt-1 fw-semibold fs-7'>Last 10 supply</span>
        </h3>
        <div className='card-toolbar'>
          {/* begin::Menu */}
          <button
            type='button'
            className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
            data-kt-menu-trigger='click'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='top-end'
          >
            <KTIcon iconName='category' className='fs-2' />
          </button>
          {/* begin::Menu 2 */}
          <div
            className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold w-200px'
            data-kt-menu='true'
          >
            {/* begin::Menu item */}
            <div className='menu-item px-3'>
              <div className='menu-content fs-6 text-dark fw-bold px-3 py-4'>Quick Actions</div>
            </div>
            {/* end::Menu item */}
            {/* begin::Menu separator */}
            <div className='separator mb-3 opacity-75'></div>
            {/* end::Menu separator */}
            {/* begin::Menu item */}
            <div className='menu-item px-3'>
              <a href='#' className='menu-link px-3'>
                New Ticket
              </a>
            </div>
            {/* end::Menu item */}
            {/* begin::Menu item */}
            <div className='menu-item px-3'>
              <a href='#' className='menu-link px-3'>
                New Customer
              </a>
            </div>
            {/* end::Menu item */}
            {/* begin::Menu item */}
            <div
              className='menu-item px-3'
              data-kt-menu-trigger='hover'
              data-kt-menu-placement='right-start'
              data-kt-menu-flip='left-start, top'
            >
              {/* begin::Menu item */}
              <a href='#' className='menu-link px-3'>
                <span className='menu-title'>New Group</span>
                <span className='menu-arrow'></span>
              </a>
              {/* end::Menu item */}
              {/* begin::Menu sub */}
              <div className='menu-sub menu-sub-dropdown w-175px py-4'>
                {/* begin::Menu item */}
                <div className='menu-item px-3'>
                  <a href='#' className='menu-link px-3'>
                    Admin Group
                  </a>
                </div>
                {/* end::Menu item */}
                {/* begin::Menu item */}
                <div className='menu-item px-3'>
                  <a href='#' className='menu-link px-3'>
                    Staff Group
                  </a>
                </div>
                {/* end::Menu item */}
                {/* begin::Menu item */}
                <div className='menu-item px-3'>
                  <a href='#' className='menu-link px-3'>
                    Member Group
                  </a>
                </div>
                {/* end::Menu item */}
              </div>
              {/* end::Menu sub */}
            </div>
            {/* end::Menu item */}
            {/* begin::Menu item */}
            <div className='menu-item px-3'>
              <a href='#' className='menu-link px-3'>
                New Contact
              </a>
            </div>
            {/* end::Menu item */}
            {/* begin::Menu separator */}
            <div className='separator mt-3 opacity-75'></div>
            {/* end::Menu separator */}
            {/* begin::Menu item */}
            <div className='menu-item px-3'>
              <div className='menu-content px-3 py-3'>
                <a className='btn btn-primary btn-sm px-4' href='#'>
                  Generate Reports
                </a>
              </div>
            </div>
            {/* end::Menu item */}
          </div>
          {/* end::Menu 2 */}
          {/* end::Menu */}
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-3'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
            {/* begin::Table head */}
            <thead>
              <tr className='fw-bold text-muted'>
                <th className='min-w-120px'>Aggregator</th>
                <th className='min-w-120px'>Address</th>
                <th className='min-w-120px'>Recycler</th>
                <th className='min-w-120px'>Item</th>
                <th className='min-w-120px'>Quantity</th>
                <th className='min-w-120px'>Images</th>
                <th className='min-w-120px'>Status</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {data?.length &&
                data?.slice(0, 10).map((eachData, eachIndex) => {
                  return (
                    <tr key={eachIndex + 1 + ''}>
                      <td>
                        <a href='#' className='text-dark  text-hover-primary fs-6'>
                          {eachData.createdAt}
                        </a>
                      </td>
                      <td>
                        <a href='#' className='text-dark  text-hover-primary fs-6'>
                          {eachData?.pickupInfo?.name}
                        </a>
                      </td>
                      <td>
                        <a href='#' className='text-dark  text-hover-primary d-block mb-1 fs-6'>
                          {new Date(eachData?.createdAt || new Date()).toLocaleDateString()}
                        </a>
                        <span className='text-muted fw-semibold text-muted d-block fs-7'>
                          {eachData?.dispatchCodeName}
                        </span>
                      </td>
                      <td>
                        <a href='#' className='text-dark  text-hover-primary fs-6'>
                          {eachData?.pickupInfo?.centreName}
                        </a>
                      </td>

                      <td>
                        {eachData?.orderDetails?.[0]?.items?.map((x, len) => {
                          return (
                            <span className='text-hover-primary d-block fs-6'>
                              {x.itemName}{' '}
                              {eachData?.orderDetails?.[0]?.items?.length - 1 === len ? '' : ', '}
                            </span>
                          )
                        }) || '-'}
                      </td>
                      <td>
                        {eachData?.orderDetails?.[0]?.items?.map((x, len) => {
                          return (
                            <span className='badge badge-light-primary fs-8 fw-bold'>
                              {x.quantity}{' '}
                              {eachData?.orderDetails?.[0]?.items?.length - 1 === len ? '' : ', '}
                            </span>
                            // <span className='badge badge-light-primary fs-8  text-hover-primary d-block fs-6'>
                            //   {x.quantity}{' '}
                            //   {eachData?.orderDetails?.[0]?.items?.length - 1 === len ? '' : ', '}
                            // </span>
                          )
                        }) || '-'}
                      </td>
                      <td>
                        <a href='#' className='text-dark  text-hover-primary fs-6'>
                          {eachData.createdAt}
                        </a>
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

export {TablesWidget13}
