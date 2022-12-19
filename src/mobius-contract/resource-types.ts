export const MOBIUS = '0x3d4f2d8c266f568aa7721dd01e4cd7366fcc7b632aa2d5eeef9fbbc62f4e3661';

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
