/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {useQuery} from 'react-query'
import {PageTitle} from '../../../../../../_metronic/layout/core'
import {StatisticsWidget5} from '../../../../../../_metronic/partials/widgets'
import {getUserById} from '../core/_requests'
import {QueryRequestProvider, useQueryRequest} from '../core/QueryRequestProvider'
import {initialQueryState} from '../../../../../../_metronic/helpers'
import {UsersListHeader} from '../components/header/UsersListHeader'
import {QueryResponseProvider} from '../core/QueryResponseProvider'
import {ListViewProvider} from '../core/ListViewProvider'

const DashboardPage: FC = () => {
  const {data = {}} = useQuery(
    `aggregator`,
    () => getUserById('', 'users?page=1&size=10&type=PICKUP_POINT'),
    {
      cacheTime: 0,
      onError: (err) => {
        console.warn(err)
      },
    }
  )
  const {updateState} = useQueryRequest()

  const [categoriesList, setCategoriesList] = useState([{label: 'Select One', value: ''}])
  useEffect(() => {
    if (data && data.length) {
      let dropdownData: any = []
      data.map((eachData) => {
        return dropdownData.push({label: eachData?.personalDetails?.name, value: eachData.id})
      })
      setCategoriesList(dropdownData)
      updateState({
        enabled: true,
        initialApi: `stock?category=${dropdownData[0].value}`,
        ...initialQueryState,
      })
    }
  }, [data])

  const numberItems = [
    {value: 'collected', name: 'PET', icon: 'Collected', color: '#0F2F97'},
    {value: 'processed', name: 'PP', icon: 'Processed', color: '#1034A6'},
    {value: 'supplied', name: 'HDPE', icon: 'Supplied', color: '#405DB8'},
    {value: 'stock', name: 'LDPE', icon: 'Stock', color: '#5F77C3'},
    {
      value: 'collectionPoints',
      name: 'UBC',
      icon: 'Collection Point',
      color: '#5F77C3',
    },
  ]
  const searchElements = [
    {
      /*   type: 'select',
      value: 'select',
      options: categoriesList, */
      type: 'select',
      // value: 'select',
      options: categoriesList,
      name: 'status',
    },
  ]
  return (
    <>
      <div className='row g-xl-4'>
        <div className='font-bold text-lg'>Collected</div>
        <div>
          <UsersListHeader
            removePadding={true}
            searchElements={searchElements}
            placeholder='Search Brand'
            label=''
          />
        </div>
        {numberItems.map((eachitems, eachIndex) => (
          <div key={eachIndex + 1 + ''} className='col'>
            <StatisticsWidget5
              className='card-xl-stretch mb-xl-8'
              svgIcon={`/media/location/marker.png`}
              //   img={eachitems.icon}
              color={eachitems.color || 'warning'}
              iconColor='primary'
              // title={eachitems.value}
              title={`
             ${
               data[eachitems.value]?.toFixed(
                 ['collectionPoints', 'wasteDiverters', 'lifeImpacted'].includes(eachitems.value)
                   ? 0
                   : 2
               ) || ''
             }
             ${
               ['collectionPoints', 'wasteDiverters', 'lifeImpacted'].includes(eachitems.value)
                 ? ''
                 : ' kg'
             }
           `}
              // titleColor='primary'
              description={eachitems.name}
              // descriptionColor='primary'
            />
          </div>
        ))}
      </div>
      <div className='row g-xl-4' style={{marginBottom: '20px'}}>
        <div className='font-bold text-lg'>Supplied</div>
        {numberItems.map((eachitems, eachIndex) => (
          <div key={eachIndex + 1 + ''} className='col'>
            <StatisticsWidget5
              className='card-xl-stretch mb-xl-8'
              svgIcon={`/media/location/marker.png`}
              //   img={eachitems.icon}
              color={eachitems.color || 'warning'}
              iconColor='primary'
              // title={eachitems.value}
              title={`
             ${
               data[eachitems.value]?.toFixed(
                 ['collectionPoints', 'wasteDiverters', 'lifeImpacted'].includes(eachitems.value)
                   ? 0
                   : 2
               ) || ''
             }
             ${
               ['collectionPoints', 'wasteDiverters', 'lifeImpacted'].includes(eachitems.value)
                 ? ''
                 : ' kg'
             }
           `}
              // titleColor='primary'
              description={eachitems.name}
              // descriptionColor='primary'
            />
          </div>
        ))}
      </div>
    </>
  )
}

const MassBalanceWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>Mass Balance</PageTitle>
      {/* < */}
      <QueryRequestProvider initialValue={{enabled: false}}>
        <QueryResponseProvider>
          <ListViewProvider>
            <DashboardPage />
          </ListViewProvider>
        </QueryResponseProvider>
      </QueryRequestProvider>
      <DashboardPage />
    </>
  )
}

export {MassBalanceWrapper}
