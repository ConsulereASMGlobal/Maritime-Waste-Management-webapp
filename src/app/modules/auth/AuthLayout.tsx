/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect} from 'react'
import {Outlet, Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../_metronic/helpers'

const AuthLayout = () => {
  useEffect(() => {
    const root = document.getElementById('root')
    if (root) {
      root.style.height = '100%'
    }
    return () => {
      if (root) {
        root.style.height = 'auto'
      }
    }
  }, [])

  return (
    <div className='d-flex flex-column flex-lg-row flex-column-fluid h-100'>
      {/* begin::Body */}
      <div
        className='d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1'
        style={{background: '#043e66'}}
      >
        {/* begin::Form */}
        <div className='d-flex  '>
          <img
            alt='Logo'
            src={toAbsoluteUrl('/media/logos/main.png')}
            style={{
              height: '50px !important',
              width: '120px',
              // width: '50px',
              marginLeft: '-5px',
              marginTop: '-30px',
            }}
            // className='h-100px'
          />
        </div>

        <div className='d-flex flex-center flex-column flex-lg-row-fluid'>
          <div style={{fontSize: '42px', marginBottom: '42px', color: 'white'}}>
            Good to see you again
          </div>{' '}
          {/* begin::Wrapper */}
          <div className='w-lg-500px p-10'>
            <Outlet />
          </div>
          {/* end::Wrapper */}
        </div>
        {/* end::Form */}

        {/* begin::Footer */}
        <div className='d-flex flex-center flex-wrap px-5'>
          {/* begin::Links */}
          <div className='d-flex fw-semibold text-white fs-base'>
            <a href='#' className='px-5 text-white' target='_blank'>
              Copyright &copy; {new Date().getFullYear().toString()} ASM Global
            </a>
            <a href='#' className='px-5 text-white' target='_blank'>
              Terms
            </a>

            {/* <a href='#' className='px-5' target='_blank'>
              Plans
            </a> */}

            <a href='#' className='px-5 text-white' target='_blank'>
              Contact Us
            </a>
          </div>
          {/* end::Links */}
        </div>
        {/* end::Footer */}
      </div>
      {/* end::Body */}

      {/* begin::Aside */}
      <div className='d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover order-1 order-lg-2 overflow-hidden position-relative'>
        <div
          // className='position-fixed'
          style={{left: '50%'}}
        >
          <video autoPlay muted loop style={{maxWidth: '100%', position: 'fixed'}}>
            <source src='/media/logos/intro_video.mp4' type='video/mp4' />
            Your browser does not support HTML5 video.
          </video>
        </div>
      </div>
      {/* end::Aside */}
    </div>
  )
}

export {AuthLayout}
