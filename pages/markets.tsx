import { ContentContainer } from 'src/components/ContentContainer'
import { MarketsTopPanel } from 'src/modules/markets/MarketsTopPanel'
import MarketAssetsList from 'src/modules/markets/MarketAssetsList'

export default function Home() {
  return (
    <>
      <MarketsTopPanel />
      <ContentContainer>
        <MarketAssetsList />
      </ContentContainer>
    </>
  )
}
