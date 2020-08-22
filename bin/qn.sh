#!/usr/bin/env bash

declare -A envs=( ["development"]="5" ["test"]="4" ["press"]="3" ["staging"]="2" ["production"]="1" )

# 资源前缀（业务线仓库目录/环境变量/自定义项目名）
prefix=platform-informatization/${envs[$front_env]}/hra-assist/
# 上传的文件夹
srcDir=build
# 七牛的仓库名
bucket=platform
# 跳过文件扩展名
skipSuffixes=.map

# 如果是dev，test，press等环境，设置仓库为测试仓库
if [ "$front_env" = 'development' -o "$front_env" = 'test' -o "$front_env" = 'press' ];
then
  bucket=dev-cdn-common
fi

# 七牛上传
/srv/qiniu/qshell account $QN_AKEY $QN_SKEY
/srv/qiniu/qshell qupload2 --bucket $bucket --src-dir $srcDir --key-prefix $prefix --skip-suffixes $skipSuffixes --log-file qiniu.log --thread-count 2 --rescan-local true --check-exists true

cat qiniu.log
