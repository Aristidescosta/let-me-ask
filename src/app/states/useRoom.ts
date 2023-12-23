import { create } from 'zustand'
import { IUserType } from '../types/UserType'
import { devtools, persist } from 'zustand/middleware'

interface IUserStates {
  user: IUserType | undefined
  setUser: (user: IUserType) => void
}

export const useAuth = create<IUserStates>()(
  devtools(
    persist(
      (set) => ({
        user: undefined,
        setUser: (user: IUserType) => set(() => ({ user: user }))
      }),
      {
        name: "user-storage"
      }
    )
  )
)