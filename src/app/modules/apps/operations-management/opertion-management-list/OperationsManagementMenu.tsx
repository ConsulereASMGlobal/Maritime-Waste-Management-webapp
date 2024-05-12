import {ListViewProvider, useListView} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {UsersListHeader} from './components/header/UsersListHeader'
import {UsersTable} from './table/UsersTable'
import {UserEditModal} from './form-edit-modal/UserEditModal'
import {KTCard, KTIcon, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {Card4} from '../../../../../_metronic/partials/content/cards/Card4'
import {Link} from 'react-router-dom'
import clsx from 'clsx'
import {useRef} from 'react'
import {Form, Formik, FormikValues} from 'formik'
import {pdfColumns} from './collection-order-management/_pdfColumns'
const features = [
  {name: 'Collection', icon: 'collection-management', to: 'collection-management'},
  {name: 'Production', icon: 'Production-management', to: 'production-management'},
  {name: 'Dispatch', icon: 'dispatch-management', to: 'dispatch-management'},
]

const Menu = () => {
  return (
    <>
      <KTCard>
        <div className='row g-xl-6'>
          {/* {features.map((eachFeatures, eachIndex) => (
            <div key={eachIndex + 1 + ''} className='col col-lg-2'>
              <Link className={clsx('menu-link without-sub')} to={eachFeatures.to}>
                <Card4
                  icon={`/media/svg/files/${eachFeatures.icon}.png`}
                  title={eachFeatures.name}
                  description=''
                />
              </Link>
            </div>
          ))} */}
        </div>
      </KTCard>
    </>
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
