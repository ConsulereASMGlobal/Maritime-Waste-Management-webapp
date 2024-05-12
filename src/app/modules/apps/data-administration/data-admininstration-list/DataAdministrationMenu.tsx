import {ListViewProvider, useListView} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {UsersListHeader} from './components/header/UsersListHeader'
import {UsersTable} from './table/UsersTable'
import {UserEditModal} from './form-edit-modal/CoomonEditModal'
import {KTCard} from '../../../../../_metronic/helpers'
import {Card4} from '../../../../../_metronic/partials/content/cards/Card4'
import {Link} from 'react-router-dom'
import clsx from 'clsx'

const features = [
  {name: 'Drop off point Name', to: 'rider'},
  {name: 'Drop off point Name', to: 'raw-material-type'},
  {name: 'Drop off point Name', to: 'process-ads'},
  {name: 'Drop off point Name', to: 'finished-goods-type'},
  {name: 'Drop off point Name', to: 'consumables'},
  {name: 'Drop off point Name', to: 'quality-remarks'},
  {name: 'Drop off point Name', to: 'downtime'},
  {name: 'Drop off point Name', to: 'shift'},
  {name: 'Drop off point Name', to: 'recycler-code'},
  /*  {name: 'Brand', icon: 'brand', to: 'brand'},
  {name: 'Delivery Terms', icon: 'delivery-terms', to: 'delivery-terms'},
  {name: 'UOM', icon: 'Unit-of-measurement', to: 'depositer'},
  {name: 'Role Master', icon: 'Role-Maser', to: 'role-master'},
  {name: 'User', icon: 'User-approval', to: 'user-approval'}, */
]

const Menu = () => {
  return (
    <KTCard>
      <div className='row g-xl-4 '>
        {features.map((eachFeatures: any, eachIndex) => (
          <div key={eachIndex + 1 + ''} className='col col-lg-4'>
            <Link
              className={clsx('menu-link without-sub')}
              to={eachFeatures?.icon ? eachFeatures.to : '#'}
              
            >
              <Card4
                // icon={`/media/svg/files/${eachFeatures.icon}.png`}
                icon={eachFeatures?.icon ? `/media/svg/files/${eachFeatures?.icon}.png` : ''}
                title={eachFeatures.name}
                description=''
              />
            </Link>
          </div>
        ))}
      </div>
    </KTCard>
  )
}

const DataAdmininstrationMenu = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <Menu />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {DataAdmininstrationMenu}
