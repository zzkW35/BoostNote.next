import shortid from 'shortid'
import { randomBytes } from 'crypto'

export function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function generateId(): string {
  return shortid.generate()
}

export const generateSecret = () => randomBytes(32).toString('hex')
