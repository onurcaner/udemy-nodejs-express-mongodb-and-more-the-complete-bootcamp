import { describe, expect, test } from 'vitest';

import { NumberFilter } from '../_constants/NumberFilter';
import { transformNumberFilterIntoMongoFilterOperators } from './transformNumberFilterIntoMongoFilterOperators';

type ExpectedResult = ReturnType<
  typeof transformNumberFilterIntoMongoFilterOperators
>;

describe('transformNumberFilterIntoMongoFilterOperators()', () => {
  describe('return $eq', () => {
    test('if input is string representing a number', () => {
      // Arrange
      const expectedResult: ExpectedResult = {
        $eq: 20,
      };
      const numberFilter = '20';

      // Act
      const actualValue =
        transformNumberFilterIntoMongoFilterOperators(numberFilter);

      // Assert
      expect(actualValue).toStrictEqual(expectedResult);
    });
  });

  describe('return $lt OR $lte', () => {
    test('if input is lt', () => {
      // Arrange
      const expectedResult: ExpectedResult = {
        $lt: 20,
      };
      const numberFilter: NumberFilter = { lt: '20' };

      // Act
      const actualValue =
        transformNumberFilterIntoMongoFilterOperators(numberFilter);

      // Assert
      expect(actualValue).toStrictEqual(expectedResult);
    });

    test('if input is lte', () => {
      // Arrange
      const expectedResult: ExpectedResult = {
        $lte: 20,
      };
      const numberFilter: NumberFilter = { lte: '20' };

      // Act
      const actualValue =
        transformNumberFilterIntoMongoFilterOperators(numberFilter);

      // Assert
      expect(actualValue).toStrictEqual(expectedResult);
    });
  });

  describe('return $gt OR $gte', () => {
    test('if input is gt', () => {
      // Arrange
      const expectedResult: ExpectedResult = {
        $gt: 20,
      };
      const numberFilter: NumberFilter = { gt: '20' };

      // Act
      const actualValue =
        transformNumberFilterIntoMongoFilterOperators(numberFilter);

      // Assert
      expect(actualValue).toStrictEqual(expectedResult);
    });

    test('if input is gte', () => {
      // Arrange
      const expectedResult: ExpectedResult = {
        $gte: 20,
      };
      const numberFilter: NumberFilter = { gte: '20' };

      // Act
      const actualValue =
        transformNumberFilterIntoMongoFilterOperators(numberFilter);

      // Assert
      expect(actualValue).toStrictEqual(expectedResult);
    });
  });

  describe('return both $lt OR $lte AND $gt OR $gte', () => {
    test('if input is gt lt', () => {
      // Arrange
      const expectedResult: ExpectedResult = {
        $gt: 10,
        $lt: 20,
      };
      const numberFilter: NumberFilter = { gt: '10', lt: '20' };

      // Act
      const actualValue =
        transformNumberFilterIntoMongoFilterOperators(numberFilter);

      // Assert
      expect(actualValue).toStrictEqual(expectedResult);
    });

    test('if input is gte lt', () => {
      // Arrange
      const expectedResult: ExpectedResult = {
        $gte: 10,
        $lt: 20,
      };
      const numberFilter: NumberFilter = { gte: '10', lt: '20' };

      // Act
      const actualValue =
        transformNumberFilterIntoMongoFilterOperators(numberFilter);

      // Assert
      expect(actualValue).toStrictEqual(expectedResult);
    });

    test('if input is gt lte', () => {
      // Arrange
      const expectedResult: ExpectedResult = {
        $gt: 10,
        $lte: 20,
      };
      const numberFilter: NumberFilter = { gt: '10', lte: '20' };

      // Act
      const actualValue =
        transformNumberFilterIntoMongoFilterOperators(numberFilter);

      // Assert
      expect(actualValue).toStrictEqual(expectedResult);
    });

    test('if input is gte lte', () => {
      // Arrange
      const expectedResult: ExpectedResult = {
        $gte: 10,
        $lte: 20,
      };
      const numberFilter: NumberFilter = { gte: '10', lte: '20' };

      // Act
      const actualValue =
        transformNumberFilterIntoMongoFilterOperators(numberFilter);

      // Assert
      expect(actualValue).toStrictEqual(expectedResult);
    });
  });
});
