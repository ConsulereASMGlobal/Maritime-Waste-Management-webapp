import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {DataAdmininstrationMenu} from './data-admininstration-list/DataAdministrationMenu'
import {RolesListWrapper} from './data-admininstration-list/rider/riderList'
import {UserApprovalWrapper} from './data-admininstration-list/user-approval/UserApprovalList'
import {ReturnOrdersWrapper} from './data-admininstration-list/return-orders/returnOrderrsList'
import {CollectOrdersWrapper} from './data-admininstration-list/collect-orders/collectOrdersList'
import {ContentWrapper} from './data-admininstration-list/content/contentWrapperList'
import {CategoryWrapper} from './data-admininstration-list/category/categoryList'
import {SubCategoryWrapper} from './data-admininstration-list/sub-category-wrapper/subCategoryList'
import {PricingWrapper} from './data-admininstration-list/pricing/pricingList'
import {DownTimeWrapper} from './data-admininstration-list/down-time/downTimeList'
import {ShellGasStationWrapper} from './data-admininstration-list/shell-gas-station/shiftList'
import {CustomerCodeWrapper} from './data-admininstration-list/customer-code/customerCodeList'
import {BrandWrapper} from './data-admininstration-list/brand/brandList'
import {DeliveryWrapper} from './data-admininstration-list/delivery-terms/deliveryTermsList'
import {UserManagementWrapper} from './data-admininstration-list/user-management/userManagementList'
import {FacilityMasterWrapper} from './data-admininstration-list/facility-master/facilityMasterList'
import {ProcessingRecordList} from './data-admininstration-list/processing-record/processingRecodList'
import {ProcessingRoutesWrapper} from './data-admininstration-list/processing-routes/processingRouteList'
import {CustomerListWrapper} from './data-admininstration-list/customer/customerList'
import {MassBalanceWrapper} from './data-admininstration-list/mass-balance'
import {StockWrapper} from './data-admininstration-list/stock/sstockList'
import {IncentiveList} from './data-admininstration-list/incentive/incentiveList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Dashboard',
    path: '/dashboard',
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
        {/* <Route index element={<DataAdmininstrationMenu />} /> */}
        <Route
          path='stock'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Lifecycle</PageTitle>
              {/* <DataAdmininstrationMenu /> */}
              <StockWrapper />
            </>
          }
        />
        <Route
          path='mass-balance'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Mass Balance</PageTitle>
              {/* <DataAdmininstrationMenu /> */}
              <MassBalanceWrapper />
            </>
          }
        />
        <Route
          path='recycler'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Recycler</PageTitle>
              <CustomerListWrapper />
            </>
          }
        />
        <Route
          path='depositer'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Depositer</PageTitle>
              <UserManagementWrapper />
            </>
          }
        />
        <Route
          path='rider'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Riders</PageTitle>
              <RolesListWrapper />
            </>
          }
        />
        <Route
          path='facility-master'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Franchise </PageTitle>
              <FacilityMasterWrapper />
            </>
          }
        />
        <Route
          path='collection-point'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Aggregator</PageTitle>
              <ShellGasStationWrapper />
            </>
          }
        />
        <Route
          path='settings/processing-routes'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Processing Routes</PageTitle>
              <ProcessingRoutesWrapper />
            </>
          }
        />
        <Route
          path='processing-record'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Processing Record</PageTitle>
              <ProcessingRecordList />
            </>
          }
        />
        processing-record
        <Route
          path='supply-orders'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Supply Orders</PageTitle>
              <ReturnOrdersWrapper />
            </>
          }
        />
        <Route
          path='collect-orders'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Collect Orders</PageTitle>
              <CollectOrdersWrapper />
            </>
          }
        />
        <Route
          path='settings/content'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Content</PageTitle>
              <ContentWrapper />
            </>
          }
        />
        <Route
          path='settings/category'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Category</PageTitle>
              <CategoryWrapper />
            </>
          }
        />
        <Route
          path='settings/sub-category'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Sub Category</PageTitle>
              <SubCategoryWrapper />
            </>
          }
        />
        <Route
          path='settings/pricing'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Pricing</PageTitle>
              <PricingWrapper />
            </>
          }
        />
        <Route
          path='settings/incentive'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Incentive</PageTitle>
              <IncentiveList />
            </>
          }
        />
      </Route>
    </Routes>
  )
}

export default UsersPage
