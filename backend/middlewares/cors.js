const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'localhost:3000',
];

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  console.log('cors...', req.headers);
  console.log('cors...', origin);

  if (allowedCors.includes(origin)) {
    console.log('allowedCors');
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    console.log('OPTIONS');
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  next(); // пропускаем запрос дальше
};
