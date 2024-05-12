const generateAddress = (data: any) => {
  let addressArray: any = []
  if (data) {
    const responseAddress = data
    const excludedProperties = ['latitute', 'longitute']
    const order = ['street', 'city', 'state', 'country']
    for (const key of order) {
      if (!excludedProperties.includes(key)) {
        const value = responseAddress[key]
        if (value && value !== undefined) {
          addressArray.push(value)
        }
      }
    }
  }
  return addressArray.join(', ')
}

export {generateAddress}
