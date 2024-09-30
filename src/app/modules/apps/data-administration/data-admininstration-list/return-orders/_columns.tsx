import {Column} from 'react-table'
import {columnGenerators} from '../../../../../../_metronic/helpers'

const header = [
  {
    label: 'S.N',
    value: 'id',
  },
  {
    label: 'TXN ID',
    value: 'id',
  },
  {
    label: 'Date',
    value: 'createdAt',
  },
  {
    label: 'Name',
    value: 'pickupInfo[name]',
  },
  {
    label: 'Vessel No',
    value: 'pickupInfo[agentMobile]',
  },
  /*  {
    label: 'Address',
    value: 'pickup_address',
  }, */
  {
    label: 'Category',
    value: 'categoryName',
  },
  {
    label: 'SKU',
    value: 'pickup_quantity_item',
  },
  /*   {
    label: 'Custody',
    value: 'categoryIcon',
  }, */
  {
    label: 'Quantity',
    value: 'pickup_quantity',
  },
  {
    label: 'Recycler',
    value: 'pickupInfo[centreName]',
  },
  {
    label: 'Status',
    value: 'status',
  },

  // {
  //   label: 'certificate_view',
  // },
  {
    // action: ['qr'],
    action: ['view', 'id', 'qr'],
  },
]

const roleColumns: ReadonlyArray<Column<any>> = columnGenerators(header)

export {roleColumns}
