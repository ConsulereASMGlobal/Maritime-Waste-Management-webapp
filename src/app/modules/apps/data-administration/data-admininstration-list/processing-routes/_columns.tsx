import {Column} from 'react-table'
import {columnGenerators} from '../../../../../../_metronic/helpers'

const header = [
  {
    label: 'S.N',
    value: 'id',
  },
  {
    label: 'Process Name',
    value: 'name',
  },
  {
    label: 'Input Category',
    value: 'inMaterials',
  },
  {
    label: 'Output Category',
    value: 'outMaterials',
  },
  {
    label: 'Icon',
    value: 'icon',
  },
  {
    label: 'My trips',
    action: ['edit'],
  },
]

const roleColumns: ReadonlyArray<Column<any>> = columnGenerators(header)

export {roleColumns}
