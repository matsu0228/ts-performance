#!/bin/bash

DST_DIR="./data"

# export all data
# fsrpl  --debug --secret=$KEY_FILE  "items/*"  -f "${DST_DIR}"

echo "ローカルファイルを指定のfirebaseへインポート"
for FILE in `ls ${DST_DIR}/`; do
  #echo "${file}"
  fsrpl  --debug --secret=$KEY_FILE  "items/*"  -i   "${DST_DIR}/${FILE}" 
done