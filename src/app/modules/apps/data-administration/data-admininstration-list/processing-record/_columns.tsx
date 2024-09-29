import {Column} from 'react-table'
import {columnGenerators} from '../../../../../../_metronic/helpers'

const header = [
  {label: 'S.N', value: 'id'},
  {
    label: 'Date',
    value: 'createdAt',
  },
  {
    label: 'Vessel No',
    value: 'hubName',
  },
  {
    label: 'Name',
    value: 'name',
  },
  {
    label: 'Activity',
    value: 'processName',
  },
  {
    label: 'Input',
    value: 'inputMaterialName',
  },
  {
    label: 'Quantity',
    value: 'inputQuantity',
  },
  {
    label: 'Custody',
    value: 'images',
  },
  /*  {
    label: 'Team Size',
    value: 'teamSize',
  },
  {
    label: 'Working Hrs',
    value: 'operatingHours',
  }, */
  /* {
    label: 'Receipt',
    value: 'qty',
  }, */
  {
    action: ['view_certificate'],
  },
  // {
  //   action: ['edit', 'toggle'],
  // },
]

const roleColumns: ReadonlyArray<Column<any>> = columnGenerators(header)

export {roleColumns}
