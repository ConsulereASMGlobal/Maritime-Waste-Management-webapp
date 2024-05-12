import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {DataAdmininstrationMenu} from './opertion-management-list/OperationsManagementMenu'
import {ProductionManagementWrapper} from './opertion-management-list/production-management/productionManagementList'
import {CollectionOrderManagementWrapper} from './opertion-management-list/collection-order-management/CollectionOrderManagement'
import {DispatchListWrapper} from './opertion-management-list/dispatch/dispatchList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Operations',
    path: '/apps/order-management',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const UsersPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route index element={<DataAdmininstrationMenu />} />
        <Route
          path='collection-management'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Collection</PageTitle>
              <CollectionOrderManagementWrapper />
            </>
          }
        />
        <Route
          path='production-management'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Production</PageTitle>
              <ProductionManagementWrapper />
            </>
          }
        />
        <Route
          path='dispatch-management'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Dispatch</PageTitle>
              <DispatchListWrapper />
            </>
          }
        />
      </Route>
    </Routes>
  )
}

export default UsersPage
