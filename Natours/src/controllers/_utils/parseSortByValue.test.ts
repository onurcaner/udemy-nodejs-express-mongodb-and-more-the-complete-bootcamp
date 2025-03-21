import { describe, expect, test } from 'vitest';

import { parseSortByValue } from './parseSortByValue';

describe('parseSortByValue()', () => {
  describe('return null', () => {
    test('input string is empty string', () => {
      // Arrange
      const expectedResult: ReturnType<typeof parseSortByValue> = null;
      const sortByValue = '';

      //Act
      const actualResult = parseSortByValue(sortByValue);

      // Assert
      expect(actualResult).toBe(expectedResult);
    });

    test('input string contains single sort field AND without the ". dot"', () => {
      const expectedResult: ReturnType<typeof parseSortByValue> = null;
      const sortByValue = 'price';

      const actualResult = parseSortByValue(sortByValue);

      expect(actualResult).toBe(expectedResult);
    });

    test.each([
      { sortByValue: 'price.inc' },
      { sortByValue: 'price.dec' },
      { sortByValue: 'price.low_to_high' },
      { sortByValue: 'price.high_to_low' },
    ])(
      'input: $sortByValue contains incorrect sortBy enum',
      ({ sortByValue }) => {
        // Arrange
        const expectedResult: ReturnType<typeof parseSortByValue> = null;

        // Act
        const actualResult = parseSortByValue(sortByValue);

        // Assert
        expect(actualResult).toBe(expectedResult);
      },
    );

    test.each([
      { sortByValue: '.asc' },
      { sortByValue: '.desc' },
      { sortByValue: '..,,,.,,,.asc,.desc' },
    ])('input: $sortByValue lack sortByField', ({ sortByValue }) => {
      // Arrange
      const expectedResult: ReturnType<typeof parseSortByValue> = null;

      // Act
      const actualResult = parseSortByValue(sortByValue);

      // Assert
      expect(actualResult).toBe(expectedResult);
    });
  });

  describe('return object with single field', () => {
    test.each<{
      sortByValue: string;
      expectedResult: ReturnType<typeof parseSortByValue>;
    }>([
      { sortByValue: 'price.asc', expectedResult: { price: 1 } },
      {
        sortByValue: 'average_rating.desc',
        expectedResult: { average_rating: -1 },
      },
    ])(
      'if input: $sortByValue contains a single valid sort field',
      ({ sortByValue, expectedResult }) => {
        // Act
        const actualValue = parseSortByValue(sortByValue);

        // Assert
        expect(actualValue).toStrictEqual(expectedResult);
      },
    );

    test('if input contains many but only one valid sort fields', () => {
      // Arrange
      const expectedResult: ReturnType<typeof parseSortByValue> = {
        price: 1,
      };
      const sortByValue =
        ',,price,,price.asc,,.,..,.asc,.desc,,price.+,price.-,';

      // Act
      const actualValue = parseSortByValue(sortByValue);

      // Assert
      expect(actualValue).toStrictEqual(expectedResult);
    });
  });

  describe('return object with many fields', () => {
    test('if input contains many valid sort fields', () => {
      // Arrange
      const expectedValue: ReturnType<typeof parseSortByValue> = {
        price: 1,
        average_rating: -1,
      };
      const sortByValue = 'price.asc,average_rating.desc';

      // Act
      const actualResult = parseSortByValue(sortByValue);

      // Assert
      expect(actualResult).toStrictEqual(expectedValue);
    });

    test('if input contains many valid sort fields with many invalid sort fields', () => {
      // Arrange
      const expectedValue: ReturnType<typeof parseSortByValue> = {
        price: 1,
        average_rating: -1,
      };
      const sortByValue = ',.,..,stars,,price.asc,average_rating.desc,stars.+';

      // Act
      const actualResult = parseSortByValue(sortByValue);

      // Assert
      expect(actualResult).toStrictEqual(expectedValue);
    });
  });
});
