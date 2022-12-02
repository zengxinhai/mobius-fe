// export const MOBIUS = '0x3d4f2d8c266f568aa7721dd01e4cd7366fcc7b632aa2d5eeef9fbbc62f4e3661';
//
// const StandardPositionType = `${MOBIUS}::management::StandardPosition`;
//
// const StandardAssetType = `${MOBIUS}::treasury::Assets<${StandardPositionType}>`;
//
// const StandardAssetsNftType = `${MOBIUS}::nft::NFT<${MOBIUS}::assets::AMeta<${StandardPositionType}>, ${MOBIUS}::assets::ABody<${StandardAssetType}>>`;
//
// export const StandardAssetsNftGalleryType = `${MOBIUS}::assets_gallery::AssetsGalleryStore<${StandardAssetsNftType}>`;
//
//
// export const getPoolType = (tokenType: string) => {
//   return `${MOBIUS}::treasury::Position<${StandardPositionType}, ${tokenType}>`;
// }
export const MOBIUS = '0xbebaf664c81aa143a87105a5144cc8c0f9ee6b222adb7b2d2a5265ec0ae71f4e';

export const treasuryModule = `${MOBIUS}::treasury`;
export const managementModule = `${MOBIUS}::management`;
export const assetsModule = `${MOBIUS}::assets`;
export const queryModule = `${MOBIUS}::query`;

export const nftModule = `${MOBIUS}::nft`;
export const assetsGalleryModule = `${MOBIUS}::assets_gallery`;


export const StandardPositionType = `${managementModule}::StandardPosition`;

const StandardAssetType = `${treasuryModule}::Assets<${StandardPositionType}>`;

const StandardAssetsNftType = `${nftModule}::NFT<${assetsModule}::AMeta<${StandardPositionType}>, ${assetsModule}::ABody<${StandardAssetType}>>`;

export const StandardAssetsNftGalleryType = `${assetsGalleryModule}::AssetsGalleryStore<${StandardAssetsNftType}>`;

export const getPoolType = (tokenType: string) => {
  return `${treasuryModule}::Position<${StandardPositionType}, ${tokenType}>`;
}
