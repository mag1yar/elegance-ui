import { EleganceProviderTheme } from '../EleganceProvider.types'

export const createCSSVariables = (theme: EleganceProviderTheme): string => {
  const variables: string[] = []

  if (theme.fontFamily) {
    variables.push(`--elegance-font-family: ${theme.fontFamily};`)
  }

  return variables.join(' ')
}
