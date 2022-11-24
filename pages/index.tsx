import { MainLayout } from 'src/layouts/MainLayout'
import { ContentContainer } from 'src/components/ContentContainer'
import { MarketsTopPanel } from 'src/modules/markets/MarketsTopPanel'
import MarketAssetsList from 'src/modules/markets/MarketAssetsList'
import { useRootStore } from 'src/store/root'

export default function Home() {
  const { val, getVal } = useRootStore(state => ({ val: state.val, getVal: state.getVal }));
  return (
    <MainLayout>
      <MarketsTopPanel />
      <ContentContainer>
        <MarketAssetsList />
        <div>
          val: {val}
        </div>
        <button onClick={getVal}>
          getVal
        </button>
      </ContentContainer>
    </MainLayout>
  )
}
