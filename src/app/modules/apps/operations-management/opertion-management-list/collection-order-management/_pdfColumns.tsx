import {Column} from 'react-table'
// import {columnGenerators} from '../../../../../../_metronic/helpers'
import {columnGenerators} from '../../../../../../_metronic/helpers'

const header = [
  {label: 'S.N', value: 'id'},
  {
    label: 'No Of Bags Collected',
    value: 'materialValue',
  },
  {
    label: 'Gross Material Weight',
    value: 'materialValue',
  },
  {
    label: 'Net Materal Received',
    value: 'netRecivedBy',
  },
  {
    label: 'Quality Deduction',
    value: 'deduction',
  },
]

const pdfColumns: ReadonlyArray<Column<any>> = columnGenerators(header)

export {pdfColumns}
