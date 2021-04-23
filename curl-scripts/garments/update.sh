#!/bin/bash

API="https://virtual-closet-api.herokuapp.com"
URL_PATH="/garments"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
    "garment": {
      "cleaningStatus": "'"${CSTATUS}"'",
      "wornDate": "'"${WDATE}"'"
    }
  }'

echo
