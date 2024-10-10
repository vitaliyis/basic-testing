// Uncomment the code below and write your tests
import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError, SynchronizationFailedError,
  TransferFailedError,
} from '.';
import { random } from 'lodash';

jest.mock('lodash', () => ({
  random: jest.fn(),
}));

describe('BankAccount', () => {
  const initialBalance = 100;
  const initialOtherBalance = 120;
  let bankAccount: BankAccount;
  let otherAccount: BankAccount;

  beforeEach(() => {
    bankAccount = getBankAccount(initialBalance);
    otherAccount = getBankAccount(initialOtherBalance);
  });

  test('should create account with initial balance', () => {
    expect(bankAccount).toBeInstanceOf(BankAccount);
    expect(bankAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const result = () => bankAccount.withdraw(150);
    expect(result).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const result = () => bankAccount.transfer(150, otherAccount);
    expect(result).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const result = () => bankAccount.transfer(150, bankAccount);
    expect(result).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    bankAccount.deposit(50);
    const result = bankAccount.getBalance();
    expect(result).toBe(initialBalance + 50);
  });

  test('should withdraw money', () => {
    bankAccount.withdraw(60);
    const result = bankAccount.getBalance();
    expect(result).toBe(40);
  });

  test('should transfer money', () => {
    bankAccount.transfer(70, otherAccount);
    const resultBankAccount = bankAccount.getBalance();
    const resultOtherAccount = otherAccount.getBalance();
    expect(resultBankAccount).toBe(30);
    expect(resultOtherAccount).toBe(190);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const expectedBalance = 50;
    (random as jest.Mock).mockReturnValue(expectedBalance);
    const balance = await bankAccount.fetchBalance();
    expect(balance).toBe(expectedBalance);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const newBalance = 50;
    (random as jest.Mock).mockReturnValue(newBalance);

    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(newBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const newBalance = null;
    (random as jest.Mock).mockReturnValue(newBalance);

    const result = bankAccount.synchronizeBalance();
    await expect(result).rejects.toThrow(SynchronizationFailedError);
  });
});
