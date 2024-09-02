/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {KTIcon, toAbsoluteUrl, generateAddress} from '../../../_metronic/helpers'
import {Link, useLocation} from 'react-router-dom'
import {Dropdown1} from '../../../_metronic/partials'
import {useAuth} from '../auth'

const ProfileHeader: React.FC = () => {
  const {currentUser, auth}: any = useAuth()
  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-body pt-9 pb-0'>
        <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
          <div className='me-7 mb-4'>
            <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
              <img
                src={currentUser?.personalDetails?.profileImage || '/media/avatars/blank.png'}
                alt='Smart Hub'
              />
              <div className='position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px'></div>
            </div>
          </div>

          <div className='flex-grow-1'>
            <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
              <div className='d-flex flex-column'>
                <div className='d-flex align-items-center mb-2'>
                  {currentUser?.personalDetails?.name}
                  <KTIcon iconName='verify' className='fs-1 text-primary' />
                  &nbsp;{currentUser?.roleName}
                </div>

                <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                  <a
                    href='#'
                    className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                  >
                    <KTIcon iconName='geolocation' className='fs-4 me-1' />
                    {(currentUser?.address && generateAddress(currentUser?.address)) || ''}
                  </a>
                  {currentUser?.personalDetails?.email && (
                    <a
                      href='#'
                      className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'
                    >
                      <KTIcon iconName='sms' className='fs-4 me-1' />
                      {currentUser?.personalDetails?.email}
                    </a>
                  )}
                  <a
                    href='#'
                    className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'
                  >
                    <KTIcon iconName='phone' className='fs-4 me-1' />
                    {currentUser?.personalDetails?.mobile}
                  </a>
                  <a
                    href='#'
                    className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'
                  >
                    <KTIcon iconName='check' className='fs-4 me-1' />
                    {currentUser?.hubName}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {ProfileHeader}
