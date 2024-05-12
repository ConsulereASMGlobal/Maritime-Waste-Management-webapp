/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl'
import {KTIcon} from '../../../../helpers'
import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import {SidebarMenuItem} from './SidebarMenuItem'

const SidebarMenuMain = () => {
  const intl = useIntl()

  return (
    <>
      <SidebarMenuItem
        to='/dashboard'
        icon='element-11'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-app-indicator'
      />
      <SidebarMenuItem to='/apps/stock' icon='parcel' title='Leaderboard' fontIcon='bi-layers' />

      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Apps</span>
        </div>
      </div>

      <SidebarMenuItem
        to='/apps/facility-master'
        icon='grid-frame'
        title='Franchise '
        fontIcon='bi-layers'
      />
      <SidebarMenuItem to='/apps/depositer' icon='switch' title='Depositor' fontIcon='bi-layers' />
      <SidebarMenuItem
        to='/apps/collection-point'
        icon='row-horizontal'
        title='Collection Point'
        fontIcon='bi-layers'
      />
      <SidebarMenuItem
        to='/apps/recycler'
        icon='abstract-28'
        title='Recycler'
        fontIcon='bi-layers'
      />
      <SidebarMenuItem to='/apps/rider' icon='abstract-28' title='Rider' fontIcon='bi-layers' />
      <SidebarMenuItem
        to='/apps/collect-orders'
        icon='element-11'
        title='Collect Orders'
        fontIcon='bi-layers'
      />
      <SidebarMenuItem
        to='/apps/processing-record'
        icon='element-11'
        title='Processing Record'
        fontIcon='bi-layers'
      />
      <SidebarMenuItem
        to='/apps/supply-orders'
        icon='maximize'
        title='Supply Orders'
        fontIcon='bi-layers'
      />
      <SidebarMenuItemWithSub
        to='/apps/settings'
        title='Settings'
        fontIcon='bi-chat-left'
        icon='message-text-2'
      >
        <SidebarMenuItem to='/apps/settings/content' title='Content' hasBullet={true} />
        <SidebarMenuItem to='/apps/settings/category' title='Category' hasBullet={true} />
        <SidebarMenuItem to='/apps/settings/sub-category' title='Sub Category' hasBullet={true} />
        <SidebarMenuItem to='/apps/settings/pricing' title='Pricing' hasBullet={true} />
        <SidebarMenuItem
          to='/apps/settings/processing-routes'
          title='Processing Routes'
          hasBullet={true}
        />
      </SidebarMenuItemWithSub>
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

export {SidebarMenuMain}
