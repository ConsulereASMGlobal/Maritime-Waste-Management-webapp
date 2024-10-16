/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import { useIntl } from 'react-intl'
import { KTIcon } from '../../../../helpers'
import { SidebarMenuItemWithSub } from './SidebarMenuItemWithSub'
import { SidebarMenuItem } from './SidebarMenuItem'
import { useAuth } from '../../../../../app/modules/auth'

const SidebarMenuMain = () => {
  const intl = useIntl()
  const { auth } = useAuth()
  const hideSideBar = auth?.data?.userType === 'FRANCHISE' || false

  return (
    <>
      <SidebarMenuItem
        to='/dashboard'
        icon='element-11'
        title={intl.formatMessage({ id: 'MENU.DASHBOARD' })}
        fontIcon='bi-app-indicator'
      />
      <SidebarMenuItem to='/apps/stock' icon='parcel' title='Lifecycle' fontIcon='bi-layers' />
      <SidebarMenuItem
        to='/apps/mass-balance'
        icon='parcel'
        title='Mass Balance'
        fontIcon='bi-layers'
      />

      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Apps</span>
        </div>
      </div>

      {!hideSideBar && (
        <SidebarMenuItem
          to='/apps/facility-master'
          icon='grid-frame'
          title='Shipping Company'
          fontIcon='bi-layers'
        />
      )}
      <SidebarMenuItem
        to='/apps/depositer'
        icon='switch'
        title='Material Supplier'
        fontIcon='bi-layers'
      />
      <SidebarMenuItem
        to='/apps/collection-point'
        icon='row-horizontal'
        title='Vessel'
        fontIcon='bi-layers'
      />
      <SidebarMenuItem
        to='/apps/recycler'
        icon='abstract-28'
        title='Waste Mgmt Co'
        fontIcon='bi-layers'
      />
      {/* <SidebarMenuItem to='/apps/rider' icon='abstract-28' title='Rider' fontIcon='bi-layers' /> */}
      <SidebarMenuItem
        to='/apps/collect-orders'
        icon='element-11'
        title='Material In'
        fontIcon='bi-layers'
      />
      <SidebarMenuItem
        to='/apps/processing-record'
        icon='element-11'
        title='Consumption'
        fontIcon='bi-layers'
      />
      <SidebarMenuItem
        to='/apps/supply-orders'
        icon='maximize'
        title='Material Out'
        fontIcon='bi-layers'
      />
      {!hideSideBar && (
        <SidebarMenuItemWithSub
          to='/apps/settings'
          title='Settings'
          fontIcon='bi-chat-left'
          icon='message-text-2'
        >
          <SidebarMenuItem to='/apps/settings/content' title='Content' hasBullet={true} />
          <SidebarMenuItem to='/apps/settings/category' title='Category' hasBullet={true} />
          <SidebarMenuItem to='/apps/settings/sub-category' title='Item' hasBullet={true} />
          <SidebarMenuItem to='/apps/settings/pricing' title='Pricing' hasBullet={true} />
          <SidebarMenuItem to='/apps/settings/incentive' title='Hide' hasBullet={true} />
          <SidebarMenuItem
            to='/apps/settings/processing-routes'
            title='Consumption'
            hasBullet={true}
          />
          <SidebarMenuItem to='/apps/settings/badges' title='Badges' hasBullet={true} />
        </SidebarMenuItemWithSub>
      )}
      {/* <div className='menu-item'>
        <a
          target='_blank'
          className='menu-link'
          href={process.env.REACT_APP_PREVIEW_DOCS_URL + '/docs/changelog'}
        >
          <span className='menu-icon'>
            <KTIcon iconName='code' className='fs-2' />
          </span>
          <span className='menu-title'>Changelog {process.env.REACT_APP_VERSION}</span>
        </a>
      </div> */}
    </>
  )
}

export { SidebarMenuMain }
