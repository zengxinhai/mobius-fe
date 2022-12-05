import create from 'zustand'
import { devtools } from 'zustand/middleware'
import { createProtocolDataSlice, ProtocolDataSlice } from './protocolDataSlice'
import { createUserDataSlice, UserDataSlice } from './userDataSlice'
import { createReserveDataSlice, ReserveDataSlice } from './reserveDataSlice'
import { createUserReserveDataSlice, UserReserveDataSlice } from './userReserveDataSlice'
import { createUserAssetsOverviewSlice, UserAssetsOverviewSlice } from './userAssetsOverviewSlice'
import { createDataRefreshSlice, DataRefreshSlice } from './dataRefreshSlice'
import { createSingletonSubscriber } from './utils/createSingletonSubscriber'

export type RootState =
  ProtocolDataSlice &
  UserDataSlice &
  ReserveDataSlice &
  UserReserveDataSlice &
  UserAssetsOverviewSlice &
  DataRefreshSlice

export const useRootStore = create<RootState>()(
  devtools(
    (...args) => ({
      ...createProtocolDataSlice(...args),
      ...createUserDataSlice(...args),
      ...createReserveDataSlice(...args),
      ...createUserReserveDataSlice(...args),
      ...createUserAssetsOverviewSlice(...args),
      ...createDataRefreshSlice(...args),
    })
  )
)

const RFRESH_INTERVAL = 600000;
export const useAppDataSubscription = createSingletonSubscriber(() => {
  return useRootStore.getState().refreshAppData();
}, RFRESH_INTERVAL);
