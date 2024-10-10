// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 13, b: 2, action: Action.Subtract, expected: 11 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 30, b: 2, action: Action.Subtract, expected: 28 },
  { a: 3, b: 2, action: Action.Divide, expected: 1.5 },
  { a: 30, b: 2, action: Action.Divide, expected: 15 },
  { a: 12, b: 3, action: Action.Divide, expected: 4 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 6, b: 2, action: Action.Multiply, expected: 12 },
  { a: 8, b: 4, action: Action.Multiply, expected: 32 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 9, b: 2, action: Action.Exponentiate, expected: 81 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  // continue cases for other actions
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    '$a $action $b to equal $expected ',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
  // Consider to use Jest table tests API to test all cases above
});
