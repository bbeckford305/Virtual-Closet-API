#!/bin/bash

API="https://virtual-closet-api.herokuapp.com"
URL_PATH="/garments"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data ' {
    "garment": {
      "type": "'"${TYPE}"'",
      "color": "'"${COLOR}"'",
      "cleaningMethod": "'"${CMETHOD}"'",
      "cleaningStatus": "'"${CSTATUS}"'",
      "wornDate": "'"${WDATE}"'",
      "weather": "'"${WEATHER}"'"
    }

  }'

echo
