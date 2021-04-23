# sh curl-scripts/index.sh

curl 'https://virtual-closet-api.herokuapp.com/users' \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "user": {
      "email": "'"${EMAIL}"'",
      "hashedPassword": "'"${PW}"'"
    }
  }'
