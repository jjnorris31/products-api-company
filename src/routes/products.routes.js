import {Router} from 'express';
const router = Router();
import * as productController from "../controllers/products.controller";
import { verifyToken, isModerator } from '../middlewares/authJwt';

router.get('/', productController.getProducts);
router.post('/', [verifyToken, isModerator], productController.createProduct);
router.get('/:productId', productController.getProductById);
router.put('/:productId', verifyToken, productController.updateProductById);
router.delete('/:productId', verifyToken, productController.deleteProductById);

export default router;
