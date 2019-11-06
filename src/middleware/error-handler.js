import { HttpError } from 'http-errors';

import log from '../log';

module.exports = (err, req, res, next) => {
  if (!err) {
    return next(err);
  }

  log.error('Middleware caught error::', err);
  log.error(err);

  if (err.message === 'SchemaValidationError') {
    return res.status(400).send(err.fields);
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).send({ error: 'Authentication failed' });
  }

  if (err.name === 'AuthenticationFailedError') {
    return res.status(401).send({ error: err.message });
  }

  if (err.name === 'NotFoundError') {
    return res.status(404).send({ error: err.message });
  }

  if (err.name === 'BadRequestError' || err instanceof HttpError) {
    return res.status(400).send({ error: err.message });
  }

  const body = { message: 'Internal Server Error' };
  return res.status(500).send(body);
};
