const express = require('express');
const cors = require('cors');
const { execFile } = require('child_process');
const fs = require('fs');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 4000;
const API_HOST = 'namastedev.com';
const API_BASE_PATH = '/api/v1';

app.use(cors());

function fetchJson(path) {
  const curlPath = process.env.CURL_PATH || 'C:\\Windows\\System32\\curl.exe';
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
    `https://${API_HOST}${path}`,
  ];

  return new Promise((resolve, reject) => {
    const logEntry = `\n[${new Date().toISOString()}] curlPath=${curlPath} args=${args.join(' ')}\n`;
    fs.appendFileSync('proxy.log', logEntry);
    execFile(curlPath, args, { maxBuffer: 20 * 1024 * 1024, env: { ...process.env, HTTP_PROXY: '', HTTPS_PROXY: '', http_proxy: '', https_proxy: '' } }, (err, stdout, stderr) => {
      if (stderr) {
        fs.appendFileSync('proxy.log', `stderr=${stderr.slice(0, 1000)}\n`);
      }
      fs.appendFileSync('proxy.log', `stdout=${stdout.slice(0, 1000)}\n`);

      if (err && err.code === 'ENOENT') {
        return reject(new Error('curl executable not found. Install curl or set CURL_PATH.'));
      }

      if (err && !stdout) {
        return reject(err);
      }

      const markerIndex = stdout.lastIndexOf(`\n${marker}`);
      if (markerIndex === -1) {
        return reject(new Error('Unable to parse upstream response status.'));
      }

      const body = stdout.slice(0, markerIndex);
      const statusText = stdout.slice(markerIndex + marker.length + 1).trim();
      const status = parseInt(statusText, 10);

      if (Number.isNaN(status)) {
        return reject(new Error('Unable to parse upstream status code.'));
      }

      console.log(`Proxy upstream ${path} -> ${status}`);

      if (status < 200 || status >= 300) {
        console.error(`Upstream error for ${path}:`, status, body.slice(0, 500));
        const error = new Error(`Upstream API returned ${status}`);
        error.statusCode = status;
        return reject(error);
      }

      try {
        resolve(JSON.parse(body));
      } catch (parseErr) {
        console.error(`Failed to parse upstream JSON for ${path}:`, parseErr.message, body.slice(0, 500));
        reject(parseErr);
      }
    });
  });
}

app.get('/api/v1/listRestaurants', async (req, res) => {
  console.log('Proxy GET request received for', req.path);
  try {
    const json = await fetchJson(`${API_BASE_PATH}/listRestaurants`);
    res.json(json);
  } catch (err) {
    const status = err.statusCode || 500;
    res.status(status).json({ message: err.message || 'Proxy request failed' });
  }
});

app.get('/api/v1/listRestaurantMenu/:resId', async (req, res) => {
  try {
    const json = await fetchJson(`${API_BASE_PATH}/listRestaurantMenu/${req.params.resId}`);
    res.json(json);
  } catch (err) {
    const status = err.statusCode || 500;
    res.status(status).json({ message: err.message || 'Proxy request failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://0.0.0.0:${PORT}`);
});
