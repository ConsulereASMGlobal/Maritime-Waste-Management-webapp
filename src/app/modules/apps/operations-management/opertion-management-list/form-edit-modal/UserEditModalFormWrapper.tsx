import {useQuery} from 'react-query'
// import {UserEditModalForm} from './UserEditModalForm'
// import {RemarksEditModalForm} from './remarksModalForm'
// import {DownTimeModalForm} from './downTimeModalForm'
import {isNotEmpty, QUERIES, toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {useListView} from '../core/ListViewProvider'
import {getUserById} from '../core/_requests'
import {UsersListLoading} from '../components/loading/UsersListLoading'
import {Suspense, useState, useEffect} from 'react'
import {UsersTable} from '../table/UsersTable'
import {pdfColumns} from '../collection-order-management/_pdfColumns'

const UserEditModalFormWrapper = ({formName = 'UserEditModalForm'}) => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const enabledQuery = isNotEmpty(itemIdForUpdate)
  const {
    isLoading,
    data: user,
    error,
  } = useQuery(
    `${QUERIES.USERS_LIST}-user-${itemIdForUpdate}`,
    () => getUserById(itemIdForUpdate),
    {
      cacheTime: 0,
      enabled: enabledQuery,
      onError: (err) => {
        setItemIdForUpdate(undefined)
        console.error(err)
      },
    }
  )
  return (
    <>
      <div className='container card'>
        <div className='row' style={{marginTop: '2rem'}}>
          <div className='col-10'>
            <div>Certificate ID : 2023/08/22/1234213</div>
            <div>Created on: {new Date().toLocaleDateString()}</div>
          </div>
          <div className='col'>
            <div
              className='image-input image-input-outline'
              data-kt-image-input='true'
              style={{backgroundImage: `url(${toAbsoluteUrl('/media/avatars/blank.png')})`}}
            >
              <div
                className='image-input-wrapper w-65px h-65px'
                style={{backgroundImage: `url(${toAbsoluteUrl('/media/logos/default-dark.jpg')})`}}
              ></div>
            </div>
          </div>
        </div>
        <h1 className='text-center'>Ocean Plastic Collection Certificate</h1>
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
          <div className='col'>
            <div>
              {' '}
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
            </div>
            <div>
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
            </div>
            <div>
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
          </div>
          <UsersTable maxValue={3} showPagination={false} columnProps={pdfColumns} />
          <div className='row'>
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
                    style={{backgroundImage: `url(${toAbsoluteUrl('/media/misc/signature.png')})`}}
                  ></div>
                </div>
              </div>
            </div>
            <div className='col align-self-end'>
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
          <small className='text-center'>This Certificate is powered by Rezin</small>
        </div>
      </div>
    </>
  )

  // const [DynamicComponent, setDynamicComponent] = useState<any>(null)

  // useEffect(() => {
  //   async function fetchDynamicComponent() {
  //     const component = await import(`./${formName}`)
  //     setDynamicComponent(component)
  //   }

  //   if (formName) {
  //     fetchDynamicComponent()
  //   }
  // }, [formName])

  // if (!DynamicComponent) {
  //   return null
  // }

  // const fallbackComponent = <div>Loading...</div>
  // console.log('first')
  // if (!itemIdForUpdate) {
  //   const EmptyUserComponent = DynamicComponent.default
  //   return (
  //     <Suspense fallback={fallbackComponent}>
  //       <EmptyUserComponent isUserLoading={isLoading} user={{id: undefined}} />
  //     </Suspense>
  //   )
  // }

  // if (!isLoading && !error && user) {
  //   const FilledUserComponent = DynamicComponent.default
  //   return (
  //     <Suspense fallback={fallbackComponent}>
  //       <FilledUserComponent isUserLoading={isLoading} user={{...user, ...getByIdData}} />
  //     </Suspense>
  //   )
  // }
  // if (isLoading) {
  //   return <UsersListLoading text='Loading' />
  // }
  // return null
}

export {UserEditModalFormWrapper}
const getByIdData: any = {}
