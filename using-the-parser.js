const {dynamicParser} = require('./utils')
const data = require('./credas-example-data.json')

const lookupProperty = 'itemTemplateId'
const matchValues = [
    '45e7c8c8-e0c3-43e9-806b-9b58db3fadfc',
    '57915f18-400a-4a02-b9cd-c9cbd6eeb4f0',
    '0f89259c-ca42-45b8-b30e-b527bb435ae6'
]
const returnValues =[
    'name', 'itemObservations.observation.displayValue'
]

let getQuestionAnswers = dynamicParser(
    lookupProperty,
    matchValues,
    returnValues
)


const otherLookupProperty = 'id'
const otherMatchValues = [9317]
const otherReturnValues = ['processTaskForms.set.name']

let getNameOfSections = dynamicParser(
    otherLookupProperty,
    otherMatchValues,
    otherReturnValues
    )
    
    
let other = dynamicParser(
    'order',
    [36],
    // element [1] in these arrays is an alias
    [['multiOptionValues.value', 'optionValue'], ['multiOptionValues.score', 'amazing']]
)

console.log('===================================================')
console.log(getQuestionAnswers(data))
console.log('===================================================')
console.log(getNameOfSections(data))
console.log('===================================================')
console.log(other(data))
console.log('===================================================')