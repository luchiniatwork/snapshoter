#!/bin/bash

while getopts ":p:" optname
do
  case "$optname" in
    "p")
      path=$OPTARG'/'
      ;;
  esac
done

echo "Building redis image" 
docker build -t snapshot-redis $path.