#!/bin/bash

API="https://virtual-closet-api.herokuapp.com"
URL_PATH="/garments"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}"

echo
