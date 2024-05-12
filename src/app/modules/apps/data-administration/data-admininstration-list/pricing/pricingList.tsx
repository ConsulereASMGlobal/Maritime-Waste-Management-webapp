import {ListViewProvider, useListView} from '../core/ListViewProvider'
import {QueryRequestProvider} from '../core/QueryRequestProvider'
import {QueryResponseProvider} from '../core/QueryResponseProvider'
import {UsersListHeader} from '../components/header/UsersListHeader'
import {UsersTable} from '../table/UsersTable'
import {UserEditModal} from '../form-edit-modal/CoomonEditModal'
import {KTCard, allCategory} from '../../../../../../_metronic/helpers'
import {roleColumns} from './_columns'
import {initialQueryState} from '../../../../../../_metronic/helpers'
import {useEffect, useState} from 'react'
import {useQuery} from 'react-query'
import {getUserById} from '../core/_requests'
import {useQueryRequest} from '../core/QueryRequestProvider'

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
        initialApi: `categories/${dropdownData[0].value}/price`,
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

  return (
    <KTCard>
      <UsersListHeader searchElements={searchElements} label='Add New' placeholder='Search' />
      <UsersTable columnProps={roleColumns} />
      {<UserEditModal formName='PricingModalForm' />}
    </KTCard>
  )
}

const PricingWrapper = () => (
  <QueryRequestProvider initialValue={{enabled: false}}>
    <QueryResponseProvider>
      <ListViewProvider>
        <QualityList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {PricingWrapper}
