import { Pipe, PipeTransform } from '@angular/core';
import { __uniques } from '@shared/utils';

@Pipe({ name: 'search' })
export class SearchPipe implements PipeTransform {
  transform(items: any[] | null, searchValue: string, keys: string[] = []): any[] | undefined {
    if (!items?.length) {
      return [];
    }

    // In the case the 'items' are primitive values
    if (items.every(item => typeof item !== 'object')) {
      return !keys?.length ? items.filter((item: string) => this._regexSearch(item, searchValue)) : [];
    }

    if (!keys.every(key => Object.keys(items[0]).includes(key))) {
      return [];
    }

    return keys?.reduce((results: any[], key) => {
      const nestedResults = items.filter(item => {
        const nestedItemValue = key
          .split('.')
          .reduce((itemValue: any, innerKey) => (itemValue = item[innerKey] || itemValue[innerKey]), undefined);

        return this._regexSearch(nestedItemValue, searchValue);
      });

      return __uniques([...results, ...nestedResults]);
    }, []);
  }

  // Not the best RegExp but will do the work for now 😉
  private _regexSearch = (item: string, searchValue: string): boolean => new RegExp(searchValue, 'gi').test(item);
}
