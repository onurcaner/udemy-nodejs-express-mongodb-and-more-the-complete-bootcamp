import { readFileSync } from 'fs';

import { ROOT_FILE_PATH } from './config';

export interface ProductAttributes {
  id: number;
  productName: string;
  image: string;
  from: string;
  nutrients: string;
  quantity: string;
  price: string;
  organic: boolean;
  description: string;
}

export const products = ((): ProductAttributes[] => {
  try {
    const json = readFileSync(`${ROOT_FILE_PATH}/data/data.json`, {
      encoding: 'utf8',
    });
    const data = JSON.parse(json) as ProductAttributes[];
    return data;
  } catch (error) {
    console.error('data.json can not be parsed');
    return [];
  }
})();
