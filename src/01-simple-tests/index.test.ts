// Uncomment the code below and write your tests
// import { simpleCalculator, Action } from './index';

import { simpleCalculator } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 2, action: '+' })).toBe(4);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 10, b: 2, action: '-' })).toBe(8);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 6, action: '*' })).toBe(30);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 10, b: 2, action: '/' })).toBe(5);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 2, action: '^' })).toBe(9);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 3, b: 2, action: '&' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '3', b: 2, action: '-' })).toBeNull();
  });
});
