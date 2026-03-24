import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import unusedImports from 'eslint-plugin-unused-imports'

export default [
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      sourceType: "module",
      globals: {
        document: "readonly",
        window: "readonly",
        console: "readonly",
        localStorage: 'readonly',
        atob: 'readonly',
        HTMLElement: 'readonly',
        HTMLInputElement: 'readonly',
        React: 'readonly',
        File: 'readonly',
        URL: 'readonly',
      }
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "react": react,
      "react-hooks": reactHooks,
      "prettier": prettier,
      'unused-imports': unusedImports,
    },
    rules: {
      'no-unused-vars': 'off',
      "prettier/prettier": "error",
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        { vars: 'all', varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
      ],
      "@typescript-eslint/no-unused-vars": "warn"
    }
  },
  prettierConfig
];
