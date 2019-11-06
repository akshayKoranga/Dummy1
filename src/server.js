import routes from './routes';
import { getAppConfig } from './config';
import log, { morganHttpLogger } from './log';

const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/error-handler');

const start = port => {
  const config = getAppConfig();
  const serverPort = port || config.port;

  const app = express();
  app.use(
    cors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false
    })
  );

  app.use(bodyParser.json({ limit: '1mb' }));

  app.get('/app-street-service', (req, res) => {
    res.send({ 'It works': config.name });
  });

  app.get('/app-street-service/health-check', (req, res) => {
    res.send({ status: 'ok' });
  });

  app.use(morganHttpLogger());

  app.use('/app-street-service', routes);
  app.use(errorHandler);
  app.use((req, res) => {
    res.status(404).send({ error: 'Not found' });
  });

  return app.listen(serverPort, () => {
    log.info(`App-Street Service Started:: listening at ${serverPort}`);
  });
};

module.exports = {
  start
};
