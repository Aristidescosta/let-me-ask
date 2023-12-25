import { create } from 'zustand'
import { IUserType } from '../types/UserType'
import { devtools, persist } from 'zustand/middleware'

interface IUserStates {
  user: IUserType | undefined
  setUser: (user: IUserType) => void
  userAdmin: boolean
  setUserAdmin: (userAdmin: boolean) => void
}

export const useAuth = create<IUserStates>()(
  devtools(
    persist(
      (set) => ({
        user: undefined,
        userAdmin: false,
        setUser: (user: IUserType) => set(() => ({ user: user })),
        setUserAdmin: (userAdmin: boolean) => set(() => ({ userAdmin: userAdmin }))
      }),
      {
        name: "user-storage"
      }
    )
  )
)