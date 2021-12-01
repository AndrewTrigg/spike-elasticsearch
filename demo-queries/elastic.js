// This looks for records that match everything using the 'must'
// TODO: This is not quite working, can't get it to require ALL the terms
// prettier-ignore
const allValuesMustMatch = {
    "bool": {
        "must":[ 
            {
                "terms": {
                    "supplierTypes": ["c", "d", "a"]
                    
                }
            },
            {
                "terms": {
                    "locations": ["ireland", "england", "wales"]
                }
            },
            {
                "terms": {
                    "services": ["seven"]
                }
            } 
        ]
    }
}
// This looks for records that match at least one of the conditions using the 'should'
// Note: You must use lower case values
// prettier-ignore
const anyValuesMayMatch = {
    "bool": {
        "should":[ 
            {
                "terms": {
                    "supplierTypes": ["c", "d", "a"]

                }
            },
            {
                "terms": {
                    "locations": ["ireland", "england", "wales"]
                }
            },
            {
                "terms": {
                    "services": ["seven"]
                }
            }
        ]
    }
}

// This uses regex to find any records with both ireland and england stated as a location
const usingRegex1 = {
    "bool": {
        "must": [ 
            {
                "regexp": {
                    "locations": {
                        "value": "ire.+",
                        "case_insensitive": true
                    }
                }
            },
            {
                "regexp": {
                    "locations": {
                        "value": "en.+",
                        "case_insensitive": true
                    }
                }
            }
        ]
    }
}

// This uses regex to find any records with either ireland and england stated as a location
const usingRegex2 = {
    "regexp": {
        "locations": {
            "value": "ire.+|en.",
            "case_insensitive": true
        }
    }
}

// To find a match that contains only the one item in an array
const justOneService = {
  "match": { "services": "eight" } 
}


// Demo of the type of logic you can use for more complex queries
const booleanLogic = {
    "bool": {
        "must": { "match": { "locations": "England"}},
        "must_not": { "match": { "services": "four"}}
    }
}

// Demo of fuzzy searching
const fuzzySearch = {
    "fuzzy": { 
        "services": { 
              "value": "eigt",
              "fuzziness": "AUTO",
              "max_expansions": 50,
              "prefix_length": 1,
              "transpositions": true
          } 
      }
  }