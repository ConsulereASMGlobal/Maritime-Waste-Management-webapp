import {Column} from 'react-table'
import {columnGenerators} from '../../../../../../_metronic/helpers'

const header = [
  {label: 'S.N', value: 'id'},
  {
    label: 'Process Name',
    value: 'name',
  },
  {
    label: 'Breakdown Reason',
    value: 'position',
  },
  {
    action: ['edit', 'delete'],
  },
]

const roleColumns: ReadonlyArray<Column<any>> = columnGenerators(header)

export {roleColumns}
