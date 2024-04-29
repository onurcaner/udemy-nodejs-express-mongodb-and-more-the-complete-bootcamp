import { readFile } from 'node:fs/promises';

import { ROOT_FILE_PATH } from '../../config';
import { products } from '../../products';
import { productTemplateMap } from '../product/productTemplateMap';

export async function renderCards(): Promise<string> {
  const cardTemplate = await readFile(
    `${ROOT_FILE_PATH}/src/templates/overview/overview-card-template.html`,
    { encoding: 'utf8' },
  );

  const cardsHtml = products
    .map((product): string => {
      let card = cardTemplate;
      const entries = Object.entries(productTemplateMap) as [
        keyof typeof productTemplateMap,
        string,
      ][];
      entries.forEach(([key, identifier]): void => {
        if (!product.organic)
          card = card.replaceAll(productTemplateMap.organic, 'not-organic');
        if (product.organic)
          card = card.replaceAll(productTemplateMap.organic, '');

        if (typeof product[key] === 'boolean') return;
        card = card.replaceAll(identifier, String(product[key]));
      });

      return card;
    })
    .join('');

  return cardsHtml;
}
