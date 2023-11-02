module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
    },
    settings: {
        react: { version: "detect" },
        "import/resolver": {
            node: {
                paths: ["src"],
                extensions: [".js", ".jsx", ".ts", ".tsx"],
            },
        },
    },
    env: {
        browser: true,
        es2021: true,
        amd: true,
        node: true,
    },
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:react/recommended"],
    plugins: ["react"],
    rules: {
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/consistent-type-imports": "off",
        "@typescript-eslint/strict-boolean-expressions": "off",
        "@typescript-eslint/restrict-template-expressions": "off",
        "@typescript-eslint/no-explicit-any": "off",
    },
};
