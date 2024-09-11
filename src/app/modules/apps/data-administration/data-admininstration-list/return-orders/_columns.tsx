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
    label: 'Created On',
    value: 'createdAt',
  },
  {
    label: 'Shipping Co',
    value: 'pickupDate',
  },
  {
    label: 'Vessel No',
    value: 'pickupInfo[name]',
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
    label: 'Type',
    value: 'pickup_quantity_item',
  },
  {
    label: 'Custody',
    value: 'categoryIcon',
  },
  {
    label: 'Quantity',
    value: 'pickup_quantity',
  },
  {
    label: 'Recycler',
    value: 'centreInfo[name]',
  },
  {
    label: 'Delivered On',
    value: 'pickupDate',
  },
  {
    label: 'Status',
    value: 'status',
  },

  // {
  //   label: 'certificate_view',
  // },
  {
    action: ['qr'],
  },
]

const roleColumns: ReadonlyArray<Column<any>> = columnGenerators(header)

export {roleColumns}
