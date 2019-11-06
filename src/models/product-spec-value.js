import {
    sequelize
} from '../sequelize';
import Sequelize from 'sequelize';
import _ from 'lodash';
import CRUDModel from './crud-model';



export class ProductSpec extends Sequelize.Model {
    static init() {}
    static get name() {
        return 'ProductSpecValue';
    }

    static get getSchema() {
        const tableName = 'tbl_product_spec_value';

        const ProductValueSchema = sequelize.define('ProductSpecValue', {
            product_spec_value_id: {
                type: Sequelize.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },
            product_spec_value_created_on: {
                type: Sequelize.DATE(3),
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
            },
            product_id: Sequelize.BIGINT,
            product_spec_id: Sequelize.BIGINT,
            merchant_id: Sequelize.BIGINT,
            product_value_inventory: Sequelize.STRING,
            product_spec_inventory_status: Sequelize.SMALLINT,
            product_spec_value: Sequelize.STRING,
            product_spec_value_status: Sequelize.SMALLINT,

        }, {
            timestamps: false,
            tableName

        });
        return ProductValueSchema;
    }

    static get sanitizeAttributes() {
        return ['welcomeMessage'];
    }
}


Object.assign(ProductSpec, CRUDModel(ProductSpec));

export default ProductSpec;