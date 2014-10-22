#!/bin/bash

while getopts ":p:" optname
do
  case "$optname" in
    "p")
      path=$OPTARG'/'
      ;;
  esac
done

echo "Building kue-ui container" 
docker build -t kue-ui $path.