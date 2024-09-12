import {Column} from 'react-table'
import {columnGenerators} from '../../../../../../_metronic/helpers'

const header = [
  {
    label: 'S.N',
    value: 'id',
  },
  {
    label: 'Txn Id',
    value: 'id',
  },
  {
    label: 'Date',
    value: 'createdAt',
  },
  {
    label: 'Vessel No',
    value: 'pickupInfo[name]',
  },
  {
    label: 'Captain',
    value: 'centreInfo[name]',
  },
  {
    label: 'Material',
    value: 'categoryName',
  },
  // {
  //   label: 'Icon',
  //   value: 'categoryIcon',
  // },

  {
    label: 'Quantity',
    value: 'quantityDeposit',
  },
  /* {
    label: 'Payment Mode',
    value: 'paymentMode',
  }, */
  {
    label: 'Supplier',
    value: 'customerInfo[name]',
  },
  {
    label: 'Custody',
    value: 'images',
  },
  {
    label: 'Supplier',
    value: 'totalAmount',
  },
  /*  {
    label: 'Mode',
    value: 'paymentMode',
  }, */
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
