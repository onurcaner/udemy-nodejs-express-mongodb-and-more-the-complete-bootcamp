import { describe, expect, it } from 'vitest';

import { parseSortByValue } from './parseSortByValue';

describe('parseSortByValue()', () => {
  describe('return null', () => {
    it('if empty input is passed as argument', () => {
      const expectedResult: ReturnType<typeof parseSortByValue> = null;
      const sortByValue = '';

      const actualResult = parseSortByValue(sortByValue);

      expect(actualResult).toBe(expectedResult);
    });

    it('if input contains single sort field and without the ". dot"', () => {
      const expectedResult: ReturnType<typeof parseSortByValue> = null;
      const sortByValue = 'price';

      const actualResult = parseSortByValue(sortByValue);

      expect(actualResult).toBe(expectedResult);
    });

    it('if input contains single sort field and without the ".asc" OR ".desc"', () => {
      const sortByValues: string[] = [
        'price.inc',
        'price.dec',
        'price.low_to_high',
        'price.high_to_low',
      ];
      const expectedResult: ReturnType<typeof parseSortByValue> = null;
      sortByValues.forEach((sortByValue) => {
        const actualResult = parseSortByValue(sortByValue);

        expect(actualResult).toBe(expectedResult);
      });
    });

    it('if input contains gibberish with "," and ".anything"', () => {
      const sortByValues: string[] = ['.asc', '.desc', '..,,,.,,,.asc,.desc'];
      const expectedResult: ReturnType<typeof parseSortByValue> = null;
      sortByValues.forEach((sortByValue) => {
        const actualResult = parseSortByValue(sortByValue);

        expect(actualResult).toBe(expectedResult);
      });
    });
  });

  describe('return object with single field', () => {
    it('if input contains a single valid sort field', () => {
      {
        const expectedResult: ReturnType<typeof parseSortByValue> = {
          price: 1,
        };
        const sortByValue = 'price.asc';

        const actualValue = parseSortByValue(sortByValue);

        expect(actualValue).toStrictEqual(expectedResult);
      }
      {
        const expectedResult: ReturnType<typeof parseSortByValue> = {
          average_rating: -1,
        };
        const sortByValue = 'average_rating.desc';

        const actualValue = parseSortByValue(sortByValue);

        expect(actualValue).toStrictEqual(expectedResult);
      }
    });

    it('if input contains many but only one valid sort fields', () => {
      const expectedResult: ReturnType<typeof parseSortByValue> = {
        price: 1,
      };
      const sortByValue = ',,price,,price.asc,,.,..,.asc,.desc,,.+,.-,';

      const actualValue = parseSortByValue(sortByValue);

      expect(actualValue).toStrictEqual(expectedResult);
    });
  });

  describe('return object with many fields', () => {
    it('if input contains many valid sort fields', () => {
      const expectedValue: ReturnType<typeof parseSortByValue> = {
        price: 1,
        average_rating: -1,
      };
      const sortByValue = 'price.asc,average_rating.desc';

      const actualResult = parseSortByValue(sortByValue);

      expect(actualResult).toStrictEqual(expectedValue);
    });

    it('if input contains many valid sort fields with many invalid sort fields', () => {
      const expectedValue: ReturnType<typeof parseSortByValue> = {
        price: 1,
        average_rating: -1,
      };
      const sortByValue = ',.,..,stars,,price.asc,average_rating.desc,stars.+';

      const actualResult = parseSortByValue(sortByValue);

      expect(actualResult).toStrictEqual(expectedValue);
    });
  });
});
