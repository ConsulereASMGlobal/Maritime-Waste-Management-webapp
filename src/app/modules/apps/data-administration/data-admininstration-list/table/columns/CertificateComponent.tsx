import React from 'react'
import DownloadPDFButton from './DownloadPDFButton'
import {toAbsoluteUrl} from '../../../../../../../_metronic/helpers'
import {pdfColumns} from '../../../../operations-management/opertion-management-list/collection-order-management/_pdfColumns'
import {UsersTable} from '../../../../operations-management/opertion-management-list/table/UsersTable'

const CertificateComponent = () => {
  const watermarkStyle: any = {
    position: 'relative', // Required for absolute positioning of watermark
    backgroundImage: `url(${toAbsoluteUrl('/media/svg/files/blank-image.svg')})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: '20%', // Adjust to your preference
  }
  return (
    <>
      <div id='pdf-content' className='container' style={watermarkStyle}>
        <div className='row' style={{marginTop: '0rem'}}>
          <div className='col-10'>
            <div>Certificate ID : 22/08/2023/1234213</div>
            <div>Created on: {new Date().toLocaleDateString()}</div>
          </div>
          <div className='col'>
            <div
              className='image-input image-input-outline'
              data-kt-image-input='true'
              style={{backgroundImage: `url(${toAbsoluteUrl('/media/avatars/blank.png')})`}}
            >
              <div
                className='image-input-wrapper w-55px h-55px'
                style={{
                  backgroundImage: `url(${toAbsoluteUrl('/media/logos/default-dark.jpg')})`,
                }}
              ></div>
            </div>
          </div>
        </div>
        <h2 className='text-center'>Ocean Plastic Collection Certificate</h2>
        <div className='row card-body'>
          <div className='col-10'>
            <div>
              <div className='stepper stepper-pills stepper-column'>
                <div className='stepper-nav'>
                  <div className='container overflow-hidden text-center'></div>
                  <div className='stepper-item current' data-kt-stepper-element='nav'>
                    <div className='stepper-wrapper'>
                      <div className='stepper-icon w-40px h-40px'>
                        <i className='stepper-check fas fa-check'></i>
                      </div>

                      <div className='stepper-label-abc'>
                        <div className='stepper-desc fw-semibold'>Supply ID: 123</div>
                        <div className='stepper-desc fw-semibold'>
                          Supply Creation Date: 2023/08/12
                        </div>
                        <div className='stepper-desc fw-semibold'>Collector Name: Niraja</div>
                        <div className='stepper-desc fw-semibold'>Collector OID: 7OI23</div>
                        <div className='stepper-desc fw-semibold'>
                          Collector Address: New Tole, Chennai
                        </div>
                        <div className='stepper-desc fw-semibold'>No of Bags Collected: 32</div>
                      </div>
                    </div>

                    <div className='stepper-line h-40px'></div>
                  </div>
                  <div className='stepper-item current' data-kt-stepper-element='nav'>
                    <div className='stepper-wrapper'>
                      <div className='stepper-icon w-40px h-40px'>
                        <i className='stepper-check fas fa-check'></i>
                      </div>
                      <div className='stepper-label-abc'>
                        <div className='stepper-desc fw-semibold'>Pick-up Date: 2023/08/14</div>
                        <div className='stepper-desc fw-semibold'>Trip Id: 12TRP32</div>
                        <div className='stepper-desc fw-semibold'>Pick-up Location: New Eranea</div>
                        <div className='stepper-desc fw-semibold'>Driver name: Harry</div>
                        <div className='stepper-desc fw-semibold'>Driver OID Number: 45OI89</div>
                      </div>
                    </div>

                    <div className='stepper-line h-40px'></div>
                  </div>
                  <div className='stepper-item current' data-kt-stepper-element='nav'>
                    <div className='stepper-wrapper'>
                      <div className='stepper-icon w-40px h-40px'>
                        <i className='stepper-check fas fa-check'></i>
                      </div>

                      <div className='stepper-label-abc'>
                        <div className='stepper-desc fw-semibold'>
                          Material Receiving Date: 2023/08/16
                        </div>
                        <div className='stepper-desc fw-semibold'>
                          Material Received at: New Location
                        </div>
                        <div className='stepper-desc fw-semibold'>Material Received by: Mandy</div>
                        <div className='stepper-desc fw-semibold'>Receiver OID: 35ID78</div>
                      </div>
                    </div>

                    <div className='stepper-line h-40px'></div>
                  </div>
                  <div className='stepper-item current' data-kt-stepper-element='nav'>
                    <div className='stepper-wrapper'>
                      <div className='stepper-icon w-40px h-40px'>
                        <i className='stepper-check fas fa-check'></i>
                      </div>

                      <div className='stepper-label-abc'>
                        <div className='stepper-desc fw-semibold'>Inspection Result: Mandy</div>
                        <div className='stepper-desc fw-semibold'>All weight is in kgs</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-2'>
            <div
              className='image-input image-input-outline'
              data-kt-image-input='true'
              style={{backgroundImage: `url(${toAbsoluteUrl('/media/avatars/blank.png')})`}}
            >
              <div
                className='image-input-wrapper w-125px h-125px'
                style={{
                  backgroundImage: `url(${toAbsoluteUrl(
                    '/media/svg/files/collection-management.png'
                  )})`,
                }}
              ></div>
            </div>
            <div
              className='image-input image-input-outline'
              data-kt-image-input='true'
              style={{backgroundImage: `url(${toAbsoluteUrl('/media/avatars/blank.png')})`}}
            >
              <div
                className='image-input-wrapper w-125px h-125px'
                style={{
                  backgroundImage: `url(${toAbsoluteUrl('/media/svg/files/Process.png')})`,
                }}
              ></div>
            </div>
            <div
              className='image-input image-input-outline'
              data-kt-image-input='true'
              style={{backgroundImage: `url(${toAbsoluteUrl('/media/avatars/blank.png')})`}}
            >
              <div
                className='image-input-wrapper w-125px h-125px'
                style={{
                  backgroundImage: `url(${toAbsoluteUrl(
                    '/media/svg/files/dispatch-management.png'
                  )})`,
                }}
              ></div>
            </div>
          </div>
          <UsersTable maxValue={3} showPagination={false} columnProps={pdfColumns} />
          <div className='row' style={{marginTop: '5px'}}>
            <div className='col-10'>
              <div> Inspector Signature</div>
              <div>
                <div
                  className='image-input image-input-outline'
                  data-kt-image-input='true'
                  style={{backgroundImage: `url(${toAbsoluteUrl('/media/avatars/blank.png')})`}}
                >
                  <div
                    className='image-input-wrapper w-125px h-125px'
                    style={{
                      backgroundImage: `url(${toAbsoluteUrl('/media/misc/signature.png')})`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div className='col-2'>
              <div
                className='image-input image-input-outline'
                data-kt-image-input='true'
                style={{backgroundImage: `url(${toAbsoluteUrl('/media/avatars/blank.png')})`}}
              >
                <div
                  className='image-input-wrapper w-125px h-125px'
                  style={{backgroundImage: `url(${toAbsoluteUrl('/media/misc/qr.png')})`}}
                ></div>
              </div>
            </div>
          </div>
          <div className='text-center'>Company Address : Kathmandu, Baagdhol</div>
          <small className='text-center'>This Certificate is powered by MAREA Resources</small>
        </div>
      </div>
      <DownloadPDFButton />
    </>
  )
}

export default CertificateComponent
