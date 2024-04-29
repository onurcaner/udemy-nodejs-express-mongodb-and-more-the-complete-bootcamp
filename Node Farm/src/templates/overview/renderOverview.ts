import { readFile } from 'node:fs/promises';

import { ROOT_FILE_PATH } from '../../config';
import { overviewTemplateMap } from './overviewTemplateMap';
import { renderCards } from './renderCards';

export async function renderOverview(): Promise<string> {
  const html = (
    await readFile(
      `${ROOT_FILE_PATH}/src/templates/overview/overview-template.html`,
      { encoding: 'utf8' },
    )
  ).replaceAll(overviewTemplateMap.productCards, await renderCards());

  return html;
}
