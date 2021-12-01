// This looks for records that match everything using the '$all' and '$and'
const allValuesMustMatch = {
    "$and": [
      { "supplierTypes": { "$all": ["C", "D", "A"] } },
      { "locations": { "$all": ["Ireland", "England", "Wales"] } },
      { "services": { "$all": ["seven"] } }
    ]
  },

// This looks for records that match at least one of the conditions by using '$in' and '$or'
const anyValuesMayMatch = {
  "$or": [
    { "supplierTypes": { "$in": ["C", "D", "A"] } },
    { "locations": { "$in": ["Ireland", "England", "Wales"] } },
    { "services": { "$in": ["seven"] } }
  ] 
}

// This uses regex to find any records with both ireland and england stated as a location
const usingRegex1 = {
  "$and": [
    { "$and" : [
          {
              "locations": {
                  "$regex": "ire.+",
                  "$options": "i"
              }
          },
          {
              "locations": {
                  "$regex": "en.+",
                  "$options": "i"
              }
          }
    
      ]
    },
  ]
}

// This uses regex to find any records with either ireland and england stated as a location
const usingRegex2 = {
  "$and": [
    { "$or" : [
          {
              "locations": {
                  "$regex": "ire.+",
                  "$options": "i"
              }
          },
          {
              "locations": {
                  "$regex": "en.+",
                  "$options": "i"
              }
          }
    
      ]
    },
  ]
}

// To find a match that contains only the one item in an array
const justOneService = {
  "services": ["eight"] 
}