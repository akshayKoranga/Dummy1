import expressRouter from 'express-promise-router';
import { ProductSpec } from '../models/product-spec-type';
import CRUDRouter from '../routes/crud-router';

const router = expressRouter();
const crudRouter = CRUDRouter(ProductSpec);

router.get('/', crudRouter.getById);

export default router;
