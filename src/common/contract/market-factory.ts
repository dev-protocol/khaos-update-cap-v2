import { ethers, providers } from 'ethers'

const marketFactoryAbi = [
	'function getEnabledMarkets() external view returns (address[] memory)',
]

export const getMarketFactoryInstance = async (
	l2Provider: providers.BaseProvider,
	addressRegistry: ethers.Contract
): Promise<ethers.Contract> => {
	const marketFactoryAddress = await addressRegistry.registries('MarketFactory')
	const marketFactoryContract = new ethers.Contract(
		marketFactoryAddress,
		marketFactoryAbi,
		l2Provider
	)
	return marketFactoryContract
}
