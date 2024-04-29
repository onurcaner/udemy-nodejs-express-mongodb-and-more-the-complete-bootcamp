import { ProductAttributes } from '../../products';

export const productTemplateMap: Record<keyof ProductAttributes, string> = {
  id: '{%PRODUCT_ID%}',
  productName: '{%PRODUCT_NAME%}',
  image: '{%IMAGE%}',
  from: '{%FROM%}',
  nutrients: '{%NUTRIENTS%}',
  quantity: '{%QUANTITY%}',
  price: '{%PRICE%}',
  organic: '{%NOT_ORGANIC%}',
  description: '{%DESCRIPTION%}',
};
