module.exports = {
  // 使用するESLint設定のベース
  extends: [
    'next/core-web-vitals', // Next.jsのパフォーマンスに関するルールセット
    'plugin:@typescript-eslint/recommended', // TypeScriptの推奨ルールセット
    'plugin:import/recommended', // import構文に関する推奨ルールセット
    'plugin:import/typescript', // TypeScriptのimportルールサポート
    'prettier', // コードの整形をPrettierに任せるためのルールセット
    // 'plugin:storybook/recommended', // Storybook用の推奨ルールセット,
    'prettier' // prettierのルールセットと競合するEslintのルールを無効化
  ],
  rules: {
    // importの順序を無視する設定
    'import/order': 'off',

    // 画像にalt属性の設定を強制しない
    'jsx-a11y/alt-text': 'off',

    // コンポーネントのdisplayNameプロパティの設定を強制しない
    'react/display-name': 'off',

    // childrenプロパティに子要素を直接渡せるようにする設定
    'react/no-children-prop': 'off',

    // Next.jsでimgタグの使用を許可する
    '@next/next/no-img-element': 'off',

    // カスタムフォントの設定に関する制限を解除
    '@next/next/no-page-custom-font': 'off',

    // 未使用importがある場合に警告
    'unused-imports/no-unused-imports': 'warn',

    // TypeScriptのインポートで一貫した型インポートを強制
    '@typescript-eslint/consistent-type-imports': 'error',

    // `@ts-comment`の使用を許可
    '@typescript-eslint/ban-ts-comment': 'off',

    // `any`型の使用を許可
    '@typescript-eslint/no-explicit-any': 'off',

    // 使用されていない変数に対する警告設定。`_`から始まる引数や変数は無視
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],

    // `!`によるnull非チェックの使用を許可
    '@typescript-eslint/no-non-null-assertion': 'off',

    // コメントの前後に空行を入れるルール
    'lines-around-comment': [
      'error',
      {
        beforeBlockComment: true, // ブロックコメントの前に空行を入れる
        beforeLineComment: true, // 行コメントの前に空行を入れる
        allowBlockStart: true, // ブロックの始まりに空行を許可
        allowObjectStart: true, // オブジェクトの開始部分に空行を許可
        allowArrayStart: true // 配列の開始部分に空行を許可
      }
    ],

    // return文の前に改行を強制
    'newline-before-return': 'error',

    // import文の後に改行を1行挿入
    'import/newline-after-import': ['error', { count: 1 }],

    // elseの中でreturnがある場合に警告
    'no-else-return': 'error',

    // 多段三項演算子を警告
    'no-nested-ternary': 'error',

    // console.logを警告
    'no-console': 'warn',

    // デバッグコードの削除漏れを防止
    'no-debugger': 'error',

    // === と !== を強制
    eqeqeq: 'error',

    // varの使用を禁止
    'no-var': 'error',

    // マジックナンバーを警告
    'no-magic-numbers': ['warn', { ignore: [0, 1] }],

    // テンプレートリテラル
    'prefer-template': 'off',

    // 特定の型（FunctionやObjectなど）の使用を禁止し、代替案を推奨
    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: true,
        types: {
          Function: 'Use a specific function type instead', // 具体的な関数型を使用
          Object: 'Use object instead', // objectを使用
          Boolean: 'Use boolean instead', // booleanを使用
          Number: 'Use number instead', // numberを使用
          String: 'Use string instead', // stringを使用
          Symbol: 'Use symbol instead', // symbolを使用
          any: false, // anyの使用は許可
          '{}': false // {}の使用は許可
        }
      }
    ]
  },
  settings: {
    // 使用しているReactのバージョンを自動検出
    react: { version: 'detect' },

    // TypeScriptファイル用のimportパーサー設定
    'import/parsers': { '@typescript-eslint/parser': ['.ts', '.tsx'] },

    // TypeScript用のimportパス解決設定
    'import/resolver': { typescript: { project: './tsconfig.json' } }
  },
  overrides: [
    {
      // 指定したファイルに対してのみ適用するルール
      files: ['*.ts', '*.tsx', 'src/iconify-bundle/*'],
      rules: {
        // モジュールのエクスポート関数に型を強制しない
        '@typescript-eslint/explicit-module-boundary-types': 'off',

        // `require`の使用を許可
        '@typescript-eslint/no-var-requires': 'off'
      }
    }
  ],

  // 使用するプラグイン
  plugins: ['import', 'unused-imports']
}
