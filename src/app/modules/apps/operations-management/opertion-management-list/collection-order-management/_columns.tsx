import {Column} from 'react-table'
import {columnGenerators} from '../../../../../../_metronic/helpers'

const header = [
  {label: 'S.N', value: 'id'},
  {
    label: 'Suppply ID',
    value: 'supplyId',
  },
  {
    label: 'No Of Bags',
    value: 'bags',
  },
  {
    label: 'Plastic Type',
    value: 'plasticType',
  },
  {
    label: 'Collector ID',
    value: 'collectorId',
  },
  {
    label: 'Collector Name',
    value: 'name',
  },
  {
    label: 'Creation Date',
    value: 'creationDate',
  },
  /* {
    label: 'Created BY',
    value: 'createdBy',
  }, */
  {label: 'Address', name: 'addrOne'},
  {
    label: 'Pick up Date',
    value: 'pickupDate',
  },
  {
    label: 'Pick Up By',
    value: 'name',
  },
  {
    label: 'No Of Bags Collected',
    value: 'materialValue',
  },
  {
    label: 'Driver OID',
    value: 'driverOid',
  },
  {
    label: 'Pick up Vehicle Number',
    value: 'vehicleNumber',
  },
  {
    label: 'Pick up Location',
    value: 'addrOne',
  },
  {
    label: 'Trip ID',
    value: 'id',
  },
  {
    label: 'Received At',
    value: 'recivedAt',
  },
  {
    label: 'Received By',
    value: 'recivedBy',
  },
  {
    label: 'Receiver OID',
    value: 'reciverOid',
  },
  {
    label: 'Inspected By',
    value: 'inpectedBy',
  },
  {
    label: 'Inspection Date',
    value: 'pickupDate',
  },
  {
    label: 'Received Weight',
    value: 'netRecivedBy',
  },
  {
    label: 'Deduction',
    value: 'deduction',
  },
  {
    label: 'Net Received',
    value: 'netRecivedBy',
  },
  {
    label: 'Material Value',
    value: 'materialValue',
  },
  {
    label: 'Payment Date',
    value: 'paymentDate',
  },
  {
    action: ['view', 'download'],
    // action: ['edit'],
  },
]

const roleColumns: ReadonlyArray<Column<any>> = columnGenerators(header)

export {roleColumns}
