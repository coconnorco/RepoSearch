const plugin = require('tailwindcss/plugin')
const clamp = require('@tailwindcss/line-clamp')

const rem = (px) => `${px/16}rem`;

module.exports = {
    prefix: 'u-',
    mode: 'jit',
    purge: {
        enabled: process.env.NODE_ENV === 'production',
        safeList: [],
        content: ['./index.html', './src/**/*.tsx', './src/**/*.ts'],
    },
    darkMode: false,
    theme: {
        fill: {
            current: 'currentColor',
            none: 'none'
        },
        stroke: {
            current: 'currentColor',
            none: 'none'
        },
        fontFamily: {
            'roboto-light': 'Roboto-Light',
            'roboto-medium': 'Roboto-Medium',
            'roboto-regular': 'Roboto-Regular',
        },
        fontSize: {
            h1: rem(96),
            h2: rem(60),
            h3: rem(48),
            h4: rem(34),
            h5: rem(24),
            h6: rem(20),
            'body-1': rem(16),
            'body-2': rem(14),
            'button': rem(14),
            'caption': rem(12),
            'overline': rem(10),
        },
        letterSpacing: {
            tighter: rem(-1.5),
            tight: rem(-.5),
            normal: rem(0),
            loose: rem(.15),
            looser: rem(.25),
            wide: rem(.5),
            wider: rem(1.5)
        }
    },
    variants: {
        extend: {
            borderStyle: ['hover'],
            borderWidth: ['hover']
        },
    },
    plugins: [
        clamp,
        plugin(function({ addComponents, theme }) {
            const types = {
                '.type-h1': {
                    fontSize: theme('fontSize.h1'),
                    letterSpacing: theme('letterSpacing.tighter'),
                    fontFamily: theme('fontFamily.roboto-light')
                },
                '.type-h2': {
                    fontSize: theme('fontSize.h2'),
                    letterSpacing: theme('letterSpacing.tight'),
                    fontFamily: theme('fontFamily.roboto-light')
                },
                '.type-h3': {
                    fontSize: theme('fontSize.h3'),
                    letterSpacing: theme('letterSpacing.normal'),
                    fontFamily: theme('fontFamily.roboto-regular')
                },
                '.type-h4': {
                    fontSize: theme('fontSize.h4'),
                    letterSpacing: theme('letterSpacing.looser'),
                    fontFamily: theme('fontFamily.roboto-regular')
                },
                '.type-h5': {
                    fontSize: theme('fontSize.h5'),
                    letterSpacing: theme('letterSpacing.loose'),
                    fontFamily: theme('fontFamily.roboto-regular')
                },
                '.type-h6': {
                    fontSize: theme('fontSize.h6'),
                    letterSpacing: theme('letterSpacing.loose'),
                    fontFamily: theme('fontFamily.roboto-regular')
                },
                '.type-subtitle-1': {
                    fontSize: theme('fontSize.body-1'),
                    letterSpacing: theme('letterSpacing.loose'),
                    fontFamily: theme('fontFamily.roboto-regular')
                },
                '.type-subtitle-2': {
                    fontSize: theme('fontSize.body-2'),
                    letterSpacing: theme('letterSpacing.loose'),
                    fontFamily: theme('fontFamily.roboto-medium')
                },
                '.type-body-1': {
                    fontSize: theme('fontSize.body-1'),
                    letterSpacing: theme('letterSpacing.wide'),
                    fontFamily: theme('fontFamily.roboto-regular')
                },
                '.type-body-2': {
                    fontSize: theme('fontSize.body-2'),
                    letterSpacing: theme('letterSpacing.looser'),
                    fontFamily: theme('fontFamily.roboto-regular')
                },
                '.type-button': {
                    fontSize: theme('fontSize.button'),
                    letterSpacing: theme('letterSpacing.wide'),
                    fontFamily: theme('fontFamily.roboto-medium'),
                    textTransform: 'uppercase'
                },
                '.type-caption': {
                    fontSize: theme('fontSize.caption'),
                    letterSpacing: theme('letterSpacing.wide'),
                    fontFamily: theme('fontFamily.roboto-regular'),
                },
                '.type-overline': {
                    fontSize: theme('fontSize.overline'),
                    letterSpacing: theme('letterSpacing.wider'),
                    fontFamily: theme('fontFamily.roboto-regular'),
                    textTransform: 'uppercase'
                },
            }

            addComponents(types, { variants: []})
        })

    ],
}
