import { createStoreContext } from '../../../common/context'
import { useState } from 'react'
import { generateSecret } from '../../../common/string'

export interface ToastMessage {
  id: string
  title: string
  description: string
  createdAt: Date
}

interface ToastStore {
  readonly messages: ToastMessage[]
  pushMessage: (message: Omit<ToastMessage, 'id' | 'createdAt'>) => void
  removeMessage: (message: ToastMessage) => void
}

const createToastMessage = (title: string, description: string) => {
  return {
    id: generateSecret(),
    createdAt: new Date(),
    title,
    description
  }
}

const useToastStore = (): ToastStore => {
  const [messages, setMessages] = useState<ToastMessage[]>([])

  return {
    messages,
    pushMessage: ({ title, description }) =>
      setMessages([createToastMessage(title, description), ...messages]),
    removeMessage: message =>
      setMessages(messages.filter(({ id }) => id !== message.id))
  }
}

export const {
  StoreProvider: ToastProvider,
  useStore: useToast
} = createStoreContext(useToastStore)
