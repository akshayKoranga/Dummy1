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
        const tableName = 'tbl_product_spec_types';

        const ProductSpecSchema = sequelize.define('ProductSpecType', {
            product_spec_id: {
                type: Sequelize.BIGINT,
                autoIncrement: true,
                primaryKey: true
            },
            product_spec_created_on: {
                type: Sequelize.DATE(3),
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3)'),
            },
            product_spec_type_values: Sequelize.STRING,
            product_spec_name: Sequelize.STRING,
            product_spec_authorized: Sequelize.SMALLINT,
            product_spec_status: Sequelize.SMALLINT,

        }, {
            timestamps: false,
            tableName

        });
        return ProductSpecSchema;
    }

    static get sanitizeAttributes() {
        return ['welcomeMessage'];
    }
}


Object.assign(ProductSpec, CRUDModel(ProductSpec));

export default ProductSpec;