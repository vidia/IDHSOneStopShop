# API Documentation

All requests are under `/api`

## Summary

### Links

````txt
/api/agency
/api/agency/{id}/service


/api/service
/api/service/{id}/agency

/api/question
/api/question/{id}

/api/survey
/api/survey/{id}
````

---------------

## Agencies

### POST `/agency`

Create an agency

### GET `/agency`

Return all agencies as an array

### GET `/agency/{id}`

Return the given agency

### PUT `/agency/{id}`

Update the agency with id `id`

### DELETE `/agency/{id}`

Delete the agency with id `id`


## Services

### POST `/service`

Create a new service

### GET `/service`

Return all services as an array

### GET `/service/{id}`

Update the service

### DELETE `/service/{id}`

Delete the service

### PUT `/service/{id}`

Update the service. Use this to link agencies with services
(will stay linked with agency updates)

## Questions

### POST `/question`

Create a question

### GET `/question`

Return all questions in an arbitrary order.

### GET `/question/{id}`

Get a specific question

### DELETE `/question/{id}`

Delete the given question

## Survey

### GET `/survey`

Returns a survey document in the form

````JSON
{
  UID: # the user's unique code for this survey
  survey : [
    {
      service : "Service name",
      questions : [
        {
          # a question object
        }, ...
      ]
    }, ...
  ]
}
````

This will likely just be processed with EJS on server side


### POST `/survey/{uid}`

Answers a particular survey. Posts in the form

````JSON
{
  answers : [
    {
      Qid: "The question id",
      answer: "The answer to the question"
    }, ...
  ]
}
````

Any errors in missing questions, etc will be returned

### GET `/survey/{uid}`

Returns a completed survey. In the above form

(resolve question links? Mongoose does this with ref?)
