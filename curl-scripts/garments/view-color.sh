#!/bin/sh

API="http://localhost:4741"
URL_PATH="/garments"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
      "garment": {
        "color": "'"${COLOR}"'"
      }
    }'

echo
