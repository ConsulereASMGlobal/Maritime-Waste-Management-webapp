import {Column} from 'react-table'
import {columnGenerators} from '../../../../../../_metronic/helpers'

const header = [
  {
    label: 'S.N',
    value: 'id',
  },
  {
    label: 'Order Id',
    value: 'id',
  },
  {
    label: 'Created On',
    value: 'createdAt',
  },
  {
    label: 'Delivery Date',
    value: 'pickupDate',
  },
  {
    label: 'Aggregator',
    value: 'pickupInfo[name]',
  },
  {
    label: 'Address',
    value: 'pickup_address',
  },
  {
    label: 'Category',
    value: 'categoryName',
  },
  {
    label: 'Type',
    value: 'pickup_quantity_item',
  },
  {
    label: 'Icon',
    value: 'categoryIcon',
  },
  {
    label: 'Quantity (KG)',
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

  {
    label: 'certificate_view',
  },
  {
    action: ['qr'],
  },
]

const roleColumns: ReadonlyArray<Column<any>> = columnGenerators(header)

export {roleColumns}
