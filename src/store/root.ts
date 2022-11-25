import create from 'zustand'
import { devtools } from 'zustand/middleware'
import { createTestSlice, TestSlice } from './testSlice'
import { createProtocolDataSlice, ProtocolDataSlice } from './protocolDataSlice'
import { createUserDataSlice, UserDataSlice } from './userDataSlice'
import { createSingletonSubscriber } from './utils/createSingletonSubscriber'

export type RootState =
  TestSlice &
  ProtocolDataSlice &
  UserDataSlice

export const useRootStore = create<RootState>()(
  devtools(
    (...args) => ({
      ...createTestSlice(...args),
      ...createProtocolDataSlice(...args),
      ...createUserDataSlice(...args),
    })
  )
)

const RFRESH_INTERVAL = 30000;
export const useTestDataSubscription = createSingletonSubscriber(() => {
  return useRootStore.getState().getVal();
}, RFRESH_INTERVAL);
