import _ from 'lodash';
import createError from 'http-errors';
import log from '../log';

const CRUDRouter = Model => {
  const getById = async (req, res) => {
    try {
      // console.log(arguments)
      // console.log(req.params.id)
      const resource = await Model.getById(req.params.id);
      if (!resource) {
        return res.status(404).send({ error: `${Model.name} Not Found` });
      }
      return res.status(200).send(resource);
    } catch (err) {
      // log.error(err);
      console.log(err);
      
      return res.status(400).send({ error: `Error fetching ${Model.name}` });
    }
  };

  const getAll = async (req, res) => {
    try {
      const resources = await Model.getAll(req.query);
      return res.status(200).send({ items: resources });
    } catch (err) {
      log.error(err);
      return res.status(400).send({ error: `Error fetching ${Model.name}` });
    }
  };

  const create = async (req, res) => {
    try {
      const reqAttributes = req.body;
      const newResource = await Model.create(reqAttributes);
      return res.status(201).send(newResource);
    } catch (err) {
      log.error(err);
      return res.status(400).send({ error: `Error creating ${Model.name}` });
    }
  };

  const update = async (req, res) => {
    try {
      const resourceExists = Model.exists({ id: req.params.id });
      if (!resourceExists) {
        return res.status(404).send({ error: `${Model.name} Not Found` });
      }

      const reqAttributes = req.body;
      const resource = await Model.update({
        id: req.params.id,
        ...reqAttributes
      });
      return res.status(200).send(resource);
    } catch (err) {
      log.error(err);
      return res
        .status(400)
        .send({ error: `Error updating ${Model.name}. ${err.message}` });
    }
  };

  const checkDuplicate = (attributeNames = []) => async (req, res, next) => {
    const attrsToCheck = _.pick(req.body, attributeNames);
    const duplicateResource = await Model.get(attrsToCheck);
    const currentResourceId = Number(req.params.id);
    if (
      duplicateResource &&
      (!currentResourceId || currentResourceId !== duplicateResource.id)
    )
      return next(
        new createError.BadRequest(
          `Another ${
            Model.name
          } exists with similar attributes (${attributeNames.join(',')})`
        )
      );

    return next();
  };

  return { getById, getAll, create, update, checkDuplicate };
};

export default CRUDRouter;
