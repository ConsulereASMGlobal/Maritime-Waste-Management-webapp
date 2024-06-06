/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {Dropdown1} from '../../content/dropdown/Dropdown1'
import {KTIcon} from '../../../helpers'

type Props = {
  className: string
  color: string
  bg_color?: string
  data?: any
}

const MixedWidget1: React.FC<Props> = ({data, className, color, bg_color}) => {
  const returnData = (amount) => {
    return (
      <div className='d-flex align-items-center'>
        <div className='fw-bold fs-5 text-gray-800 pe-1'>{amount?.toFixed() || '0'}</div>
        {/* {(amount && (
          <>
            <KTIcon
              iconName={`arrow-${amount <= 0 ? 'down' : 'up'}`}
              className='fs-5 text-success ms-1'
            />
          </>
        )) ||
          ''} */}
      </div>
    )
  }
  return (
    <div className={`card ${className}`}>
      <div className='card-body p-0'>
        <div
          className={`px-9 pt-7 card-rounded h-275px w-100`}
          style={{backgroundColor: bg_color || '#E89611'}}
        >
          <div className=''>
            <h4 className='m-0 text-white text-center fw-bold fs-3'>
              {data?.pickupPointName?.length > 35
                ? data?.pickupPointName.slice(0, 35) + '...'
                : data.pickupPointName}
            </h4>
          </div>
          <div className='d-flex text-center flex-column text-white pt-2'>
            {/* <small className='fw-semibold fs-7'>Current Stock</small> */}
            <span className='fw-bold fs-4 pt-1'>{data?.stock?.toFixed(2) || '0'} kg</span>
          </div>
        </div>
        <div
          className='shadow-xs card-rounded mx-9 mb-9 px-6 py-9 position-relative z-index-1 bg-body'
          style={{marginTop: '-165px'}}
        >
          <div className='d-flex align-items-center mb-6'>
            <div className='d-flex align-items-center flex-wrap w-100'>
              <div className='mb-1 pe-3 flex-grow-1'>
                <a href='#' className='fs-5 text-gray-800 text-hover-primary fw-bold'>
                  Collected
                </a>
              </div>
              {returnData(data?.collected)}
            </div>
          </div>
          <div className='d-flex align-items-center mb-6'>
            <div className='d-flex align-items-center flex-wrap w-100'>
              <div className='mb-1 pe-3 flex-grow-1'>
                <a href='#' className='fs-5 text-gray-800 text-hover-primary fw-bold'>
                  Processed
                </a>
              </div>

              {returnData(data?.processed)}
            </div>
          </div>
          <div className='d-flex align-items-center mb-6'>
            <div className='d-flex align-items-center flex-wrap w-100'>
              <div className='mb-1 pe-3 flex-grow-1'>
                <a href='#' className='fs-5 text-gray-800 text-hover-primary fw-bold'>
                  Supplied
                </a>
              </div>
              {returnData(data?.supplied)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {MixedWidget1}
