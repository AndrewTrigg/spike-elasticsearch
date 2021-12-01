### Start the app

Run `docker-compose up`

Wait until elastic search and mongodb are running

Seed data into both the elasticsearch store and mongodb using the following request:
GET localhost:4000/seed/{num_of_records_to_generate}

You can find example queries for mongo and elasticsearch in the demo-queries folder. 
Send the relavent queries you want to test to the following urls

*Mongodb:*
POST localhost:4000/mongo/find

*Elasticsearch:*
POST localhost:4000/elastic/find

---

### The Credas parser

In the `utils.js` file there is a parser to extract the relevant information from a Credas process. This information for specific accounts can be obtained using this request:

`https://alcumus.credasdemo.com/api/v2/processes/{process_id}`

The first argument to the parser is the field that you would like to look for in the data, for example 'name'.

The second argument should be an array of the values you would like to match for the first argument above. For example, if we want to find specific questions we could add this as the second argument:

```
[
    'Your Company Logo (Optional)',
    'What type of supplier are you?'
]
```

So, the parser would look for all objects that contain a 'name' property that has a value that matches those values.

The third argument is an array of values that you would like returned once the relevant object has been found. You can use dot notation here to search for nested properties within the found object.
You can also pass these values as strings, or you can pass the values as tuples - the first element to be the name of the value you want returned, and the second element to give it a different key on the returned object.
