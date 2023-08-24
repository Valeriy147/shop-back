import { PRODUCTS_REPOSITORY } from '../constants/products.constants';
import { Product } from '../../schemas/product.schema';

export const ProductsProviders = [
  {
    provide: PRODUCTS_REPOSITORY,
    useValue: Product,
  },
];
