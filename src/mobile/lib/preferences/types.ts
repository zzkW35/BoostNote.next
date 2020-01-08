import { User } from '../../../common/users'

export type GeneralThemeOptions =
  | 'auto'
  | 'light'
  | 'dark'
  | 'sepia'
  | 'solarizedDark'
export type GeneralLanguageOptions = 'en-US' | 'ja' | 'es-ES'
export type GeneralNoteSortingOptions =
  | 'date-updated'
  | 'date-created'
  | 'title'

export type EditorIndentTypeOptions = 'tab' | 'spaces'
export type EditorIndentSizeOptions = 2 | 4 | 8

export interface Preferences {
  // General
  'general.accounts': User[]
  'general.language': GeneralLanguageOptions
  'general.theme': GeneralThemeOptions
  'general.noteSorting': GeneralNoteSortingOptions
  'general.enableAnalytics': boolean
  'general.enableDownloadAppModal': boolean

  // Editor
  'editor.theme': string
  'editor.fontSize': number
  'editor.fontFamily': string
  'editor.indentType': EditorIndentTypeOptions
  'editor.indentSize': EditorIndentSizeOptions

  // Markdown
  'markdown.previewStyle': string
  'markdown.codeBlockTheme': string
}
