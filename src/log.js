import winston from 'winston';
import morgan from 'morgan';
import correlator from 'express-correlation-id';
import { getAppConfig } from './config';

const { createLogger, format, transports } = winston;

const config = getAppConfig();

const enumerateErrorFormat = format(info => {
  if (info.message instanceof Error) {
    // eslint-disable-next-line no-param-reassign
    info.message = Object.assign(
      {
        message: info.message.message,
        stack: info.message.stack
      },
      info.message
    );
  }

  if (info instanceof Error) {
    return Object.assign(
      {
        message: info.message,
        stack: info.stack
      },
      info
    );
  }
  return info;
});

const addCorrelationId = format(info => {
  // eslint-disable-next-line no-param-reassign
  info.correlationId = correlator.getId();
  return info;
});

const log = createLogger({
  format: format.combine(
    format.label({ label: config.name || 'app-street-service' }),
    format.timestamp(),
    enumerateErrorFormat(),
    addCorrelationId(),
    format.json()
  ),
  transports: [
    new transports.Console({
      level: 'info'
    })
  ]
});

const logStream = {
  write: message => log.info(message)
};

export const morganHttpLogger = () => morgan('short', { stream: logStream });

export default log;
