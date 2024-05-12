import {useQuery} from 'react-query'
// import {UserEditModalForm} from './UserEditModalForm'
// import {RemarksEditModalForm} from './remarksModalForm'
// import {DownTimeModalForm} from './downTimeModalForm'
import {isNotEmpty, QUERIES} from '../../../../../../_metronic/helpers'
import {useListView} from '../core/ListViewProvider'
import {getUserById} from '../core/_requests'
import {Suspense, useState, useEffect} from 'react'
import {UsersListLoading} from '../components/loading/UsersListLoading'
import CertificateComponent from './CertificateComponent'

const UserEditModalFormWrapper = ({
  showViewPage = false,
  formName = 'UserEditModalForm',
  getByIdApi = '',
  passRef,
  arrayDropdown = [],
}) => {
  const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const enabledQuery = typeof itemIdForUpdate === 'object' ? false : isNotEmpty(itemIdForUpdate)
  const {
    isLoading,
    data: user,
    error,
  } = useQuery(
    `${QUERIES.USERS_LIST}-user-${itemIdForUpdate}`,
    () => getUserById(itemIdForUpdate, getByIdApi),
    {
      cacheTime: 0,
      enabled: enabledQuery,
      onError: (err) => {
        setItemIdForUpdate(undefined)
        console.error(err)
      },
    }
  )
  const [DynamicComponent, setDynamicComponent] = useState<any>(null)

  useEffect(() => {
    async function fetchDynamicComponent() {
      const component = await import(`./${formName}`)
      setDynamicComponent(component)
    }

    if (!showViewPage && formName) {
      fetchDynamicComponent()
    }
  }, [!showViewPage && formName])

  if (showViewPage) return <CertificateComponent passRef={passRef} data={user} />

  if (!DynamicComponent) {
    return null
  }

  const fallbackComponent = <div>Loading...</div>

  if (!itemIdForUpdate) {
    const EmptyUserComponent = DynamicComponent.default
    return (
      <Suspense fallback={fallbackComponent}>
        <EmptyUserComponent
          passRef={passRef}
          user={{id: undefined}}
          isUserLoading={isLoading}
          arrayDropdown={arrayDropdown}
        />
      </Suspense>
    )
  }
  if (!isLoading && !error && (user || !enabledQuery)) {
    const FilledUserComponent = DynamicComponent.default
    return (
      <Suspense fallback={fallbackComponent}>
        <FilledUserComponent
          passRef={passRef}
          isUserLoading={isLoading}
          arrayDropdown={arrayDropdown}
          user={{...user, ...itemIdForUpdate}}
        />
      </Suspense>
    )
  }
  if (isLoading) {
    return <UsersListLoading text='Loading' />
  }
  return null
}

export {UserEditModalFormWrapper}
