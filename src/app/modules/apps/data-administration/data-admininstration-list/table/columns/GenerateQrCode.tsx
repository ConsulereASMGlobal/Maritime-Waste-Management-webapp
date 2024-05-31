import React from 'react'
import QRCode from 'qrcode.react'
import {KTSVG, generateAddress} from '../../../../../../../_metronic/helpers'
import html2pdf from 'html2pdf.js'
import html2canvas from 'html2canvas'

const GenerateQrCode = ({data, close}) => {
  const staticData = {
    name: data?.personalDetails?.name || '',
    address: generateAddress(data?.address || '') || '',
    mobile: data?.personalDetails?.mobile || '',
    userType: 'PICKUP_POINT',
    id: data?.id || '',
  }
  const downloadQRCode = () => {
    const element = document.getElementById('kt_modal_add_user')
    console.log({element})

    if (element) {
      html2canvas(element, {
        scale: 2, // Adjust the scale as needed
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png')

        // Create a link element to download the PNG
        const link = document.createElement('a')
        link.href = imgData
        link.download = 'qrcode.png'
        link.click()
      })
    }
  }
  // const downloadQRCode = () => {
  //   // const canvas: any = document.querySelector('canvas')
  //   // const qrCodeURL = canvas.toDataURL('image/png')
  //   // const link = document.createElement('a')
  //   // link.href = qrCodeURL
  //   // link.download = 'qrcode.png'
  //   // link.click()
  //   const element = document.getElementById('kt_modal_add_user') // Provide an ID to the root element
  //   console.log({element})
  //   if (element) {
  //     const opt = {
  //       margin: 10,
  //       filename: 'qrcode.pdf',
  //       image: {type: 'jpeg', quality: 0.98},
  //       html2canvas: {scale: 2},
  //       jsPDF: {unit: 'mm', format: 'a6', orientation: 'landscape'},
  //     }
  //     html2pdf().from(element).set(opt).save()
  //   }
  // }

  console.log({data})

  return (
    <>
      <div className='modal fade show d-block' role='dialog' tabIndex={-1} aria-modal='true'>
        <div
          className={`modal-dialog 
           mw-650px modal-dialog-centered`}
        >
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>QR CODE</h5>
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
            <div id='kt_modal_add_user' className='modal-body scroll-y mx-5 mx-xl-15 my-7'>
              <div className='text-center flex justify-center'>
                <QRCode value={JSON.stringify(staticData)} />
              </div>
              <div style={{textAlign: 'center'}}>
                <div>{data?.address?.street}</div>
                <div>
                  {data?.address?.city}
                  {', '}
                  {data?.address?.country}
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
                type='button'
                onClick={() => {
                  downloadQRCode()
                  close()
                }}
                className='btn btn-primary'
              >
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='modal-backdrop fade show'></div>
    </>
  )
}

export default GenerateQrCode
