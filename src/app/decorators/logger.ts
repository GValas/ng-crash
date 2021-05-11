export function logger() {
  return function (
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const targetMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      console.log(
        [
          '%c>',
          new Date().toISOString().replace('T', ' ').replace('Z', ''),
          propertyKey,
        ].join(' '),

        ['background-color: lightgrey', 'color: blue'].join(';')
      );
      return targetMethod.apply(this, args);
    };
    return descriptor;
  };
}
