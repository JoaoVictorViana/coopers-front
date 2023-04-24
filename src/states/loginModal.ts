import { create } from 'zustand'

type LoginModal = {
  visible: boolean
  open: () => void
  close: () => void
}

export const useLoginModal = create<LoginModal>((set) => ({
  visible: false,
  open: () => set((prev) => ({ ...prev, visible: true })),
  close: () => set((prev) => ({ ...prev, visible: false })),
}))
