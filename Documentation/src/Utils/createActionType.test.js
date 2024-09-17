import { createActionType } from '.';

describe('Функция createActionType', () => {
  const appName = process.env.REACT_APP_NAME;
  test(`для модуля testmodule с действием load должна вернуть "LOAD/testmodule/${appName}"`, () => {
    expect(createActionType('testmodule', 'load')).toBe(
      `LOAD/testmodule/${appName}`,
    );
  });

  test('без второго аргумента должна выводить ошибку', () => {
    expect(() => createActionType('testmodule')).toThrow();
  });

  test('без первого аргумента должна выводить ошибку', () => {
    expect(() => createActionType(undefined, 'load')).toThrow();
    expect(() => createActionType(null, 'load')).toThrow();
  });
});
