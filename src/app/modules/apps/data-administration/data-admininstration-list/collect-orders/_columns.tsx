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
    label: 'Collection Point',
    value: 'centreInfo[name]',
  },
  {
    label: 'Category Name',
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
    label: 'Depositer',
    value: 'customerInfo[name]',
  },
  {
    label: 'Mobile Number',
    value: 'customerInfo[mobile]',
  },
  {
    action: ['view', 'id', 'certificate', 'qr'],
  },
]

const roleColumns: ReadonlyArray<Column<any>> = columnGenerators(header)

export {roleColumns}
