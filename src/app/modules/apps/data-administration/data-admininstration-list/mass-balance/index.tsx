/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {useQuery} from 'react-query'
import {PageTitle} from '../../../../../../_metronic/layout/core'
import {StatisticsWidget5} from '../../../../../../_metronic/partials/widgets'
import {getUserById} from '../core/_requests'

const DashboardPage: FC = () => {
  const {data = {}} = useQuery(`admin/dashboard`, () => getUserById('', 'admin/dashboard'), {
    cacheTime: 0,
    onError: (err) => {
      console.warn(err)
    },
  })
  const {data: analyticsData = {}} = useQuery(
    `admin/pickupPoints/analytics`,
    () => getUserById('', 'admin/pickupPoints/analytics'),
    {
      cacheTime: 0,
      onError: (err) => {
        console.warn(err)
      },
    }
  )

  const {data: cleanUpData = {}} = useQuery(
    `collect/orders?page=1&size=10`,
    () => getUserById('', 'collect/orders?page=1&size=10'),
    {
      cacheTime: 0,
      onError: (err) => {
        console.warn(err)
      },
    }
  )

  const {data: dispatchData = {}} = useQuery(
    `return/orders?page=1&size=10`,
    () => getUserById('', 'return/orders?page=1&size=10'),
    {
      cacheTime: 0,
      onError: (err) => {
        console.warn(err)
      },
    }
  )

  const [leaderBoardXaxisData, setleaderBoardXaxisData] = useState([])
  const [leaderBoardYaxisData, setleaderBoardYaxisData] = useState([])

  useEffect(() => {
    if (analyticsData.length) {
      const transformedData: any = []

      const properties = Object.keys(analyticsData[0]).filter(
        (key) =>
          key !== 'pickupPointId' && key !== 'pickupPointName' && key !== 'pickupPointAddress'
      )

      properties.forEach((property) => {
        const dataValues = analyticsData.map((obj) => parseFloat(obj[property].toFixed(2)))
        transformedData.push({
          name: property,
          data: dataValues,
        })
      })
      const collectionPointName = analyticsData.map((obj) => obj.pickupPointName)
      setleaderBoardXaxisData(collectionPointName)
      setleaderBoardYaxisData(transformedData)
    }
  }, [analyticsData])

  const [mapLocation, setMapLocation] = useState([])

  const {pickupPoints, collectTrend, suppliedTrend} = data

  useEffect(() => {
    if (pickupPoints) {
      const modifyData = pickupPoints.map((x) => {
        return {
          position: {
            lat: x.latitude,
            lng: x.longitude,
          },
          name: x.name,
        }
      })
      setMapLocation(modifyData)
    }
  }, [pickupPoints])

  const mapDate = [
    `${new Date().getFullYear()}-01`,
    `${new Date().getFullYear()}-02`,
    `${new Date().getFullYear()}-03`,
    `${new Date().getFullYear()}-04`,
    `${new Date().getFullYear()}-05`,
    `${new Date().getFullYear()}-06`,
    `${new Date().getFullYear()}-07`,
    `${new Date().getFullYear()}-08`,
    `${new Date().getFullYear()}-09`,
    `${new Date().getFullYear()}-10`,
    `${new Date().getFullYear()}-11`,
    `${new Date().getFullYear()}-12`,
  ]
  const [collectedGraphData, setCollectedGraphData] = useState<any>({})
  const [suppliedGraphData, setSuppliedGraphData] = useState<any>({})

  const updateGraphData = (trendData, setGraphData, graphData) => {
    if (trendData && Object.keys(trendData)?.length > 0) {
      const test = mapDate.map(
        (x) => (trendData[x] && (trendData?.[x] / 1000)?.toFixed(2)) || '0.00'
      )
      setGraphData({...graphData, monthValue: test})
    }
  }

  useEffect(() => {
    updateGraphData(collectTrend, setCollectedGraphData, collectedGraphData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectTrend])

  useEffect(() => {
    updateGraphData(suppliedTrend, setSuppliedGraphData, suppliedGraphData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suppliedTrend])

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

  return (
    <>
      <div className='row g-xl-4' style={{marginBottom: '20px'}}>
        <div className='font-bold text-lg'>Collected</div>
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
      <DashboardPage />
    </>
  )
}

export {MassBalanceWrapper}
