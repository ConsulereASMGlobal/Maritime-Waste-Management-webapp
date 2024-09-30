/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import {
  ChartsWidget1,
  ChartsWidget2,
  StatisticsWidget5,
  TablesWidget10,
  TablesWidget13,
} from '../../../_metronic/partials/widgets'
import MapComponent from '../../modules/apps/data-administration/data-admininstration-list/Map'
import {useQuery} from 'react-query'
import {getUserById} from '../../modules/apps/data-administration/data-admininstration-list/core/_requests'

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

  const {pickupPoints, collectTrend, suppliedTrend, productionTrend} = data

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
  const [processedGraphData, setProcessedGraphData] = useState<any>({})

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
  useEffect(() => {
    updateGraphData(processedGraphData, setProcessedGraphData, processedGraphData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productionTrend])

  const numberItems = [
    {value: 'collected', name: 'Items Loaded', icon: 'itemLoaded', color: '#ffff'},
    {value: 'processed', name: 'Consumed', icon: 'consumed', color: '#ffff'},
    {value: 'supplied', name: 'Waste Disposed', icon: 'wasteDisposed', color: '#ffff'},
    {value: 'stock', name: 'Stock', icon: 'stockMaritime', color: '#ffff'},
    {
      value: 'collectionPoints',
      name: 'Shipping Vessels',
      icon: 'shippingVessels',
      color: '#ffff',
    },
    {
      value: 'wasteDiverters',
      name: 'Waste Management Co.',
      icon: 'wasteManagement',
      color: '#ffff',
    },
    {value: 'lifeImpacted', name: 'Material Suppliers', icon: 'materialSupplier', color: '#ffff'},
    {
      value: 'co2Footprint',
      name: 'CO2 footprint avoided*',
      icon: 'co2saving',
      color: '#ffff',
    },
  ]

  return (
    <>
      <div className='row g-xl-4' style={{marginBottom: '20px'}}>
        {numberItems.map((eachitems, eachIndex) => (
          <div key={eachIndex + 1 + ''} className='col-xl-3'>
            <StatisticsWidget5
              className='card-xl-stretch mb-xl-8'
              // svgIcon={`/media/svg/dashboard/co2.png`}
              img={eachitems.icon}
              color={eachitems.color || 'warning'}
              iconColor='primary'
              // title={eachitems.value}
              title={`
             ${
               data[eachitems.value]?.toFixed(['co2Footprint'].includes(eachitems.value) ? 2 : 0) ||
               ''
             }
             ${
               ['collected', 'processed', 'supplied', 'stock'].includes(eachitems.value)
                 ? 'No'
                 : ['collectionPoints', 'wasteDiverters', 'lifeImpacted'].includes(eachitems.value)
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
        {/* {numberItems.map((eachitems, eachIndex) => (
          <div key={eachIndex + 1 + ''} className='bgi-no-repeat col col-lg-3'>
            <div
              className='d-flex align-items-center rounded p-7 mb-1'
              style={{
                backgroundColor: eachitems.color,
              }}
            >
              <span className=' text-success me-5'>
                <img
                  src={`/media/svg/dashboard/${eachitems.icon}.png`}
                  alt=''
                  width={50}
                  height={50}
                />
              </span>
              <div className='flex-grow-1 me-2 text-white'>
                {eachitems.name}
                <span style={{fontSize: '22px'}} className='text-white fw-semibold d-block'>
                  {data[eachitems.value]?.toFixed(
                    ['collectionPoints', 'wasteDiverters', 'lifeImpacted'].includes(eachitems.value)
                      ? 0
                      : 2
                  ) || ''}{' '}
                  {['collectionPoints', 'wasteDiverters', 'lifeImpacted'].includes(eachitems.value)
                    ? ''
                    : ' kg'}
                </span>
              </div>
            </div>
          </div>
        ))} */}
      </div>
      {(mapLocation.length && (
        <div>
          <MapComponent data={mapLocation || []} />
        </div>
      )) ||
        null}

      <TablesWidget10 data={cleanUpData} className='mb-5 mb-xl-8' />

      <br />
      <TablesWidget13 data={dispatchData} className='mb-5 mb-xl-8' />

      <div className='row g-2 g-xl-8'>
        <div>
          <ChartsWidget2
            className='card-xl-stretch mb-xl-8 mt-8'
            x_axis={leaderBoardXaxisData}
            y_axis={leaderBoardYaxisData}
          />
        </div>
        <div className=''>
          <ChartsWidget1
            data={collectedGraphData?.monthValue}
            title='Monthly Trend - Collected (Tons)'
            className='card-xl-stretch mb-xl-8'
            // subTitle='Highest daily avg Fisherman collector'
          />
        </div>
        <div className=''>
          <ChartsWidget1
            data={collectedGraphData?.monthValue}
            title='Monthly Trend - Processed (Tons)'
            className='card-xl-stretch mb-xl-8'
            // subTitle='Highest daily avg community collector'
          />
        </div>
      </div>
      <div className=''>
        <ChartsWidget1
          data={suppliedGraphData?.monthValue}
          title='Monthly Trend - Supplied (Tons)'
          className='card-xl-stretch mb-xl-8'
          // subTitle='Highest daily avg community collector'
        />
      </div>
    </>
  )
}

const DashboardWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <DashboardPage />
    </>
  )
}

export {DashboardWrapper}
