
module.exports.createRecord = (count) => {
    const locations = Object.freeze(['England', 'Wales', 'Scotland', 'Ireland', 'France', 'Germany'])
    const services = Object.freeze(['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'])
    const supplierTypes = Object.freeze(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O'])

    const numOfLocations = Math.floor(Math.random() * locations.length) || 1
    const numOfServices = Math.floor(Math.random() * (services.length/3)) || 1
    const numOfSupplierTypes = Math.floor(Math.random() * (services.length/3)) || 1

    let cpLocations = [...locations]
    let cpServices = [...services]
    let cpSupplierTypes = [...supplierTypes]

    const recordLocations = Array.from(Array(numOfLocations)).map(() => {
        const randomIndex = Math.floor(Math.random() * cpLocations.length)
        const value = cpLocations[randomIndex]
        cpLocations = cpLocations.filter(val => val !== value)
        return value
    })
    const recordServices = Array.from(Array(numOfServices)).map(() => {
        const randomIndex = Math.floor(Math.random() * cpServices.length)
        const value = cpServices[randomIndex]
        cpServices = cpServices.filter(val => val !== value)
        return value
    })
    const recordSupplierTypes = Array.from(Array(numOfSupplierTypes)).map(() => {
        const randomIndex = Math.floor(Math.random() * cpSupplierTypes.length)
        const value = cpSupplierTypes[randomIndex]
        cpSupplierTypes = cpSupplierTypes.filter(val => val !== value)
        return value
    })

    return {
        id: count,
        locations: recordLocations,
        services: recordServices,
        supplierTypes: recordSupplierTypes
    }
}

function _traverseSegments (data, segments){
    if (segments.length === 1) {
        return data[segments[0]]
    }
    if (Array.isArray(data[segments[0]])){
        return data [segments[0]].map(item =>  _traverseSegments(item, segments.slice(1)))
    }
    if (typeof data[segments[0]] === 'object' && typeof data[segments[0]] !== null){
        return _traverseSegments(data[segments[0]], segments.slice(1))

    }
}

module.exports.dynamicParser = (property, matchValues, returnProperties) => {
    const results = []
    return function checkForProperty (data) {
        if (Array.isArray(data)) {
            data.forEach(checkForProperty)
        } else if (typeof data === 'object' && data !== null) {
            Object.entries(data).forEach(([key, val]) => {
                if (key === property && (matchValues.includes(val))) {
                    const details = returnProperties.reduce((acc, curr) => {
                        let segments;
                        let alias;
                        if (Array.isArray(curr)){
                            segments = curr[0].split('.')
                            alias = curr[1]
                        } else {
                            segments = curr.split('.')
                        }
                        if (segments.length > 1) {
                            acc[alias || segments[segments.length - 1]]= _traverseSegments(data, segments)
                        }else{
                            acc[alias || segments[segments.length - 1]] = data[curr]
                        }
                        return acc
                    }, { [property]: data[property]})
                    results.push(details)
                } else {
                    checkForProperty(val)
                }
            })
        }
        return results
    }
}