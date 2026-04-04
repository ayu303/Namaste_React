const https = require('https');
const options = {
  hostname: 'namastedev.com',
  path: '/api/v1/listRestaurants',
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Accept-Language': 'en-US,en;q=0.9',
    Referer: 'https://namastedev.com/',
    Origin: 'https://namastedev.com',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    'Sec-CH-UA': '"Chromium";v="126", "Google Chrome";v="126", "Not:A-Brand";v="99"',
    'Sec-CH-UA-Mobile': '?0',
    'Sec-CH-UA-Platform': '"Windows"',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive'
  }
};

const req = https.request(options, (res) => {
  console.log('STATUS', res.statusCode);
  console.log('HEADERS', res.headers);
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    console.log('BODY_LENGTH', data.length);
    if (data.length < 1000) console.log('BODY', data);
  });
});

req.on('error', (err) => console.error('ERR', err.message));
req.end();
