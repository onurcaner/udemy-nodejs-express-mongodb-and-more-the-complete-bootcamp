import { describe, expect, it } from 'vitest';

import { NumberFilter } from '../_constants/NumberFilter';
import { transformNumberFilterIntoMongoFilterOperators } from './transformNumberFilterIntoMongoFilterOperators';

type ExpectedResult = ReturnType<
  typeof transformNumberFilterIntoMongoFilterOperators
>;

describe('transformNumberFilterIntoMongoFilterOperators()', () => {
  describe('return $eq', () => {
    it('if input is string', () => {
      const expectedResult: ExpectedResult = {
        $eq: 20,
      };
      const numberFilter = '20';

      const actualValue =
        transformNumberFilterIntoMongoFilterOperators(numberFilter);

      expect(actualValue).toStrictEqual(expectedResult);
    });
  });

  describe('return $lt OR $lte', () => {
    it('if input is lt', () => {
      const expectedResult: ExpectedResult = {
        $lt: 20,
      };
      const numberFilter: NumberFilter = { lt: '20' };

      const actualValue =
        transformNumberFilterIntoMongoFilterOperators(numberFilter);

      expect(actualValue).toStrictEqual(expectedResult);
    });

    it('if input is lte', () => {
      const expectedResult: ExpectedResult = {
        $lte: 20,
      };
      const numberFilter: NumberFilter = { lte: '20' };

      const actualValue =
        transformNumberFilterIntoMongoFilterOperators(numberFilter);

      expect(actualValue).toStrictEqual(expectedResult);
    });
  });

  describe('return $gt OR $gte', () => {
    it('if input is gt', () => {
      const expectedResult: ExpectedResult = {
        $gt: 20,
      };
      const numberFilter: NumberFilter = { gt: '20' };

      const actualValue =
        transformNumberFilterIntoMongoFilterOperators(numberFilter);

      expect(actualValue).toStrictEqual(expectedResult);
    });

    it('if input is gte', () => {
      const expectedResult: ExpectedResult = {
        $gte: 20,
      };
      const numberFilter: NumberFilter = { gte: '20' };

      const actualValue =
        transformNumberFilterIntoMongoFilterOperators(numberFilter);

      expect(actualValue).toStrictEqual(expectedResult);
    });
  });

  describe('return both $lt OR $lte AND $gt OR $gte', () => {
    it('if input is gt lt', () => {
      const expectedResult: ExpectedResult = {
        $gt: 10,
        $lt: 20,
      };
      const numberFilter: NumberFilter = { gt: '10', lt: '20' };

      const actualValue =
        transformNumberFilterIntoMongoFilterOperators(numberFilter);

      expect(actualValue).toStrictEqual(expectedResult);
    });

    it('if input is gte lt', () => {
      const expectedResult: ExpectedResult = {
        $gte: 10,
        $lt: 20,
      };
      const numberFilter: NumberFilter = { gte: '10', lt: '20' };

      const actualValue =
        transformNumberFilterIntoMongoFilterOperators(numberFilter);

      expect(actualValue).toStrictEqual(expectedResult);
    });

    it('if input is gt lte', () => {
      const expectedResult: ExpectedResult = {
        $gt: 10,
        $lte: 20,
      };
      const numberFilter: NumberFilter = { gt: '10', lte: '20' };

      const actualValue =
        transformNumberFilterIntoMongoFilterOperators(numberFilter);

      expect(actualValue).toStrictEqual(expectedResult);
    });

    it('if input is gte lte', () => {
      const expectedResult: ExpectedResult = {
        $gte: 10,
        $lte: 20,
      };
      const numberFilter: NumberFilter = { gte: '10', lte: '20' };

      const actualValue =
        transformNumberFilterIntoMongoFilterOperators(numberFilter);

      expect(actualValue).toStrictEqual(expectedResult);
    });
  });
});
