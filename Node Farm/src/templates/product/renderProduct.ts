import { readFile } from 'node:fs/promises';

import { ROOT_FILE_PATH } from '../../config';
import { ProductAttributes, products } from '../../products';
import { productTemplateMap } from './productTemplateMap';

export async function renderProduct(id: number): Promise<string> {
  const product = products.find((product) => product.id === id);
  if (!product) throw new Error('Product does not exist');

  let html = await readFile(
    `${ROOT_FILE_PATH}/src/templates/product/product-template.html`,
    { encoding: 'utf8' },
  );

  const entries = Object.entries(productTemplateMap) as [
    keyof ProductAttributes,
    string,
  ][];
  entries.forEach(([key, identifier]) => {
    const value = product[key];

    if (key === 'organic') {
      html = html.replaceAll(
        productTemplateMap.organic,
        value ? '' : 'not-organic',
      );
    }

    if (typeof value === 'boolean') return;
    html = html.replaceAll(identifier, String(product[key]));
  });

  return html;
}
