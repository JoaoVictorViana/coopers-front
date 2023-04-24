import { create } from 'zustand'

type User = {
  username: string
  setUsername: (value: string) => void
}

export const useUserInfo = create<User>((set) => ({
  username: '',
  setUsername: (value: string) => set((prev) => ({ ...prev, username: value })),
}))
