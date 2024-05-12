import {Column} from 'react-table'
import {columnGenerators} from '../../../../../../_metronic/helpers'

const header = [
  {
    label: 'S.N',
    value: 'id',
  },
  {
    label: 'Category',
    value: 'categoryName',
  },
  {
    label: 'Sub Category',
    value: 'itemName',
  },
  {
    label: 'Quality/Unit',
    value: 'unit',
  },
  {
    label: 'Price',
    value: 'price',
  },
  {
    label: 'Currency',
    value: 'currency',
  },
  {
    label: 'My trips',
    action: ['edit'],
  },
]

const roleColumns: ReadonlyArray<Column<any>> = columnGenerators(header)

export {roleColumns}
