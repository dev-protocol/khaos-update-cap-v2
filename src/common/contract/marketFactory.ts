import { ethers, providers } from 'ethers'
import { getAddressRegistryInstance } from './addressRegistry'

export const marketFactoryAbi = [
	'function enableMarketList() external view returns (address[] memory)',
]

export const getMarketFactoryInstance = async (
	provider: providers.BaseProvider
): Promise<ethers.Contract> => {
	const addressConfigInstance = await getAddressRegistryInstance(provider)
	const marketFactoryAddress = await addressConfigInstance.registries('MarketFactory')
	const marketFactoryContract = new ethers.Contract(marketFactoryAddress, marketFactoryAbi, provider)
	return marketFactoryContract
}
