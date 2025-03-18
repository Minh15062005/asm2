import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-unused-vars":"error", /* Khai báo biến nhưng không dùng: typescript-eslint */
      "no-unused-vars": ["error"], /* Khai báo biến nhưng không dùng */ /*off warn error */
      "no-console": ["warn"], /* Không sử dụng console */
      "no-debugger": ["error"], /* Không sử dụng debugger */
      "no-trailing-spaces": ["error"], /* Xóa các khoảng trắng không cần thiết ở cuối mỗi dòng */
      "no-multiple-empty-lines": ["error", { "max": 1 }], /** Không được xuống dòng 2 lần */
      "semi": ["off", "always"], /* Không bắt buộc đấu chấm phẩy */
      "eol-last": ["error", "always"], /* Bắt buộc phải có 1 dòng cuối file */
    //   "quotes": ["error", "single"], /* Cho phép sử dụng dấu nháy đơn hay nháy kép hay `` */
      "indent": ["error", 2], /* Quy định về thụt lề */
      "brace-style": ["error", "1tbs"], /* Sử dụng dấu ngoặc trên cùng 1 dòng; stroustrup: sử dụng dấu ngoặc ở dòng mới */
      "@typescript-eslint/no-explicit-any": "warn", /**Cho phép sử dụng any hay không */
    },
  },
)
