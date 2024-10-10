// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';

jest.mock('fs');
jest.mock('fs/promises');
jest.mock('path');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const mockCallback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(mockCallback, timeout);
    expect(mockCallback).not.toBeCalled();

    // Fast-forward time to simulate the timeout being completed
    jest.advanceTimersByTime(timeout);

    expect(mockCallback).toBeCalled(); // Verify that the callback is called after the timeout
    expect(mockCallback).toHaveBeenCalledTimes(1); // Ensure it's called exactly once
  });

  test('should call callback only after timeout', () => {
    const mockCallback = jest.fn(); // Создаем мок-функцию для проверки вызова
    const timeout = 3000; // Устанавливаем таймаут в 3000 мс

    doStuffByTimeout(mockCallback, timeout); // Вызываем функцию с мок-функцией и таймаутом

    expect(mockCallback).not.toBeCalled(); // Проверяем, что функция не вызвана сразу

    // Пропускаем время меньше, чем таймаут
    jest.advanceTimersByTime(timeout - 1000);

    expect(mockCallback).not.toBeCalled(); // Проверяем, что функция все еще не вызвана

    // Пропускаем оставшееся время, чтобы достичь таймаута
    jest.advanceTimersByTime(1000);

    expect(mockCallback).toBeCalled(); // Проверяем, что функция вызвана после таймаута
    expect(mockCallback).toHaveBeenCalledTimes(1); // Проверяем, что функция вызвана ровно один раз
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const mockCallback = jest.fn(); // Создаем мок-функцию
    const interval = 1000; // Устанавливаем интервал в 1000 мс

    doStuffByInterval(mockCallback, interval); // Вызываем функцию с мок-функцией и интервалом

    // Проверяем, что колбек не был вызван сразу
    expect(mockCallback).not.toBeCalled();

    // Пропускаем время на 999 мс
    jest.advanceTimersByTime(999);
    expect(mockCallback).not.toBeCalled(); // Проверяем, что колбек все еще не был вызван

    // Пропускаем 1 мс, чтобы достичь интервала
    jest.advanceTimersByTime(1);
    expect(mockCallback).toBeCalledTimes(1); // Проверяем, что колбек вызван один раз

    // Пропускаем еще 1000 мс, чтобы вызвать колбек второй раз
    jest.advanceTimersByTime(1000);
    expect(mockCallback).toBeCalledTimes(2); // Проверяем, что колбек вызван дважды
  });

  test('should call callback multiple times after multiple intervals', () => {
    const mockCallback = jest.fn();
    const interval = 500;

    doStuffByInterval(mockCallback, interval);

    jest.advanceTimersByTime(2000);
    expect(mockCallback).toBeCalledTimes(4);
  });
});

describe('readFileAsynchronously', () => {
  const pathToFile = 'test.txt';
  const fullPath = join(__dirname, pathToFile);

  beforeEach(() => {
    // Сбрасываем все моки перед каждым тестом
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    await readFileAsynchronously(pathToFile);

    expect(join).toHaveBeenCalledWith(__dirname, pathToFile); // Проверяем, что join был вызван с правильными аргументами
  });

  test('should return null if file does not exist', async () => {
    (existsSync as jest.Mock).mockReturnValue(false);

    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(Buffer.from('file content'));

    const result = await readFileAsynchronously(pathToFile);

    expect(existsSync).toHaveBeenCalledWith(fullPath); // Проверяем, что existsSync был вызван с полным путем
    expect(readFile).toHaveBeenCalledWith(fullPath); // Проверяем, что readFile был вызван с полным путем
    expect(result).toBe('file content'); // Проверяем, что результат равен 'file content'
  });
});
