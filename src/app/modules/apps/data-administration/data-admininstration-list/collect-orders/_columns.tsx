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
    label: 'Plastic Type',
    value: 'categoryName',
  },
  {
    label: 'Icon',
    value: 'categoryIcon',
  },
  {
    label: 'Quantity (kg)',
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
    label: 'Mobile Number',
    value: 'customerInfo[mobile]',
  },
  {
    label: 'Amount Paid',
    value: 'customerInfo[name]',
  },
  {
    action: ['view', 'id', 'certificate', 'qr'],
  },
]

const roleColumns: ReadonlyArray<Column<any>> = columnGenerators(header)

export {roleColumns}
