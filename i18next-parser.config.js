export default {
    locales: ['en'],
    output: 'lang/$LOCALE.json',
    keySeparator: '.',
    namespaceSeparator: false,
    createOldCatalogs: false,
    lexers: {
        hbs: ['HandlebarsLexer'],
        js: [
            {
                lexer: 'JavascriptLexer',
                functions: ['t'],
            }
        ],
        ts: [
            {
                lexer: 'JavascriptLexer',
                functions: ['t'],
            }
        ],
    },
    defaultValue: (lng, ns, key) => {
        if (lng === 'en') {
            return key;
        }
        return '';
    },
    sort: true,
  };
  