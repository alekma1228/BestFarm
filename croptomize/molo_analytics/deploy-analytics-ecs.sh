#!/bin/bash

cd ../../modern-logic-analytics

if [[ ! -f Dockerfile ]] ; then
    echo 'File "Dockerfile" is not there, aborting.'
    echo 'Call this script from the analytics subdirectory of croptomize'
    echo 'Note: this script requires modern-logic-analytics is checked out'
    echo 'peer to the croptomize repo'
    exit
fi

case "$1" in
  "-staging")
    REPOSITORY=croptomize-staging-analytics
    CLUSTER=croptomize-staging-analytics
    ;;
  "-production")
    REPOSITORY=croptomize-production-analytics
    CLUSTER=croptomize-production-analytics
    ;;
  *)
    echo "Must call with either -staging or -production"
    exit 1
    ;;
esac


$(aws --profile Croptomize ecr get-login --no-include-email --region us-east-1)
docker build -t $REPOSITORY -f Dockerfile .
docker tag $REPOSITORY:latest 048002056170.dkr.ecr.us-east-1.amazonaws.com/$REPOSITORY:latest
docker push 048002056170.dkr.ecr.us-east-1.amazonaws.com/$REPOSITORY:latest
