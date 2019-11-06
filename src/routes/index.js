import expressRouter from 'express-promise-router';
import productRouter from '../products';
import productspec from '../products/productspec';


const router = expressRouter();
router.use('/product', productRouter);
router.use('/productspec', productspec);

export default router;
