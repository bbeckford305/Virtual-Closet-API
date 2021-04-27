#!/bin/bash

API="http://localhost:4741"
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
