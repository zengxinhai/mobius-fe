import { MainLayout } from 'src/layouts/MainLayout'
import { ContentContainer } from 'src/components/ContentContainer'
import { MarketsTopPanel } from 'src/modules/markets/MarketsTopPanel'
import MarketAssetsList from 'src/modules/markets/MarketAssetsList'
import { useTestQuery, TestData } from 'src/aptos/services/contract-query'
import {useWallet} from "@manahippo/aptos-wallet-adapter";
import {useCallback, useState} from "react";

export default function Home() {
  const { connect, connected, wallets } = useWallet();
  const testQuery = useTestQuery();
  const [data, setData] = useState<TestData>();
  const getData = useCallback(() => {
    if (!connected) return;
    testQuery().then(res => res.ok && setData(res.data));
  }, [connected, testQuery])
  return (
    <MainLayout>
      <MarketsTopPanel />
      <ContentContainer>
        <MarketAssetsList />
        <div>
          val: {data?.val}
        </div>
        <button onClick={getData}>Get data</button>
        {!connected &&
          <button onClick={() => connect(wallets[0].adapter.name)}>Connect</button>
        }
      </ContentContainer>
    </MainLayout>
  )
}
