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
    label: 'Date',
    value: 'createdAt',
  },
  {
    label: 'Aggregator',
    value: 'centreInfo[name]',
  },
  {
    label: 'Plastic',
    value: 'categoryName',
  },
  {
    label: 'Icon',
    value: 'categoryIcon',
  },
  {
    label: 'Quantity',
    value: 'quantityDeposit',
  },
  /* {
    label: 'Payment Mode',
    value: 'paymentMode',
  }, */
  {
    label: 'Collection Agent',
    value: 'customerInfo[name]',
  },
  {
    label: 'Contact',
    value: 'customerInfo[mobile]',
  },
  {
    label: 'Amount',
    value: 'totalAmount',
  },
  {
    label: 'Mode',
    value: 'paymentMode',
  },
  {
    label: 'Status',
    value: 'status',
  },
  {
    action: ['view', 'id', 'certificate', 'qr'],
  },
]

const roleColumns: ReadonlyArray<Column<any>> = columnGenerators(header)

export {roleColumns}
