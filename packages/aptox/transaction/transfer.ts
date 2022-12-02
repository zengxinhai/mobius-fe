import { AptosAccount, AptosClient, CoinClient, FaucetClient, HexString } from "aptos";

// 交互的节点URL（开发环境）
const NODE_URL = "https://fullnode.devnet.aptoslabs.com";
const FAUCET_URL = "https://faucet.devnet.aptoslabs.com";

// 初始化Aptos交互客户端
const aptosClient = new AptosClient(NODE_URL);
const coinClient = new CoinClient(aptosClient);

// 水龙头客户端，开发环境下获取测试币
const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL);

// 创建账户
const dogPrivKey = "0x72d05db9b4d2863135a1de0c3757c020964e75289d34d06dc6bd2c7b3ba1571e";
const privKeyArr = new HexString(dogPrivKey).toUint8Array();

const dog = new AptosAccount(privKeyArr);
const cat = new AptosAccount();

(async() => {
  const coinType = `${dog.address().toShortString()}::y_coin::ZCoin`;

// console.log("=======dog转账给cat========")
// await coinClient.transfer(dog, cat, 90_000_000);
console.log(`dog balance: ${await coinClient.checkBalance(dog, {coinType})}`);
// console.log(`cat balance: ${await coinClient.checkBalance(cat)}`);
})();
