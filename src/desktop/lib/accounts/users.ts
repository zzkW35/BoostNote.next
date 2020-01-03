import { usePreferences } from '../preferences'
import { User } from '../../../common/users'

interface UserRepository {
  removeUser: (user: User) => void
  setUser: (user: User) => void
}

export const useUsers = (): [User[], UserRepository] => {
  const { preferences, setPreferences } = usePreferences()
  const users = preferences['general.accounts']

  const setUsers = (users: User[]) => {
    setPreferences({
      'general.accounts': users
    })
  }

  const repo: UserRepository = {
    removeUser: user => setUsers(removeUser(user, users)),
    setUser: user => setUsers([user])
  }

  return [users, repo]
}

const removeUser = (user: User, users: User[]) => {
  return users.filter(u => u.id !== user.id)
}
