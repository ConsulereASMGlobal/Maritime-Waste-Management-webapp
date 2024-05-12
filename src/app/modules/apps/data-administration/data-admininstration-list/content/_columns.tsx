import {Column} from 'react-table'
import {columnGenerators} from '../../../../../../_metronic/helpers'

const header = [
  {
    label: 'S.N',
    value: 'id',
  },
  {
    label: 'Currency Name',
    value: 'currencyName',
  },
  {
    label: 'Short Name',
    value: 'shortForm',
  },
  {
    label: 'Symbol',
    value: 'symbol',
  },
]

const roleColumns: ReadonlyArray<Column<any>> = columnGenerators(header)

export {roleColumns}
