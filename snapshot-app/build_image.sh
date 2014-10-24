#!/bin/bash

while getopts ":p:" optname
do
  case "$optname" in
    "p")
      path=$OPTARG'/'
      ;;
  esac
done

echo "Building snapshot-app image" 
docker build -t snapshot-app $path.