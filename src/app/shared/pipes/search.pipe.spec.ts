import { SearchPipe } from './search.pipe';

describe('SearchPipe', () => {
  let pipe: SearchPipe;

  beforeEach(() => {
    pipe = new SearchPipe();
  });

  it('create a pipe instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('for invalid parameters', () => {
    it('should return an empty array', () => {
      expect(pipe.transform([], '')).toEqual([]);
      expect(pipe.transform(null, '')).toEqual([]);
      expect(pipe.transform(['foo', 'bar'], '', ['id'])).toEqual([]);
    });
  });

  describe('for an array of primitive values (strings, numbers)', () => {
    const example1 = ['Hello', 'World'];
    const example2 = [20, 50, 100];

    const testCases = [
      {
        parameters: [example1, 'hell'],
        expectedResult: ['Hello']
      },
      {
        parameters: [example1, ''],
        expectedResult: example1
      },
      {
        parameters: [example1, 'invalid'],
        expectedResult: []
      },
      {
        parameters: [example2, '2'],
        expectedResult: [20]
      }
    ];

    testCases.forEach(testCase => {
      const { parameters, expectedResult } = testCase;
      const [items, searchValue] = parameters;

      it(`should return: '[${expectedResult.toString()}]' while searching: '${searchValue}' inside the array: '[${items.toString()}]'`, () => {
        expect(pipe.transform(items as string[], searchValue as string)).toEqual(expectedResult);
      });
    });
  });

  describe('for an array of object values', () => {
    const example = [
      { id: 1, value: 'Hello', text: 'World' },
      { id: 2, value: 'Foo', text: 'Bar' }
    ];
    const keys = ['value', 'text'];

    const testCases = [
      {
        parameters: [example, 'hell', ['value']],
        expectedResult: [example[0]]
      },
      {
        parameters: [example, 'hell', keys],
        expectedResult: [example[0]]
      },
      {
        parameters: [example, '', keys],
        expectedResult: example
      },
      {
        parameters: [example, 'o', keys],
        expectedResult: example
      },
      {
        parameters: [example, 'invalid search', keys],
        expectedResult: []
      }
    ];

    testCases.forEach(testCase => {
      const { parameters, expectedResult } = testCase;
      const [items, searchValue, parameterKeys] = parameters;

      const expectedText = expectedResult.map(obj => JSON.stringify(obj));
      const itemsText = (items as { [key: string]: any }[]).map(obj => JSON.stringify(obj));

      it(`should return: '[${expectedText}]' while searching: '${searchValue}' for properties: '${parameterKeys.toString()}' inside the array: '[${itemsText}]'`, () => {
        expect(pipe.transform(items as string[], searchValue as string, parameterKeys as string[])).toEqual(
          expectedResult
        );
      });
    });
  });
});
