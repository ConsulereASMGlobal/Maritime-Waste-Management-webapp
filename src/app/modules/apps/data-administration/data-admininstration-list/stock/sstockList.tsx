import {ListViewProvider, useListView} from '../core/ListViewProvider'
import {QueryRequestProvider} from '../core/QueryRequestProvider'
import {QueryResponseProvider, useQueryResponseData} from '../core/QueryResponseProvider'
import {UsersListHeader} from '../components/header/UsersListHeader'
import {UsersTable} from '../table/UsersTable'
import {UserEditModal} from '../form-edit-modal/CoomonEditModal'
import {KTCard, allCategory} from '../../../../../../_metronic/helpers'
import {roleColumns} from './_columns'
import {initialQueryState} from '../../../../../../_metronic/helpers'
import {useEffect, useMemo, useState} from 'react'
import {useQuery} from 'react-query'
import {getUserById} from '../core/_requests'
import {useQueryRequest} from '../core/QueryRequestProvider'
import {MixedWidget1} from '../../../../../../_metronic/partials/widgets'

const QualityList = () => {
  const {data} = useQuery(
    `clients/101212/categories`,
    () => getUserById('', 'clients/101212/categories'),
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
        return dropdownData.push({label: eachData.name, value: eachData.id})
      })
      setCategoriesList(dropdownData)
      updateState({
        enabled: true,
        // initialApi: `categories/${dropdownData[0].value}/price`,
        initialApi: `admin/pickupPoints/analytics`,
        ...initialQueryState,
      })
    }
  }, [data])

  const searchElements = [
    {
      type: 'select',
      queryType: 'price',
      value: 'select',
      options: categoriesList,
    },
  ]
  const users = useQueryResponseData()
  const test = useMemo(() => users, [users])
  console.log({test})

  const configColor_one = [
    '#1034A6',
    '#E89611',
    '#156467',
    '#1034A6',
    '#156467',
    '#1034A6',
    '#E89611',
    '#156467',
  ]
  return (
    <>
      {/* <UsersListHeader searchElements={searchElements} placeholder='Search' /> */}
      {/* <UsersTable columnProps={roleColumns} /> */}
      <div className='row g-5 g-xl-8'>
        {/* begin::Col */}
        {test.map((eachTest, eachIndex) => (
          <div className='col-xl-3' key={eachIndex + 1 + ''}>
            <MixedWidget1
              className='card-xl-stretch mb-xl-8'
              color='primary'
              data={eachTest}
              bg_color={configColor_one[eachIndex % configColor_one.length]}
            />
          </div>
        ))}
      </div>
      {/* {<UserEditModal formName='PricingModalForm' />} */}
    </>
  )
}

const StockWrapper = () => (
  // <QueryRequestProvider initialValue={{enabled: false}}>
  <QueryRequestProvider initialValue={{initialApi: 'admin/pickupPoints/analytics'}}>
    <QueryResponseProvider>
      <ListViewProvider>
        <QualityList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {StockWrapper}
