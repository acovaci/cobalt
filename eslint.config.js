import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    extends: ['react-app', 'react-app/jest']
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended
)
