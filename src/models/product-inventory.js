import {
    sequelize
} from '../sequelize';
import Sequelize from 'sequelize';
import _ from 'lodash';
import CRUDModel from './crud-model';



export class ProductSpec extends Sequelize.Model {
    static init() {}
    static get name() {
        return 'ProductSpec';
    }

    static get getSchema() {
        const tableName = 'tbl_product_inventory';

        const ProductInventorySchema = sequelize.define('ProductInventoryValue', {
            product_inventory_id: {
                type: Sequelize.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },
            product_inventory_created_on: {
                type: Sequelize.DATE(3),
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
            },
            product_id: Sequelize.BIGINT,
            merchant_id: Sequelize.BIGINT,
            product_spec_values: Sequelize.STRING,
            product_inventory: Sequelize.INTEGER,
            product_status: Sequelize.SMALLINT,

        }, {
            hooks,
            timestamps: false,
            tableName

        });
        return ProductInventorySchema;
    }

    static get sanitizeAttributes() {
        return ['welcomeMessage'];
    }
}


Object.assign(ProductSpec, CRUDModel(ProductSpec));

export default ProductSpec;