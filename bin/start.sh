#!/usr/bin/env bash

if [ -z ${WORKING_DIR} ] && [ -n "$1" ]; then
  WORKING_DIR="$1"
fi

WORKING_DIR=$WORKING_DIR npx gulp start
