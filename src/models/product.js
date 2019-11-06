import {
  sequelize
} from '../sequelize';
import Sequelize from 'sequelize';
import _ from 'lodash';
import CRUDModel from './crud-model';



export class Product extends Sequelize.Model {

  static init() {}
  static get name() {
    return 'Product';
  }

  static get getSchema() {
    const tableName = 'tbl_product';
    const ProductSchema = sequelize.define('Product', {
      product_id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      product_created_on: {
        type: Sequelize.DATE(3),
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
      },
      product_name: Sequelize.STRING,
      product_image: Sequelize.STRING,
      product_inventory: Sequelize.SMALLINT,
      product_description: Sequelize.STRING,
      product_created_by: Sequelize.BIGINT,
      product_sku: Sequelize.STRING,
      product_type: Sequelize.ENUM('INSTORE', 'ONLINE'),
      product_commision: Sequelize.STRING,
      product_keywords: Sequelize.STRING,
      product_tax: Sequelize.STRING,
      product_authorized: Sequelize.SMALLINT,
      product_status: Sequelize.SMALLINT,

    }, {
      timestamps: false,
      tableName
    });

    return ProductSchema;
  }

  

  static get sanitizeAttributes() {
    return ['welcomeMessage'];
  }
}



Object.assign(Product, CRUDModel(Product));

export default Product;