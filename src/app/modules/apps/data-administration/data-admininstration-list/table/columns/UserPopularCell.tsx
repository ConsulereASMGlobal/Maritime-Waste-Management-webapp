import {FC, useMemo} from 'react'
import {ID} from '../../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {useMutation, useQueryClient} from 'react-query'
import {deleteUser, updateUser, createUser} from '../../core/_requests'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import {KTIcon, QUERIES} from '../../../../../../../_metronic/helpers'
import {useQueryResponse} from '../../core/QueryResponseProvider'

type Props = {
  id: string
  flag: boolean
}

const UserPopularCell: FC<Props> = ({id, flag}) => {
  const queryClient = useQueryClient()
  const {state} = useQueryRequest()
  const {query} = useQueryResponse()

  const toggleStatus = useMutation(
    () => updateUser({}, `user/${id}/status?type=${state.type}&popular=${flag ? false : true}`),
    {
      // 💡 response of the mutation is passed to onSuccess
      onSuccess: () => {
        // ✅ update detail view directly
        queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])
      },
    }
  )
  return (
    <div className='form-check-solid form-switch fv-row'>
      <input
        className='form-check-input'
        type='checkbox'
        id='allowmarketing'
        defaultChecked={flag ? true : false}
        onChange={async () => {
          await toggleStatus.mutateAsync()
        }}
      />
    </div>
  )
}

export {UserPopularCell}
