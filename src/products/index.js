import expressRouter from 'express-promise-router';
import { Product } from '../models/product';
import CRUDRouter from '../routes/crud-router';
import { ChainableTemporaryCredentials } from 'aws-sdk';

const router = expressRouter();
const crudRouter = CRUDRouter(Product);

router.get('/', crudRouter.getById);

router.get('/all', crudRouter.getById);


export default router;
ChainableTemporaryCredentials          

// chetan.patil@forgehead.io
// archna.jadhav@forgehead.io