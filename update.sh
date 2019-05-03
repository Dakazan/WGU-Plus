#! /bin/bash

BASE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
UPDATE_FILE=${BASE_DIR}/update.zip

function main {
    set_version
    create_zip
    upload
    check_success
}

function set_version {
    header "Update Version"
    date=$(/bin/date +"%Y").$(/bin/date +"%-m%d").$(/bin/date +"%-H%M")
    /bin/sed -i "s/\"version\": \".*\"/\"version\": \"${date}\"/" ${BASE_DIR}/src/manifest.json
}

function create_zip {
    header "Create ZIP"
    pushd ${BASE_DIR}/src
        /usr/bin/zip -r ${UPDATE_FILE} * >> ${BASE_DIR}/log.txt 2>&1
    popd
}

function upload {
    header "Upload"
    url="https://accounts.google.com/o/oauth2/token"
    data="client_id=${B_CID1}-${B_CID2}.apps.googleusercontent.com&client_secret=${B_S1}-${B_S2}-${B_S3}&refresh_token=${B_R1}/${B_R2}-${B_R3}&grant_type=refresh_token"
    access_token=$(/usr/bin/curl ${url} -d ${data} | /bin/grep -i access_token | /usr/bin/cut -d"\"" -f4)

    header "Uploading File" >> ${BASE_DIR}/log.txt
    /usr/bin/curl -H "Authorization: Bearer ${access_token}" -H "x-goog-api-version: 2" -X PUT -T ${UPDATE_FILE} -v https://www.googleapis.com/upload/chromewebstore/v1.1/items/chaofigalhkdhmphgaanmpbapfjlpjpd >> ${BASE_DIR}/log.txt 2>&1
    header "Publishing" >> ${BASE_DIR}/log.txt
    /usr/bin/curl -H "Authorization: Bearer ${access_token}" -H "x-goog-api-version: 2" -H "Content-Length: 0" -X POST -v https://www.googleapis.com/chromewebstore/v1.1/items/chaofigalhkdhmphgaanmpbapfjlpjpd/publish >> ${BASE_DIR}/log.txt 2>&1
}

function check_success {
    header "Checking Success"
    if [[ $(grep '"uploadState":"SUCCESS"' ${BASE_DIR}/log.txt) == "" ]]; then
        echo "It appears that uploading failed"
        exit 1
    fi
    if [[ $(grep ':["OK."]' ${BASE_DIR}/log.txt) == "" ]]; then
        echo "It appears that publishing failed"
        exit 1
    fi
}

function header {
    echo "================================================"
    echo "${1}"
    echo "================================================"
}

main