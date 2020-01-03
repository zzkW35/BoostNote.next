export interface User {
  token: string
  name: string
  id: number
}

export interface UserCloudInfo {
  storages: CloudStorage[]
  subscription: Subscription | undefined
  usage: number
}

export interface CloudStorage {
  id: number
  name: string
  size: number
}

export interface Subscription {
  id: number
  quantity: number
  status: 'active' | 'past_due' | 'incomplete'
}
