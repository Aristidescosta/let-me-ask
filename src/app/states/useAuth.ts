import { create } from 'zustand'
import { IUserProps } from '../types/UserType'
import { devtools, persist } from 'zustand/middleware'

interface IUserStates {
  user: IUserProps | undefined
  setUser: (user: IUserProps) => void
}

export const useAuth = create<IUserStates>()(
  devtools(
    persist(
      (set) => ({
        user: undefined,
        setUser: (user: IUserProps) => set(() => ({ user: user }))
      }),
      {
        name: "user-storage"
      }
    )
  )
)