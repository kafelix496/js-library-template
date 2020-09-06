# js-library-template
Javascript library template

## Need to change variables
> recommend: when you change variables, search name and change everything

```
PUBLISH_FILE_NAME : name you want to put when publish
PUBLISH_NAME_FOR_UMD_FORMAT : Name for UMD export

./package.json : 'name', 'description', 'author' 'keywords' property
./scripts/publishIndex : 'customLibrary' -> PUBLISH_FILE_NAME
./package.json : 'customLibrary' -> PUBLISH_FILE_NAME
./package.json : 'CL' -> Name for UMD export
```

## Lint
```
npm run lint
```

## Unit Test
```
npm run test
```

## Build

```
npm run build
```

## Examples
```
es : npm start 
cjs : node index.js
umd : npx serve
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
