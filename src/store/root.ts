import create from 'zustand'
import { devtools } from 'zustand/middleware'
import { createTestSlice, TestSlice } from './testSlice'
import { createProtocolDataSlice, ProtocolDataSlice } from './protocolDataSlice'
import { createUserDataSlice, UserDataSlice } from './userDataSlice'
import { createReserveDataSlice, ReserveDataSlice } from './reserveDataSlice'
import { createUserReserveDataSlice, UserReserveDataSlice } from './userReserveDataSlice'
import { createUserAssetsOverviewSlice, UserAssetsOverviewSlice } from './userAssetsOverviewSlice'
import { createDataRefreshSlice, DataRefreshSlice } from './dataRefreshSlice'
import { createSingletonSubscriber } from './utils/createSingletonSubscriber'

export type RootState =
  TestSlice &
  ProtocolDataSlice &
  UserDataSlice &
  ReserveDataSlice &
  UserReserveDataSlice &
  UserAssetsOverviewSlice &
  DataRefreshSlice

export const useRootStore = create<RootState>()(
  devtools(
    (...args) => ({
      ...createTestSlice(...args),
      ...createProtocolDataSlice(...args),
      ...createUserDataSlice(...args),
      ...createReserveDataSlice(...args),
      ...createUserReserveDataSlice(...args),
      ...createUserAssetsOverviewSlice(...args),
      ...createDataRefreshSlice(...args),
    })
  )
)

const RFRESH_INTERVAL = 30000;
export const useAppDataSubscription = createSingletonSubscriber(() => {
  return useRootStore.getState().refreshAppData();
}, RFRESH_INTERVAL);
