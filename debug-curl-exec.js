const { execFile } = require('child_process');
const API_HOST = 'namastedev.com';
const path = '/api/v1/listRestaurants';
const marker = '----HTTP_STATUS_MARKER----';
const args = [
  '-sS',
  '-L',
  '--compressed',
  '--write-out', `\n${marker}%{http_code}`,
  '-H', 'Accept: application/json',
  '-H', 'Accept-Language: en-US,en;q=0.9',
  '-H', 'Referer: https://namastedev.com/',
  '-H', 'Origin: https://namastedev.com',
  '-H', 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  '-H', 'Sec-CH-UA: "Chromium";v="126", "Google Chrome";v="126", "Not:A-Brand";v="99"',
  '-H', 'Sec-CH-UA-Mobile: ?0',
  '-H', 'Sec-CH-UA-Platform: "Windows"',
  `https://${API_HOST}${path}`,
];

console.log('args:', args);
execFile('curl.exe', args, { maxBuffer: 20 * 1024 * 1024 }, (err, stdout, stderr) => {
  if (err) {
    console.error('ERROR CODE:', err.code);
    console.error('ERROR MESSAGE:', err.message);
  }
  console.log('STDOUT LEN', stdout.length);
  console.log('STDERR LEN', stderr.length);
  console.log('STDOUT:', stdout.slice(0, 500));
  console.log('STDERR:', stderr.slice(0, 500));
});
