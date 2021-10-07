import { ethers, providers } from 'ethers'
import { getAddressRegistryInstance } from './addressRegistry'

export const marketFactoryAbi = [
	'function enableMarketList() external view returns (address[] memory)',
]

export const getMarketFactoryInstance = async (
	l2Provider: providers.BaseProvider
): Promise<ethers.Contract> => {
	const addressConfigInstance = await getAddressRegistryInstance(l2Provider)
	const marketFactoryAddress = await addressConfigInstance.registries(
		'MarketFactory'
	)
	const marketFactoryContract = new ethers.Contract(
		marketFactoryAddress,
		marketFactoryAbi,
		l2Provider
	)
	return marketFactoryContract
}
