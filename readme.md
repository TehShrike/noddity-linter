Lint a directory full of [Noddity](http://noddity.com) posts to verify that they will render.

# CLI

```sh
noddity-linter "./content/" ""
```

`noddity-linter noddityRootPath [glob pattern]`

If any files have errors, logs hopefully-useful things to stdout and returns a non-zero exit code.

## Programmatic

```js
const lintPromise = noddityLinter(noddityRootPath, [glob pattern], [data object to pass to renderer], [template post])
```

- `noddityRootPath` - the path to the root Noddity directory
- `glob pattern` - a string to be passed to [glob](https://www.npmjs.com/package/glob) to match posts to be tested.  Defaults to `**/*.m?(m)d`
- `data object` - to be passed to [validate-noddity-post](https://github.com/TehShrike/validate-noddity-post) to render the posts with.  Defaults to `{}`
- `template post` - I actually can't think of a reason why you'd need to override this for linting purposes, but here we are

Returns a promise that resolves to an array with one object element per post checked.  The object has a `filePath` property describing the path of the file checked, and an optional `error` property if there were any issues found while trying to render the file.

## License

[WTFPL](http://wtfpl2.com/)
