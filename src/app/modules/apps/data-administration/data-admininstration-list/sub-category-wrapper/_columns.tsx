import {Column} from 'react-table'
import {columnGenerators} from '../../../../../../_metronic/helpers'

const header = [
  {
    label: 'S.N',
    value: 'id',
  },
  {
    label: 'Name',
    value: 'name',
  },
  /* {
    label: 'Category',
    value: 'categoryMap',
  }, */
  {
    label: 'Icon',
    value: 'avatar',
  },
  {
    action: ['edit'],
  },
]

const roleColumns: ReadonlyArray<Column<any>> = columnGenerators(header)

export {roleColumns}
