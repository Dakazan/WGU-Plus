#! /bin/bash

BASE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
UPDATE_FILE=${BASE_DIR}/update.zip

function main {
    set_version
    create_zip
    upload
}

function set_version {
    date=$(/bin/date +"%Y").$(/bin/date +"%-m%d").$(/bin/date +"%-H%M")
    /bin/sed -i "s/\"version\": \".*\"/\"version\": \"${date}\"/" ${BASE_DIR}/src/manifest.json
}

function create_zip {
    pushd ${BASE_DIR}/src
        /usr/bin/zip -r ${UPDATE_FILE} *
    popd
}

function upload {
    URL="https://accounts.google.com/o/oauth2/token"
    DATA="client_id=${B_CID1}-${B_CID2}&client_secret=${B_S1}-${B_S2}-${BS3}"
    DATA="${DATA}&refresh_token=${B_R1}/${B_R2}-${B_R3}&grant_type=refresh_token"
    ACCESS_TOKEN=$(/usr/bin/curl ${URL} -d ${DATA} | /bin/grep -i access_token | /usr/bin/cut -d"\"" -f4)
    ACCESS_TOKEN="Authorization: Bearer ${ACCESS_TOKEN}"

    UPLOAD_URL="https://www.googleapis.com/upload/chromewebstore/v1.1/items/chaofigalhkdhmphgaanmpbapfjlpjpd"
    PUBLISH_URL="https://www.googleapis.com/chromewebstore/v1.1/items/chaofigalhkdhmphgaanmpbapfjlpjpd/publish"
    API_V="x-goog-api-version: 2"
    POST_HEADER="Content-Length: 0"

    /usr/bin/curl -H ${ACCESS_TOKEN} -H ${API_V} -X PUT -T ${UPDATE_FILE} -v ${UPLOAD_URL}
    /usr/bin/curl -H ${ACCESS_TOKEN} -H ${API_V} -H ${POST_HEADER} -X POST -v ${PUBLISH_URL}
}

main