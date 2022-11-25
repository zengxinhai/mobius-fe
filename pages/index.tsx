import { MainLayout } from 'src/layouts/MainLayout'
import { ContentContainer } from 'src/components/ContentContainer'
import { MarketsTopPanel } from 'src/modules/markets/MarketsTopPanel'
import MarketAssetsList from 'src/modules/markets/MarketAssetsList'
import { useRootStore, useTestDataSubscription } from 'src/store/root'

export default function Home() {
  const val = useRootStore(state => state.val);
  const refreshTestData = useTestDataSubscription();
  return (
    <MainLayout>
      <MarketsTopPanel />
      <ContentContainer>
        <MarketAssetsList />
        <div>
          val: {val}
        </div>
        <button onClick={refreshTestData}>
          getVal
        </button>
      </ContentContainer>
    </MainLayout>
  )
}
