import {useEffect, useState} from 'react'
import {roleColumns} from './_columns'
import {UsersTable} from '../table/UsersTable'
import {useQuery} from 'react-query'
import {getUserById} from '../core/_requests'
import {KTCard} from '../../../../../../_metronic/helpers'
import {QueryRequestProvider} from '../core/QueryRequestProvider'
import {QueryResponseProvider, useQueryResponse} from '../core/QueryResponseProvider'
import {UsersListHeader} from '../components/header/UsersListHeader'
import {UserEditModal} from '../form-edit-modal/CoomonEditModal'
import {Card4} from '../../../../../../_metronic/partials/content/cards/Card4'
import {ListViewProvider, useListView} from '../core/ListViewProvider'
import {useQueryRequest} from '../core/QueryRequestProvider'
import {initialQueryState} from '../../../../../../_metronic/helpers'
const UsersList = () => {
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
        initialApi: `categories/${dropdownData[0].value}/items`,
        ...initialQueryState,
      })
    }
  }, [data])

  const searchElements = [
    {
      type: 'select',
      value: 'select',
      options: categoriesList,
    },
  ]

  return (
    <KTCard>
      <UsersListHeader
        searchElements={searchElements}
        placeholder='Search Category'
        label='Add New'
      />
      <UsersTable columnProps={roleColumns} />
      <UserEditModal arrayDropdown={categoriesList} formName='SubCategoryModalForm' />
    </KTCard>
  )
}

const SubCategoryWrapper = () => (
  <QueryRequestProvider initialValue={{enabled: false}}>
    <QueryResponseProvider>
      <ListViewProvider>
        <UsersList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {SubCategoryWrapper}
