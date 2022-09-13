import { parseColor } from '@unocss/preset-mini/utils'
import theme from '../theme'
import { SwitchSizeMap } from '../constants'
import type { ParsedColorValue, Rule, RuleContext } from 'unocss'
import type { Theme } from '@unocss/preset-uno'

export function parseColors(body: string, _theme: Theme = theme): ParsedColorValue | undefined {
  return parseColor(body, _theme)
}

export default [
  [/^o-(.*)$/, ([, body]: string[], { theme }: RuleContext<Theme>) => {
    const color = parseColor(body, theme)
    if (color?.cssColor?.type === 'rgb' && color.cssColor.components) {
      return {
        '--onu-c-context': `${color.cssColor.components.join(',')}`,
      }
    }
  }],
  [/^o-switch-(.+)$/, ([, s]: string[]) => {
    if (['sm', 'md', 'lg'].includes(s)) {
      return {
        '--o-switch-offset': SwitchSizeMap[s][2],
        'width': SwitchSizeMap[s][0],
        'height': SwitchSizeMap[s][1],
      }
    }
  }],
  ['o-dashed', { 'border-style': 'dashed' }],
  ['o-solid', { 'background-color': 'rgba(var(--onu-c-context), 1) !important', 'border-color': 'rgba(var(--onu-c-context), 1)', 'color': 'white !important' }],
  ['o-disabled', { opacity: 0.4, cursor: 'not-allowed !important' }],
] as Rule<Theme>[]