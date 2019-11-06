import _ from 'lodash';
import moment from 'moment';
import sanitizeHtml from 'sanitize-html';

const CRUDModel = ModelClass => {
  const getAll = async criteria => {
    const queryCriteria = _.pickBy(criteria, _.identity);
    return ModelClass.query().where(queryCriteria);
  };

  const get = async criteria => {
    const queryCriteria = _.pickBy(criteria, _.identity);
    if (_.isEmpty(queryCriteria)) return null;

    return ModelClass.query()
      .where(queryCriteria)
      .orderBy('updatedAt', 'desc')
      .first();
  };
  
  const getById = async condition => ModelClass.getSchema.findOne({where: condition});

  const exists = async criteria => !!(await ModelClass.get(criteria));

  const sanitize = attributes => {
    const attributesToSanitize = ModelClass.sanitizeAttributes;
    if (!attributesToSanitize) return attributes;

    const sanitized = {};
    attributesToSanitize.forEach(attrName => {
      if (attributes[attrName])
        sanitized[attrName] = sanitizeHtml(attributes[attrName]);
    });
    return { ...attributes, ...sanitized };
  };

  const create = async attributes => {
    const attrs = ModelClass.sanitize(attributes);
    return ModelClass.query()
      .insert(attrs)
      .returning('*');
  };

  const update = async attributes => {
    let attrs = _.omit(attributes, 'id');
    attrs = ModelClass.sanitize(attrs);
    attrs.updatedAt = moment.utc();
    return ModelClass.query().updateAndFetchById(attributes.id, attrs);
  };

  return { get, getAll, getById, exists, create, update, sanitize };
};

export default CRUDModel;
