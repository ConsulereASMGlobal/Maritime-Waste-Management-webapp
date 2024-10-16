import {useMemo, useState} from 'react'
import {useQuery} from 'react-query'
import {getUserById} from '../../../app/modules/apps/data-administration/data-admininstration-list/core/_requests'

export function useFetchCommon({
  isEnabled = true,
  api,
  isDropDown = true,
  sameLabelId = false,
  label,
}: any) {
  const campaignListInfo = useQuery(api, () => getUserById(null, api), {
    cacheTime: 0,
    onError: (err) => {
      // setItemIdForUpdate(undefined)
      console.error(err)
    },
    enabled: isEnabled,
  })
  const {responseData} = useMemo(() => {
    let responseData: any = campaignListInfo?.data || []
    if (isDropDown && responseData.length) {
      responseData = responseData.map((eachRes) => {
        let labelValue = eachRes
        if (label?.length) {
          label.forEach((property) => {
            if (labelValue && typeof labelValue === 'object') {
              labelValue = labelValue[property]
            } else {
              labelValue = labelValue.name
            }
          })
        }
        return {
          label: (label?.length ? labelValue : eachRes?.name) || '',
          value: sameLabelId ? (label?.length ? labelValue : eachRes?.name) || '' : eachRes.id,
        }
      })
    }
    return {responseData}
  }, [campaignListInfo.data])

  return {
    responseData,
    isFetching: campaignListInfo.isFetching,
  }
}
