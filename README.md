# Senior C++ Dev learns Javascript

## TODO

- async javascript
  - callbacks
  - futures
  - ....
- example projects to test my knowledge

## Stream notes

Run tests using:
```
npm run test
```

### Typescript compiler

- if files are manually specified for `tsc` it will ignore the `tsconfig.json` file

### Typescript notes

- type system relies on interface based types
  - objects that satisfy an interface are of that type
  - unlike Go, itnerfaces can include attributes, not just methods
  - kinda similar C++20 concepts

- formatting strings `"kdskdnaksnd ${expr}"`
- tuples are similar to C++ template magic, but instead work like arrays (indexed directly)
- enum
  - elements of an enum have values of type number
  - enum is indexed for accessing the labels (strings)

- `unknown` for a typed variant
- `any` for an untyped variant

- because `obj.property` is also accessible through `obj["property"]`, all properties of an interface, need to match the return type of `string` subscript operator if one is present

## Questions?

- Where do I specify what version of javascript am I targetting?
- bigint vs number `let a : bigint = 10;`
  - Are all number literals floats?
- What is actually happening when checking for presence of optional property?
  - Is it equivalent to `if (! obj.property === undefined)`?
- Why is assignment of function as `Counter` ok, but doing the same idea with a number of string does not work. https://www.typescriptlang.org/docs/handbook/interfaces.html#hybrid-types
- Is it possible to initialize an enum member using an input from the user / any dynamic input?
- how exactly does `keyof` work / what does it do?