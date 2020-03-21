#!/bin/sh

npx sequelize db:migrate

if [ $NODE_ENV == "development" ]
then
  $(npm bin)/nodemon src/index.js
else
  node src/index.js
fi
