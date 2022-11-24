import create from 'zustand'
import { devtools } from 'zustand/middleware'
import { createTestSlice, TestSlice } from './testSlice'
import { createProtocolDataSlice, ProtocolDataSlice } from './protocolDataSlice'

export type RootState =
  TestSlice &
  ProtocolDataSlice

export const useRootStore = create<RootState>()(
  devtools(
    (...args) => ({
      ...createTestSlice(...args),
      ...createProtocolDataSlice(...args),
    })
  )
)
