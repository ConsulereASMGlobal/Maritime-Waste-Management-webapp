import {Column} from 'react-table'
import {columnGenerators} from '../../../../../../_metronic/helpers'

const header = [
  {label: 'S.N', value: 'id'},
  {
    label: 'Deal Name',
    value: 'name',
  },
  {
    label: 'Category',
    value: 'categoryName',
  },
  {
    label: 'Item',
    value: 'itemName',
  },
  {
    label: 'Base Price',
    value: 'price',
  },
  {
    label: 'Incentive',
    value: 'dealPrice',
  },
  {
    label: 'Aggregator',
    value: 'pickupointId',
  },
  {
    label: 'Start Date',
    value: 'start',
  },
  {
    label: 'End Date',
    value: 'end',
  },
  /*  {
    action: ['view_certificate'],
  }, */
  {
    action: ['edit'],
  },
]

const roleColumns: ReadonlyArray<Column<any>> = columnGenerators(header)

export {roleColumns}
