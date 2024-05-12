// @ts-nocheck
import {Column} from 'react-table'
import {columnGenerators} from '../../../../../../_metronic/helpers'

const header = [
  {
    label: 'S.N',
    value: 'id',
  },
  {
    label: 'Dispatch ID',
    value: 'dispatchId',
  },
  {
    label: 'Dispatch Date',
    value: 'creationDate',
  },
  {
    label: 'Dispatch Plant',
    value: 'dispatchPlant',
  },
  {
    label: 'Plant Address',
    value: 'addrTwo',
  },
  {
    label: 'Material Dispatched',
    value: 'materialDispatched',
  },
  {
    label: 'Qty',
    value: 'type2',
  },
  {
    label: 'Customer Name',
    value: 'name',
  },
  {
    label: 'Recycler Code',
    value: 'code',
  },
  {
    label: 'Order Value',
    value: 'materialValue',
  },
  {
    label: 'Transportation',
    value: 'addrTwo',
  },
  {
    label: 'Customer Address',
    value: 'addrOne',
  },
  {
    action: ['view', 'download'],
  },
]

const roleColumns: ReadonlyArray<Column<any>> = columnGenerators(header)

export {roleColumns}
