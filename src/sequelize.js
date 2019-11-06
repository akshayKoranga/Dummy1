import Sequelize from 'sequelize';
import {
  getAppConfig
} from './config';
import log from './log';


let connection;
let sequelize ;

const initDB = async () => {
  log.info('Initializing Database...');
  const config = getAppConfig();
  const dbConfig = config.database.connection;
  connection = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: false
  });
  sequelize =  connection;
  return connection
  .authenticate()
  .then(() => {
    log.info('Successfully connected to database');
    return true;
  });
};



export {
  initDB,
  sequelize
};