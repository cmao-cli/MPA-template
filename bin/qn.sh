#!/usr/bin/env bash

if [ "$QN_AKEY" != '' -a "$QN_SKEY" != '' ]; then
  /srv/qiniu/qshell account $QN_AKEY $QN_SKEY && /srv/qiniu/qshell qupload 2 ./config/qnconfig.json
fi
