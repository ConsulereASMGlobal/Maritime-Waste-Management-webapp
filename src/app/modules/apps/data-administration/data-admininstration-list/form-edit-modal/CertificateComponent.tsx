import React, {useEffect, useState} from 'react'
import DownloadPDFButton from '../table/columns/DownloadPDFButton'
import {KTIcon, toAbsoluteUrl, numberToWords} from '../../../../../../_metronic/helpers'
import {pdfReturnOrdersColumns} from '../return-orders/_tableViewCerificateColumns'
import {UsersTable} from '../table/UsersTable'
import {useLocation} from 'react-router'
import {useListView} from '../core/ListViewProvider'
import {pdfCollectOrdersColumns} from '../collect-orders/_tableCollectOrdersColumns'
import QRCode from 'qrcode.react'

const CertificateComponent = ({data, passRef}) => {
  const {pathname, ...rest} = useLocation()
  const {itemIdForUpdate} = useListView()

  const watermarkStyle: any = {
    position: 'relative', // Required for absolute positioning of watermark
    // backgroundImage: `url(${toAbsoluteUrl('/media/svg/files/blank-image.svg')})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: '20%', // Adjust to your preference
  }
  const [displayData, setDisplayData] = useState<any>({})
  let addressArray: any = []
  if (
    data?.[0]?.pickupInfo?.address?.state ||
    data?.[0]?.dropOffPointInfo?.address?.state ||
    data?.[0]?.centreInfo.address?.street
  ) {
    const responseAddress =
      data[0]?.pickupInfo?.address ||
      data[0]?.dropOffPointInfo?.address ||
      data[0]?.centreInfo?.address ||
      {}
    const excludedProperties = ['latitute', 'longitute']
    const order = ['street', 'city', 'state', 'country']
    for (const key of order) {
      if (!excludedProperties.includes(key)) {
        const value = responseAddress[key]
        if (value !== undefined && value) {
          addressArray.push(value)
        }
      }
    }
  }
  useEffect(() => {
    if (data?.length > 0) {
      setDisplayData(data[0])
    }
  }, [data])
  const isReturnOrdersPage = pathname.includes('supply-orders')
  const isCollectOrdersPage = pathname.includes('collect-orders')
  const pickupDate: any = parseInt(displayData?.pickupInfo?.pickupDate || new Date())

  function formatDate(date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hour = String(date.getHours()).padStart(2, '0')
    const minute = String(date.getMinutes()).padStart(2, '0')
    const period = date.getHours() < 12 ? 'am' : 'pm'

    return `${year}-${month}-${day} ${hour}:${minute} ${period}`
  }

  const depositerName = [
    {label: 'Depositor Name', value: displayData?.customerInfo?.name},
    {label: 'Mobile Number', value: displayData?.customerInfo?.mobile},
    {
      label: 'Source',
      value: isCollectOrdersPage
        ? displayData?.orderDetails?.[0]?.items?.[0]?.remark
        : displayData?.source,
    },
    {
      label: 'Collection Date',
      value: new Date(displayData.collectionDate || new Date()).toLocaleDateString() || '',
    },
    {label: 'Status', value: displayData?.status},
    {
      label: 'Geo-Cordintes',
      value: (displayData?.latitude || '') + ', ' + (displayData?.longitude || ''),
    },
  ]

  const collectionData = [
    {label: 'Supplier Name', value: displayData?.pickupInfo?.name},
    {label: 'Material Name', value: displayData?.orderDetails?.[0]?.categoryName || ''},
    {
      label: 'Order Date',
      value: new Date(displayData.createdAt || new Date()).toLocaleDateString() || '',
    },
    // {
    //   label: 'Scheduled Picked',
    //   value:
    //     new Date(
    //       isReturnOrdersPage ? pickupDate : displayData.createdAt || new Date()
    //     ).toLocaleDateString() +
    //       ' ' +
    //       displayData?.pickupInfo?.pickupSlot || '',
    // },
    {
      label: 'Delivery Date',
      value:
        (displayData?.pickupInfo?.pickupDate &&
          new Date(+displayData?.pickupInfo?.pickupDate || new Date()).toLocaleDateString()) ||
        '',
      // value:
      //   (displayData?.pickupInfo?.pickupDate &&
      //     formatDate(new Date(parseInt(displayData?.pickupInfo?.pickupDate)))) ||
      //   '',
    },
    {label: 'Status', value: displayData?.status || ''},
    // {label: 'Address', value: addressArray.join() || ''},
    {
      label: 'Geo Co-ordinates',
      value:
        displayData?.pickupInfo?.address?.latitute +
          ' , ' +
          displayData?.pickupInfo?.address?.longitute || '',
    },
  ]

  const logisticsDetails = [
    {label: 'Driver Name', value: displayData?.pickupInfo?.agentName || ''},
    // {label: 'Contact No', value: displayData?.pickupInfo?.agentMobile || ''},
    {
      label: 'Actual Pickup Date',
      value:
        (displayData?.pickupInfo?.pickupCompletedAt &&
          formatDate(new Date(parseInt(displayData.pickupInfo.pickupCompletedAt)))) ||
        '',
    } || '',
    {label: 'Vehicle Number', value: displayData?.pickupInfo?.vehicleNo || ''},
  ]
  console.log({displayData})
  const deliveryDetails = [
    {
      label: 'Recycler Name',
      value: displayData?.centreInfo?.name,
    },
    // {label: 'Address', value: ''},
    {
      label: 'Recycler Address',
      value:
        displayData?.centreInfo?.address?.street ||
        '' ||
        '' + '' + (displayData?.centreInfo?.address?.city || '') ||
        '' + '' + (displayData?.centreInfo?.address?.state || '') ||
        '',
    },
    {
      label: isReturnOrdersPage ? 'Received date' : 'Receiving Date',
      value: isReturnOrdersPage
        ? displayData.completedAt
          ? formatDate(new Date(displayData.completedAt))
          : ''
        : (displayData?.pickupInfo?.pickupCompletedAt &&
            formatDate(new Date(parseInt(displayData.pickupInfo.pickupCompletedAt)))) ||
          '',
    },
    {label: 'Chain of Custody', value: ''},
  ]

  const lastSection = [
    {label: 'Company Name', value: 'Malaysian Recycling Alliance Berhad (MAREA)'},
    {
      label: 'Regd Address',
      value: '1, Jln PJU 7/3, Mutiara Damansara, 47820 Petaling Jaya, Selangor, Malaysia',
    },
    // {label: 'Contact', value: '+63 (44) 761-8085'},
    {label: 'Email', value: 'info@marea.com.my'},
    {label: 'Website', value: 'https://www.marea.com.my'},
    // {label: 'VAT Registration Number', value: '-'},
    // {label: 'SEC Number', value: '-'},
  ]

  const subTotal = (data, withMultiply = false) => {
    if (!data) return 0
    return data.reduce(
      (accumulator, expense) =>
        accumulator + (withMultiply ? expense.quantity * expense.price : expense.quantity),
      0
    )
  }

  const chainOfCustody = [
    {
      label: 'Methodology',
      name: 'Batch Traceability',
    },
    {
      label: 'Batch Mgmt',
      name: 'Mass Balance',
    },
    {
      label: 'Standard',
      name: 'ISO 22095',
    },
  ]
  const collectorDetails = [
    {
      label: 'Business Name',
      value: displayData?.dropOffPointInfo?.name || '',
    },
    {
      label: 'Address',
      value: addressArray.join(' , ') || '',
    },
    {
      label: 'Payment Mode',
      value: displayData.paymentMode || '',
    },
    // {label: 'Payment Mode', value: displayData.paymentMode},
    // {
    //   label: 'Total Payment in word',
    //   value: numberToWords(
    //     subTotal(displayData?.orderDetails?.[0]?.items, isReturnOrdersPage ? false : true)
    //   ),
    // },
  ]

  const handleClick = (image) => {
    passRef?.current?.open(image, itemIdForUpdate)
  }
  const downloadPdfUrl =
    process.env.REACT_APP_BASE_API_URL +
    `v1/certificate/download?orderId=${displayData.id}&type=${
      pathname.includes('collect-orders') ? 'COLLECT' : 'RETURN'
    }`

  return (
    <div
      style={{
        padding: '20px',
        width: '100%',
        border: '2px solid black',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${toAbsoluteUrl('/media/misc/top-left.svg')}), url(${toAbsoluteUrl(
          '/media/misc/bottom-right.svg'
        )})`,
        backgroundPosition: 'top left, bottom right', // Set the positions for both images
        backgroundSize: 'auto, auto',
      }}
    >
      <div id='pdf-content' className='container' style={watermarkStyle}>
        <div className='row'>
          <div
            className='col-9'
            style={{
              padding: '2rem 3.25rem',
              fontFamily: 'GT Walsheim Pro',
            }}
          >
            <div>
              {isCollectOrdersPage ? 'Receipt Number' : 'Certificate Number'}:{' '}
              <span className='fw-bolder  text-dark'>{displayData.id || ''}</span>
            </div>
          </div>
          <div className='col-3' style={{marginTop: '10px'}}>
            <img
              width={180}
              height={100}
              style={{backgroundColor: '#FFFFFF'}}
              src={toAbsoluteUrl('/media/logos/sidebar-logo.jpeg')}
              alt='main-logo'
            />
          </div>
        </div>
        <div
          style={{
            color: '#043e66',
            fontSize: '45px',
            fontStyle: 'italic',
            fontWeight: 'bold',
            fontFamily: 'Monotype Corsiva, cursive',
            lineHeight: '54px',
          }}
          className='text-center'
        >
          {!isReturnOrdersPage ? 'Collection Receipt' : 'Dispatch Receipt'}
        </div>
        <br />
        <div style={{fontFamily: 'GT Walsheim Pro', padding: '10px 20px'}}>
          <div
            // className='text-center'
            style={{
              color: '#242727',
              fontSize: '18px',
              fontWeight: 'bold',
              // background: 'rgba(177, 227, 227, 0.2)',
              // width: 'fit-content',
              // margin: 'auto',
              // padding: '10px',
            }}
          >
            {isReturnOrdersPage ? 'Suppliers Details' : ' Collection Agent'}
          </div>
          <div className='row'>
            <div className='col-9'>
              <div className='row'>
                <div className='col-11'>
                  {(isReturnOrdersPage ? collectionData : depositerName).map((eachData, ind) => (
                    <div className='row' key={ind + 1 + ''} style={{fontSize: '14px'}}>
                      <label className='col-lg-4 ' style={{color: '#242727', fontWeight: '700'}}>
                        {eachData.label}
                      </label>
                      <div className='col-lg-8' style={{color: '#4F5152'}}>
                        <span className='fs-6'>: &nbsp;&nbsp;{eachData.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='col-3'>
              <QRCode value={downloadPdfUrl} />
              {/* <img
                style={{marginLeft: '20px'}}
                width={140}
                height={140}
                src={toAbsoluteUrl('/media/misc/qr.png')}
                alt='image'
              /> */}
            </div>

            <div
              style={{
                marginTop: '20px',
                marginBottom: '-7px',
                fontSize: '18px',
                fontWeight: 'bold',
              }}
            >
              Material Details
            </div>
            {displayData?.orderDetails?.[0]?.items?.length && (
              <table className='table table-hover table-rounded table-striped border gy-4 gs-7 table-bordered'>
                <thead style={{background: '#043e66'}}>
                  <tr className='fw-bold text-gray-800 border-bottom-2 border-gray-200 text-center'>
                    <th style={{color: '#FFFFFF', maxWidth: '1px'}}>S.N</th>
                    <th style={{color: '#FFFFFF'}}>Category</th>
                    <th style={{color: '#FFFFFF'}}>Type</th>
                    {isCollectOrdersPage && <th style={{color: '#FFFFFF'}}>Unit Price</th>}
                    {!isReturnOrdersPage && <th style={{color: '#FFFFFF'}}>Weight</th>}
                    <th style={{color: '#FFFFFF'}}>
                      {isCollectOrdersPage ? 'Order Value' : 'Quantity'}
                    </th>
                    {/* {!isReturnOrdersPage && (
                      <>
                        <th style={{color: '#FFFFFF'}}>Unit Rate</th>
                        <th style={{color: '#FFFFFF'}}>Total Value</th>
                      </>
                    )} */}
                  </tr>
                </thead>
                <tbody>
                  {displayData?.orderDetails?.[0]?.items.map((eachData, eachInd) => (
                    <tr key={eachInd + 1 + '-'} className='text-center'>
                      <td>{eachInd + 1 + ''}</td>
                      <td>{displayData?.orderDetails?.[0]?.categoryName}</td>
                      <td>{eachData.itemName}</td>
                      {isCollectOrdersPage && <td>{eachData.price?.toFixed(2)}</td>}
                      {!isReturnOrdersPage && <td>{eachData.quantity || ''}</td>}
                      <td>
                        {(isCollectOrdersPage && 'RM') || ''}{' '}
                        {(eachData.quantity * eachData.price)?.toFixed(2)}{' '}
                        {(!isCollectOrdersPage && eachData.unit) || ''}
                      </td>

                      {/* {!isReturnOrdersPage && (
                        <>
                          <td>
                            {eachData.price?.toFixed(2)} {eachData.currency}
                          </td>
                          <td>{(eachData.quantity * eachData.price)?.toFixed(2)}</td>
                        </>
                      )} */}
                    </tr>
                  ))}
                </tbody>
                {!isCollectOrdersPage && (
                  <tfoot>
                    <tr>
                      <td colSpan={3} className='align-end fs-3 fw-bold text-end'>
                        Certified Weight
                      </td>
                      <td className='text-center fw-bold fs-1'>
                        {subTotal(
                          displayData?.orderDetails?.[0]?.items,
                          isReturnOrdersPage ? true : true
                        )?.toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                )}
              </table>
            )}
            {(isReturnOrdersPage && (
              <>
                <div className=''>
                  <div className=''>
                    <div className=''>
                      <div
                        className=''
                        style={{
                          fontSize: '18px',
                          fontWeight: 'bold',
                          // background: 'rgba(177, 227, 227, 0.2)',
                          width: 'fit-content',
                          // padding: '10px 10px',
                          marginTop: '20px',
                        }}
                      >
                        {' '}
                        Recycling Details
                      </div>
                      <div className='row'>
                        <div className='col-9'>
                          <div className='row'>
                            <div className='col-11'>
                              {deliveryDetails.map((eachData, ind) => (
                                <div className='row' key={ind + 1 + ''} style={{fontSize: '14px'}}>
                                  <label
                                    className='col-lg-4 '
                                    style={{color: '#242727', fontWeight: '700'}}
                                  >
                                    {eachData.label}
                                  </label>
                                  <div className='col-lg-8' style={{color: '#4F5152'}}>
                                    <span className='fs-6'>: &nbsp;&nbsp;{eachData.value}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {isReturnOrdersPage &&
                      ((
                        <div className='row flex justify-center'>
                          <div className='col-3' style={{marginTop: '10px'}}>
                            <img
                              width={180}
                              height={100}
                              style={{backgroundColor: '#FFFFFF'}}
                              src={displayData.transportImage || ''}
                              alt='main-logo'
                            />
                          </div>
                          <div className='col-3' style={{marginTop: '10px'}}>
                            <img
                              width={180}
                              height={100}
                              style={{backgroundColor: '#FFFFFF'}}
                              src={displayData.invoiceImg || ''}
                              alt='main-logo'
                            />
                          </div>
                          <div className='col-3' style={{marginTop: '10px'}}>
                            <img
                              width={180}
                              height={100}
                              style={{backgroundColor: '#FFFFFF'}}
                              src={displayData.weightImage || ''}
                              alt='main-logo'
                            />
                          </div>
                        </div>
                      ) ||
                        '')}
                  </div>
                  <div className='col-2'>
                    {(displayData.images?.length && (
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          marginBottom: '22px',
                          marginTop: '22px',
                        }}
                      >
                        {displayData?.images.map((eachImages, eachInd) => (
                          <div key={eachInd + 1 + ''} className='image-input '>
                            <div
                              onClick={() => handleClick(eachImages)}
                              className='image-input-wrapper'
                              style={{
                                width: 163,
                                height: 150,
                                // backgroundSize: '400px',
                                marginRight: '15px',
                                // backgroundImage: `url(${eachImages})`,
                                backgroundImage: `url(${eachImages})`,
                              }}
                            ></div>
                          </div>
                        ))}
                      </div>
                    )) ||
                      null}
                  </div>
                </div>
              </>
            )) || (
              <div className='row'>
                <div className='col-9'>
                  <div
                    style={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                    }}
                  >
                    {' '}
                    Aggregator Details
                  </div>
                  <div className='row'>
                    <div className='col-11'>
                      {collectorDetails.map((eachData, ind) => (
                        <div className='row' key={ind + 1 + ''} style={{fontSize: '14px'}}>
                          <label className='col-lg-4' style={{color: '#242727', fontWeight: '700'}}>
                            {eachData.label}
                          </label>
                          <div className='col-lg-8' style={{color: '#4F5152'}}>
                            <span className='fs-6'>: &nbsp;&nbsp;{eachData.value}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <br />
                  <div
                    style={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                    }}
                  >
                    {' '}
                    Chain of Custody
                  </div>
                  <div className='row'>
                    <div className='col-11'>
                      {chainOfCustody.map((eachData, ind) => (
                        <div className='row' key={ind + 1 + ''} style={{fontSize: '14px'}}>
                          <label className='col-lg-4' style={{color: '#242727', fontWeight: '700'}}>
                            {eachData.label}
                          </label>
                          <div className='col-lg-8' style={{color: '#4F5152'}}>
                            <span className='fs-6'>: &nbsp;&nbsp;{eachData.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* <div>
                    <div style={{fontSize: '18px', fontWeight: 'bold'}}>Signature</div>
                    <img width={100} height={100} src={displayData.sign} alt='images' />
                  </div> */}
                </div>
                <div className='col-3'>
                  {(displayData.images?.length && (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: '22px',
                        marginTop: '22px',
                      }}
                    >
                      {displayData?.images.map((eachImages, eachInd) => (
                        <div key={eachInd + 1 + ''} className='image-input '>
                          <div
                            onClick={() => handleClick(eachImages)}
                            className='image-input-wrapper'
                            style={{
                              width: 163,
                              height: 150,
                              // backgroundSize: '400px',
                              marginRight: '15px',
                              // backgroundImage: `url(${eachImages})`,
                              backgroundImage: `url(${eachImages})`,
                            }}
                          ></div>
                        </div>
                      ))}
                    </div>
                  )) ||
                    null}
                </div>
              </div>
            )}
            <div
              style={{
                // background: 'rgba(177, 227, 227, 0.2)',
                background: '#f8f8f4',
                padding: '5px 10px',
                borderRadius: '4px',
                gap: '4px',
                marginBottom: '12px',
                marginTop: '12px',
              }}
            >
              <div className='row'>
                <div className='col-11'>
                  {lastSection.map((eachData, ind) => (
                    <div
                      className='row'
                      key={ind + 1 + ''}
                      style={{
                        fontSize: '14px',
                      }}
                    >
                      <label className='col-lg-3 ' style={{color: '#242727', fontWeight: '700'}}>
                        {eachData.label}
                      </label>
                      <div className='col-lg-9' style={{color: '#4F5152'}}>
                        <span className='fs-6'>: &nbsp;&nbsp;{eachData.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='text-center'>
              <div>This is not a tax invoice.</div>
              <div>This is computer generated document, no signature is required.</div>
              <div></div>
              {/* This is a computer-generated document. No signature is required */}
            </div>
            <div
              // className='text-center'
              style={{
                background: 'white',
                width: 'fit-content',
                margin: '0px auto -22px',
              }}
            >
              <div>
                <img
                  width={100}
                  height={25}
                  src='/media/svg/dashboard/asm-final-2.png'
                  alt='image'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <DownloadPDFButton url={downloadPdfUrl} />
    </div>
  )
}

export default CertificateComponent
