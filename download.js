const axios = require('axios');
const fs = require('fs');
const path = require('path');

const downloadFile = async (fileUrl, outputLocationPath) => {
  return axios({
    method: 'get',
    url: fileUrl,
    responseType: 'stream',
  }).then(response => {
    response.data.pipe(fs.createWriteStream(path.join('./savedImages', outputLocationPath)));
  });
}

module.exports = downloadFile