import * as _ from 'lodash/fp';

const args: { [key: string]: string } = _.pipe(
  _.map((value: string) => {
    if (!value.startsWith('--')) {
      return undefined;
    }

    const index = value.indexOf('=', 2);

    if (index < 0) {
      return undefined;
    }

    return [value.substring(2, index), value.substring(index + 1)];
  }),
  _.filter((value) => value !== undefined),
  _.fromPairs,
)(process.argv);

export function required(key: string): string {
  const result = args[key];

  if (result === undefined) {
    throw new TypeError(`Argument ${key} not found`);
  }

  return result;
}

export function optional(key: string): string | undefined {
  return args[key];
}
