const typeParsers = {
  string: (value) => value,
  int: Number.parseInt,
  float: Number.parseFloat,
  boolean: (value) => value === 'true',
  array: (value) => value.split(','),
};

export const parseArgs = (schema) => (args) => (
  args.reduce((consolidatedOptions, arg) => {
    try {
      const [option, value] = arg.split('=');
      const optionType = schema[option];
      const parser = typeParsers[optionType];
      const parsedValue = parser(value);
      return { ...consolidatedOptions, [option]: parsedValue };
    } catch (error) {
      throw new Error(`Invalid argument: ${arg}`);
    }
  }, {})
);
