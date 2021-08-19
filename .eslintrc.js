module.exports = {
    extends: [
        "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
        "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        "plugin:prettier/recommended"
    ],
    rules: {
        // A temporary hack related to IDE not resolving correct package.json
        "import/no-extraneous-dependencies": "off",
        "react/display-name": ["off"],
        "prefer-template": ["error"],
        "@typescript-eslint/ban-ts-comment": ["off"],
        "@typescript-eslint/explicit-function-return-type": [
            "warn",
            {
                allowExpressions: true
            }
        ],
        "prettier/prettier": [
            "error",
            {
                tabWidth: 4,
                trailingComma: "none",
                printWidth: 100
            }
        ],
        "linebreak-style": ["error", "unix"],
        quotes: ["error", "double"],
        semi: ["error", "always"]
    },
    plugins: ["react", "@typescript-eslint", "prettier"],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
        createDefaultProgram: true
    },
    settings: {
        "import/resolver": {
            // See https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line below
            node: {},
            webpack: {
                config: require.resolve("./.erb/configs/webpack.config.eslint.js")
            }
        },
        "import/parsers": {
            "@typescript-eslint/parser": [".ts", ".tsx"]
        }
    }
};
