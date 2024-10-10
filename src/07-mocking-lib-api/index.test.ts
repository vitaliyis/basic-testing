// // Uncomment the code below and write your tests
// This is old version with error in second test
// import axios from 'axios';
// import { throttledGetDataFromApi } from './index';
//
// jest.mock('axios');
//
// describe('throttledGetDataFromApi', () => {
//   const relativePath = '/posts';
//   const mockGet = jest.fn();
//   const mockResponse = { data: { id: 1, title: 'Test' } };
//
//   beforeEach(() => {
//     jest.clearAllMocks();
//     (axios.create as jest.Mock).mockReturnValue({
//       get: mockGet,
//     });
//
//     mockGet.mockResolvedValue(mockResponse);
//   });
//
//   test('should create instance with provided base url', async () => {
//     const baseURL = 'https://jsonplaceholder.typicode.com';
//     await throttledGetDataFromApi(relativePath);
//     expect(axios.create).toHaveBeenCalledWith({ baseURL });
//   });
//
//   test('should perform request to correct provided url', async () => {
//     await throttledGetDataFromApi(relativePath);
//     expect(mockGet).toHaveBeenCalledWith(relativePath);
//   });
//
//   test('should return response data', async () => {
//     const data = await throttledGetDataFromApi(relativePath);
//     expect(data).toEqual(mockResponse.data);
//   });
// });

import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  const baseURL = 'https://jsonplaceholder.typicode.com';
  const relativePath = '/posts';
  const mockGet = jest.fn();
  const mockResponse = { data: { id: 1, title: 'Test' } };

  beforeEach(() => {
    (axios.create as jest.Mock).mockReturnValue({
      get: mockGet,
    });
    mockGet.mockResolvedValue(mockResponse);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers(); // Clears any pending timers
  });

  beforeAll(() => {
    jest.useFakeTimers(); // Use fake timers to control time in tests
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    throttledGetDataFromApi(relativePath);
    jest.runAllTimers(); // Simulate the passage of time to invoke the throttled function
    expect(axios.create).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    throttledGetDataFromApi(relativePath);
    jest.runAllTimers(); // Simulate the passage of time
    expect(mockGet).toHaveBeenCalledWith('/posts');
  });

  test('should return response data', async () => {
    const data = await throttledGetDataFromApi(relativePath);
    jest.runAllTimers(); // Simulate the passage of time
    expect(data).toEqual(mockResponse.data);
  });
});
