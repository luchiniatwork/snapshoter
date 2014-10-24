#!/bin/bash

for dockerPath in 'snapshot-redis' 'snapshot-app' 'snapshot-kue-ui'
do
    $dockerPath/refresh_container.sh
done