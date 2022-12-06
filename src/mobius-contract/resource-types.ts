export const MOBIUS = '0xbebaf664c81aa143a87105a5144cc8c0f9ee6b222adb7b2d2a5265ec0ae71f4e';

/**88888888  Modules 88888888888 **/
export const treasuryModule = `${MOBIUS}::treasury`;
export const managementModule = `${MOBIUS}::management`;
export const assetsModule = `${MOBIUS}::assets`;
export const queryModule = `${MOBIUS}::query`;

export const nftModule = `${MOBIUS}::nft`;
export const assetsGalleryModule = `${MOBIUS}::assets_gallery`;

export const marketScriptModule = `${MOBIUS}::market_script`;

export const faucetModule = `${MOBIUS}::faucet_script`;


/**88888888  Types 88888888888 **/

export const StandardPositionType = `${managementModule}::StandardPosition`;

const StandardAssetType = `${treasuryModule}::Assets<${StandardPositionType}>`;

const StandardAssetsNftType = `${nftModule}::NFT<${assetsModule}::AMeta<${StandardPositionType}>, ${assetsModule}::ABody<${StandardAssetType}>>`;

export const StandardAssetsNftGalleryType = `${assetsGalleryModule}::AssetsGalleryStore<${StandardAssetsNftType}>`;

export const getPoolType = (tokenType: string) => {
  return `${treasuryModule}::Position<${StandardPositionType}, ${tokenType}>`;
}
