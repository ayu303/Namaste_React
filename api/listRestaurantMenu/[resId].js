const { execFile } = require('child_process');

module.exports = function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { resId } = req.query;
  if (!resId) {
    return res.status(400).json({ message: 'Missing resId parameter' });
  }

  const curlPath = process.env.CURL_PATH || 'curl';
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
    `https://namastedev.com/api/v1/listRestaurantMenu/${resId}`,
  ];

  execFile(curlPath, args, { maxBuffer: 20 * 1024 * 1024 }, (err, stdout, stderr) => {
    if (err && !stdout) {
      return res.status(500).json({ message: 'Proxy request failed' });
    }

    const markerIndex = stdout.lastIndexOf(`\n${marker}`);
    if (markerIndex === -1) {
      return res.status(500).json({ message: 'Unable to parse upstream response status.' });
    }

    const body = stdout.slice(0, markerIndex);
    const statusText = stdout.slice(markerIndex + marker.length + 1).trim();
    const status = parseInt(statusText, 10);

    if (Number.isNaN(status)) {
      return res.status(500).json({ message: 'Unable to parse upstream status code.' });
    }

    if (status < 200 || status >= 300) {
      return res.status(status).json({ message: `Upstream API returned ${status}` });
    }

    try {
      const json = JSON.parse(body);
      res.status(200).json(json);
    } catch (parseErr) {
      res.status(500).json({ message: 'Failed to parse upstream JSON' });
    }
  });
}