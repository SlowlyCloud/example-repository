#!/bin/sh
if [ "$NODE_ENV" == "production" ]; then
  yarn start:prod
# elif [ "$NODE_ENV" -eq "development" ]; then
else
  yarn start:debug
fi