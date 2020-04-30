#! /bin/bash

# Create an entry
 curl -X POST -d '{"source": "http://netflix.com"}' -H "Content-Type: application/json; charset=utf-8" http://shri.nk/ | jq

# test the entry
curl http://shri.nk/fWW49 -v

# get the stats 
curl http://shri.nk/VcJ78/stats | jq

# toggle the shrunk
curl -X PUT http://shri.nk/VcJ78/toggle -v
