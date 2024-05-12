import {Column} from 'react-table'
import {columnGenerators} from '../../../../../../_metronic/helpers'

const header = [
  {
    label: 'S.N',
    value: 'id',
  },
  {
    label: 'Category',
    value: 'id',
  },
  {
    label: 'Type',
    value: 'itemName',
  },
  {
    label: 'Quanity(kg)',
    value: 'quantity',
  },
]

const pdfReturnOrdersColumns: ReadonlyArray<Column<any>> = columnGenerators(header)

export {pdfReturnOrdersColumns}
