// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = await resolveValue(5);
    expect(value).toBe(5);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const value = 'Error';
    const result = () => throwError(value);
    expect(result).toThrow(value);
  });

  test('should throw error with default message if message is not provided', () => {
    const result = () => throwError();
    expect(result).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    const result = () => throwCustomError();
    expect(result).toThrow(MyAwesomeError);
  });

  test('should have the correct error message', () => {
    try {
      throwCustomError();
    } catch (e) {
      const error = e as MyAwesomeError;
      expect(error).toBeInstanceOf(MyAwesomeError);
      expect(error.message).toBe('This is my awesome custom error!');
    }
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    const result = rejectCustomError();
    await expect(result).rejects.toThrow(MyAwesomeError);
  });

  it('should have the correct error message', async () => {
    try {
      await rejectCustomError();
    } catch (e) {
      const error = e as MyAwesomeError;
      expect(error).toBeInstanceOf(MyAwesomeError);
      expect(error.message).toBe('This is my awesome custom error!');
    }
  });
});
