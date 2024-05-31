import {Column} from 'react-table'
import {columnGenerators} from '../../../../../../_metronic/helpers'

const header = [
  {label: 'S.N', value: 'id'},
  {
    label: 'Category',
    value: 'categoryName',
  },
  {
    label: 'Item',
    value: '-',
  },
  {
    label: 'Base Price',
    value: 'price',
  },
  {
    label: 'Incentive',
    value: 'incentive',
  },
  {
    label: 'Aggregator',
    value: 'hubName',
  },
  {
    label: 'Start Date',
    value: '-',
  },
  {
    label: 'End Date',
    value: '-',
  },
  {
    action: ['view_certificate'],
  },
  // {
  //   action: ['edit', 'toggle'],
  // },
]

const roleColumns: ReadonlyArray<Column<any>> = columnGenerators(header)

export {roleColumns}
