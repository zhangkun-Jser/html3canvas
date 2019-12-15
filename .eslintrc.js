'use strict';

 module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "worker": true,
    "mocha": true,
    "serviceworker": true
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "modules": true
    }
  },
  "plugins": [
    "react",
    "babel"
  ],
  "rules": {
    "react/display-name": [
      "off",
      {
        "ignoreTranspilerName": false
      }
    ],
    "react/forbid-prop-types": 0,
    "react/forbid-dom-props": [
      "off",
      {
        "forbid": []
      }
    ],
    "react/jsx-boolean-value": [
      "error",
      "never",
      {
        "always": []
      }
    ],
    "react/jsx-closing-bracket-location": [
      "error",
      "line-aligned"
    ],
    "react/jsx-closing-tag-location": "error",
    "react/jsx-curly-spacing": [
      "error",
      "never",
      {
        "allowMultiline": true
      }
    ],
    "react/jsx-handler-names": [
      "off",
      {
        "eventHandlerPrefix": "handle",
        "eventHandlerPropPrefix": "on"
      }
    ],
    "react/jsx-indent-props": [
      "error",
      2
    ],
    "react/jsx-key": "off",
    "react/jsx-max-props-per-line": [
      "error",
      {
        "maximum": 1,
        "when": "multiline"
      }
    ],
    "react/jsx-no-bind": [
      "error",
      {
        "ignoreRefs": true,
        "allowArrowFunctions": true,
        "allowBind": false
      }
    ],
    "react/jsx-no-duplicate-props": [
      "error",
      {
        "ignoreCase": true
      }
    ],
    "react/jsx-no-literals": [
      "off",
      {
        "noStrings": true
      }
    ],
    "react/jsx-no-undef": "error",
    "react/jsx-pascal-case": [
      "error",
      {
        "allowAllCaps": true,
        "ignore": []
      }
    ],
    "react/sort-prop-types": [
      "off",
      {
        "ignoreCase": true,
        "callbacksLast": false,
        "requiredFirst": false,
        "sortShapeProp": true
      }
    ],
    "react/jsx-sort-prop-types": "off",
    "react/jsx-sort-props": [
      "off",
      {
        "ignoreCase": true,
        "callbacksLast": false,
        "shorthandFirst": false,
        "shorthandLast": false,
        "noSortAlphabetically": false,
        "reservedFirst": true
      }
    ],
    "react/jsx-sort-default-props": [
      "off",
      {
        "ignoreCase": true
      }
    ],
    "react/jsx-uses-react": [
      "error"
    ],
    "react/jsx-uses-vars": "error",
    "react/no-danger": "warn",
    "react/no-deprecated": [
      "error"
    ],
    "react/no-did-mount-set-state": "off",
    "react/no-did-update-set-state": "error",
    "react/no-will-update-set-state": "error",
    "react/no-direct-mutation-state": "off",
    "react/no-is-mounted": "error",
    "react/no-multi-comp": [
      "error",
      {
        "ignoreStateless": true
      }
    ],
    "react/no-set-state": "off",
    "react/no-string-refs": "error",
    "react/no-unknown-property": "error",
    "react/prefer-es6-class": [
      "error",
      "always"
    ],
    "react/prefer-stateless-function": [
      "error",
      {
        "ignorePureComponents": true
      }
    ],
    // "react/prop-types": [
    //   "error",
    //   {
    //     "ignore": [],
    //     "customValidators": [],
    //     "skipUndeclared": false
    //   }
    // ],
    "react/react-in-jsx-scope": "error",
    "react/require-render-return": "error",
    "react/self-closing-comp": "error",
    "react/sort-comp": [
      "error",
      {
        "order": [
          "static-methods",
          "instance-variables",
          "lifecycle",
          "/^on.+$/",
          "getters",
          "setters",
          "/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/",
          "instance-methods",
          "everything-else",
          "rendering"
        ],
        "groups": {
          "lifecycle": [
            "displayName",
            "propTypes",
            "contextTypes",
            "childContextTypes",
            "mixins",
            "statics",
            "defaultProps",
            "constructor",
            "getDefaultProps",
            "getInitialState",
            "state",
            "getChildContext",
            "componentWillMount",
            "componentDidMount",
            "componentWillReceiveProps",
            "shouldComponentUpdate",
            "componentWillUpdate",
            "componentDidUpdate",
            "componentWillUnmount"
          ],
          "rendering": [
            "/^render.+$/",
            "render"
          ]
        }
      }
    ],
    "react/jsx-wrap-multilines": [
      "error",
      {
        "declaration": "parens-new-line",
        "assignment": "parens-new-line",
        "return": "parens-new-line",
        "arrow": "parens-new-line",
        "condition": "parens-new-line",
        "logical": "parens-new-line",
        "prop": "parens-new-line"
      }
    ],
    "react/jsx-first-prop-new-line": [
      2,
      "multiline-multiprop"
    ],
    "react/jsx-equals-spacing": [
      2,
      "never"
    ],
    "react/jsx-indent": [
      2,
      2
    ],
    "react/jsx-no-target-blank": [
      2,
      {
        "enforceDynamicLinks": "always"
      }
    ],
    "react/jsx-filename-extension": [
      2,
      {
        "extensions": [
          ".jsx"
        ]
      }
    ],
    "react/jsx-no-comment-textnodes": 2,
    "react/no-render-return-value": 2,
    "react/require-optimization": [
      0,
      {
        "allowDecorators": []
      }
    ],
    "react/no-find-dom-node": 2,
    "react/forbid-component-props": 0,
    "react/forbid-elements": 0,
    "react/no-danger-with-children": 2,
    "react/no-unused-prop-types": [
      2,
      {
        "customValidators": [],
        "skipShapeProps": true
      }
    ],
    "react/style-prop-object": 2,
    "react/no-unescaped-entities": 2,
    "react/no-children-prop": 2,
    "react/jsx-tag-spacing": [
      2,
      {
        "closingSlash": "never",
        "beforeSelfClosing": "always",
        "afterOpening": "never",
        "beforeClosing": "never"
      }
    ],
    "react/jsx-space-before-closing": 0,
    "react/no-array-index-key": 2,
    "react/require-default-props": [
      0,
      {
        "forbidDefaultForRequired": true
      }
    ],
    "react/forbid-foreign-prop-types": [
      "warn",
      {
        "allowInPropTypes": true
      }
    ],
    "react/void-dom-elements-no-children": 2,
    "react/default-props-match-prop-types": [
      2,
      {
        "allowRequiredDefaults": false
      }
    ],
    "react/no-redundant-should-component-update": 2,
    "react/no-unused-state": 2,
    "react/boolean-prop-naming": 0,
    "react/no-typos": 2,
    "react/jsx-curly-brace-presence": [
      2,
      {
        "props": "never",
        "children": "never"
      }
    ],
    "react/jsx-one-expression-per-line": 0,
    "react/destructuring-assignment": 0,
    "react/no-access-state-in-setstate": 2,
    "react/button-has-type": [
      2,
      {
        "button": true,
        "submit": true,
        "reset": false
      }
    ],
    "react/jsx-child-element-spacing": 0,
    "react/no-this-in-sfc": 2,
    "react/jsx-max-depth": 0,
    "react/jsx-props-no-multi-spaces": 2,
    "react/no-unsafe": 0,
    "no-case-declarations": 2,
    "no-empty-pattern": 2,
    "no-fallthrough": 2,
    "no-global-assign": 2,
    "no-octal": 2,
    "no-redeclare": 2,
    "no-self-assign": 2,
    "no-unused-labels": 2,
    "no-useless-escape": 2,
    "accessor-pairs": 2,
    "array-callback-return": 2,
    "block-scoped-var": 2,
    "class-methods-use-this": 1,
    "curly": 1,
    "default-case": 2,
    "eqeqeq": 1,
    "guard-for-in": 2,
    "no-caller": 2,
    "no-eval": 2,
    "no-extend-native": 2,
    "no-extra-label": 2,
    "no-floating-decimal": 2,
    "no-implied-eval": 2,
    "no-invalid-this": 0,
    "no-iterator": 2,
    "no-labels": 2,
    "no-lone-blocks": 2,
    "no-throw-literal": 2,
    "no-unmodified-loop-condition": 1,
    "no-useless-concat": 2,
    "no-useless-return": 2,
    "radix": 2,
    "require-await": 2,
    "callback-return": 2,
    "global-require": 2,
    "handle-callback-err": 2,
    "no-buffer-constructor": 2,
    "no-mixed-requires": 2,
    "no-new-require": 2,
    "babel/no-invalid-this": 2,
    "constructor-super": 2,
    "no-class-assign": 2,
    "no-const-assign": 2,
    "no-dupe-class-members": 2,
    "no-new-symbol": 2,
    "no-this-before-super": 2,
    "require-yield": 2,
    "no-compare-neg-zero": 2,
    "no-cond-assign": 2,
    "no-console": 0,
    "no-constant-condition": 2,
    "no-control-regex": 2,
    "no-debugger": 0,
    "no-dupe-args": 2,
    "no-dupe-keys": 2,
    "no-duplicate-case": 2,
    "no-empty": 2,
    "no-empty-character-class": 2,
    "no-ex-assign": 2,
    "no-extra-boolean-cast": 2,
    "no-extra-parens": 0,
    "no-extra-semi": 2,
    "no-func-assign": 2,
    "no-inner-declarations": 2,
    "no-invalid-regexp": 2,
    "no-irregular-whitespace": 2,
    "no-obj-calls": 2,
    "no-regex-spaces": 2,
    "no-sparse-arrays": 2,
    "no-unexpected-multiline": 2,
    "no-unreachable": 2,
    "no-unsafe-finally": 2,
    "no-unsafe-negation": 2,
    "use-isnan": 2,
    "valid-typeof": 2,
    "for-direction": 2,
    "getter-return": 2,
    "no-await-in-loop": 2,
    "no-prototype-builtins": 2,
    "no-template-curly-in-string": 2,
    "array-bracket-newline": 0,
    "array-bracket-spacing": [
      2,
      "never"
    ],
    "array-element-newline": 0,
    "block-spacing": [
      2,
      "always"
    ],
    "brace-style": [
      2,
      "1tbs",
      {
        "allowSingleLine": true
      }
    ],
    "camelcase": [
      2,
      {
        "properties": "never"
      }
    ],
    "capitalized-comments": 0,
    "comma-dangle": [
      2,
      {
        "arrays": "always-multiline",
        "objects": "always-multiline",
        "imports": "always-multiline",
        "exports": "always-multiline",
        "functions": "always-multiline"
      }
    ],
    "comma-spacing": [
      2,
      {
        "before": false,
        "after": true
      }
    ],
    "comma-style": [
      2,
      "last",
      {
        "exceptions": {
          "ArrayExpression": false,
          "ArrayPattern": false,
          "ArrowFunctionExpression": false,
          "CallExpression": false,
          "FunctionDeclaration": false,
          "FunctionExpression": false,
          "ImportDeclaration": false,
          "ObjectExpression": false,
          "ObjectPattern": false,
          "VariableDeclaration": false,
          "NewExpression": false
        }
      }
    ],
    "computed-property-spacing": [
      2,
      "never"
    ],
    "consistent-this": 0,
    "eol-last": [
      2,
      "always"
    ],
    "func-call-spacing": [
      2,
      "never"
    ],
    "func-name-matching": 0,
    "func-names": 1,
    "func-style": 0,
    "function-paren-newline": [
      2,
      "consistent"
    ],
    "id-blacklist": 0,
    "id-length": 0,
    "id-match": 0,
    "implicit-arrow-linebreak": [
      2,
      "beside"
    ],
    "indent": [
      2,
      2,
      {
        "SwitchCase": 1,
        "VariableDeclarator": 1,
        "outerIIFEBody": 1,
        "FunctionDeclaration": {
          "parameters": 1,
          "body": 1
        },
        "FunctionExpression": {
          "parameters": 1,
          "body": 1
        },
        "CallExpression": {
          "arguments": 1
        },
        "ArrayExpression": 1,
        "ObjectExpression": 1,
        "ImportDeclaration": 1,
        "flatTernaryExpressions": false,
        "ignoredNodes": [
          "JSXElement",
          "JSXElement > *",
          "JSXAttribute",
          "JSXIdentifier",
          "JSXNamespacedName",
          "JSXMemberExpression",
          "JSXSpreadAttribute",
          "JSXExpressionContainer",
          "JSXOpeningElement",
          "JSXClosingElement",
          "JSXText",
          "JSXEmptyExpression",
          "JSXSpreadChild"
        ],
        "ignoreComments": false
      }
    ],
    "jsx-quotes": 0,
    "key-spacing": [
      2,
      {
        "beforeColon": false,
        "afterColon": true
      }
    ],
    "keyword-spacing": [
      2,
      {
        "before": true,
        "after": true,
        "overrides": {
          "return": {
            "after": true
          },
          "throw": {
            "after": true
          },
          "case": {
            "after": true
          }
        }
      }
    ],
    "line-comment-position": 0,
    "linebreak-style": [
      2,
      "unix"
    ],
    "lines-around-comment": 0,
    "lines-between-class-members": [
      2,
      "always",
      {
        "exceptAfterSingleLine": false
      }
    ],
    "max-depth": 0,
    "max-len": [
      2,
      200,
      2,
      {
        "ignoreUrls": true,
        "ignoreComments": false,
        "ignoreRegExpLiterals": true,
        "ignoreStrings": true,
        "ignoreTemplateLiterals": true
      }
    ],
    "max-lines": 0,
    "max-nested-callbacks": 0,
    "max-params": 0,
    "max-statements": 0,
    "max-statements-per-line": 0,
    "multiline-comment-style": 0,
    "multiline-ternary": 0,
    "new-cap": [
      2,
      {
        "newIsCap": true,
        "newIsCapExceptions": [],
        "capIsNew": false,
        "capIsNewExceptions": [
          "Immutable.Map",
          "Immutable.Set",
          "Immutable.List"
        ]
      }
    ],
    "new-parens": 2,
    "newline-per-chained-call": [
      2,
      {
        "ignoreChainWithDepth": 4
      }
    ],
    "no-array-constructor": 2,
    "no-bitwise": 2,
    "no-continue": 2,
    "no-inline-comments": 0,
    "no-lonely-if": 2,
    "no-mixed-operators": [
      2,
      {
        "groups": [
          [
            "%",
            "**"
          ],
          [
            "%",
            "+"
          ],
          [
            "%",
            "-"
          ],
          [
            "%",
            "*"
          ],
          [
            "%",
            "/"
          ],
          [
            "**",
            "+"
          ],
          [
            "**",
            "-"
          ],
          [
            "**",
            "*"
          ],
          [
            "**",
            "/"
          ],
          [
            "&",
            "|",
            "^",
            "~",
            "<<",
            ">>",
            ">>>"
          ],
          [
            "==",
            "!=",
            "===",
            "!==",
            ">",
            ">=",
            "<",
            "<="
          ],
          [
            "&&",
            "||"
          ],
          [
            "in",
            "instanceof"
          ]
        ],
        "allowSamePrecedence": false
      }
    ],
    "no-multi-assign": 2,
    "no-multiple-empty-lines": [
      2,
      {
        "max": 2,
        "maxEOF": 0
      }
    ],
    "no-negated-condition": 0,
    "no-nested-ternary": 2,
    "no-new-object": 2,
    "no-plusplus": 2,
    "no-restricted-syntax": [
      2,
      {
        "selector": "ForInStatement",
        "message": "for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array."
      },
      {
        "selector": "ForOfStatement",
        "message": "iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations."
      },
      {
        "selector": "LabeledStatement",
        "message": "Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand."
      },
      {
        "selector": "WithStatement",
        "message": "`with` is disallowed in strict mode because it makes code impossible to predict and optimize."
      }
    ],
    "no-tabs": 2,
    "no-ternary": 0,
    "no-trailing-spaces": [
      2,
      {
        "skipBlankLines": false,
        "ignoreComments": false
      }
    ],
    "no-underscore-dangle": [
      2,
      {
        "allow": [],
        "allowAfterThis": false,
        "allowAfterSuper": false,
        "enforceInMethodNames": false
      }
    ],
    "no-unneeded-ternary": [
      2,
      {
        "defaultAssignment": false
      }
    ],
    "no-whitespace-before-property": 2,
    "nonblock-statement-body-position": [
      2,
      "beside",
      {
        "overrides": {}
      }
    ],
    "object-curly-newline": [
      2,
      {
        "ObjectExpression": {
          "minProperties": 4,
          "multiline": true,
          "consistent": true
        },
        "ObjectPattern": {
          "minProperties": 4,
          "multiline": true,
          "consistent": true
        },
        "ImportDeclaration": {
          "minProperties": 4,
          "multiline": true,
          "consistent": true
        },
        "ExportDeclaration": {
          "minProperties": 4,
          "multiline": true,
          "consistent": true
        }
      }
    ],
    "object-curly-spacing": [
      2,
      "always"
    ],
    "object-property-newline": [
      2,
      {
        "allowAllPropertiesOnSameLine": true
      }
    ],
    "one-var": [
      2,
      "never"
    ],
    "one-var-declaration-per-line": [
      2,
      "always"
    ],
    "operator-assignment": [
      2,
      "always"
    ],
    "operator-linebreak": [
      2,
      "before",
      {
        "overrides": {
          "=": "none"
        }
      }
    ],
    "padded-blocks": [
      2,
      {
        "blocks": "never",
        "classes": "never",
        "switches": "never"
      }
    ],
    "padding-line-between-statements": 0,
    "quote-props": [
      2,
      "as-needed",
      {
        "keywords": false,
        "unnecessary": true,
        "numbers": false
      }
    ],
    "quotes": [
      2,
      "single",
      {
        "avoidEscape": true
      }
    ],
    "require-jsdoc": 0,
    "semi": [
      2,
      "always"
    ],
    "semi-spacing": [
      "error",
      {
        "before": false,
        "after": true
      }
    ],
    "semi-style": [
      2,
      "last"
    ],
    "sort-keys": 0,
    "sort-vars": 0,
    "space-before-blocks": 2,
    "space-before-function-paren": [
      2,
      {
        "anonymous": "always",
        "named": "never",
        "asyncArrow": "always"
      }
    ],
    "space-in-parens": [
      2,
      "never"
    ],
    "space-infix-ops": 2,
    "space-unary-ops": [
      2,
      {
        "words": true,
        "nonwords": false,
        "overrides": {}
      }
    ],
    "spaced-comment": [
      2,
      "always",
      {
        "line": {
          "exceptions": [
            "-",
            "+"
          ],
          "markers": [
            "=",
            "!"
          ]
        },
        "block": {
          "exceptions": [
            "-",
            "+"
          ],
          "markers": [
            "=",
            "!"
          ],
          "balanced": true
        }
      }
    ],
    "switch-colon-spacing": [
      2,
      {
        "after": true,
        "before": false
      }
    ],
    "template-tag-spacing": [
      2,
      "never"
    ],
    "unicode-bom": [
      2,
      "never"
    ],
    "wrap-regex": 0,
    "no-delete-var": 2,
    "no-undef": 2,
    "no-unused-vars": 2,
    "no-mixed-spaces-and-tabs": 2
  }
}