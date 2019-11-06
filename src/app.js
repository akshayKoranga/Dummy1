/* eslint-disable global-require */
import { initAppConfig } from './config';
import { initDB } from './sequelize';
import log from './log';

process.on('uncaughtException', err => {
  log.error('Uncaught exception, shutting down the server');
  log.error(err);
  process.exit(1);
});

process.on('unhandledRejection', err => {
  log.error('UNHANDLED REJECTION', err); 
  log.error(err);
});

initAppConfig()
  .then(initDB)
  .then(result => {
    if (!result) process.exit(1);
  })
  .then(() => {
    log.info('Starting App-Street Service');
    require('./server').start();
  })
  .catch(e => {
    // eslint-disable-next-line no-console
    console.error('Error starting app and fetching configs \n', e);
    process.exit(1);
  });
