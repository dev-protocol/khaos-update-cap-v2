import { ethers, providers } from 'ethers'
import { getNetworknameFromProvider } from '../provider'

export const marketFactoryAbi = [
	'function getEnabledMarkets() external view returns (address[] memory)',
]

export const getMarketFactoryInstance = async (
	l2Provider: providers.BaseProvider
): Promise<ethers.Contract> => {
	const networkName = await getNetworknameFromProvider(l2Provider)
	const marketFactoryAddress =
		networkName === 'arbitrum-one'
			? '0xa2d49EF868b3F8C9501fF9bC836f0679A45E121c'
			: networkName === 'arbitrum-rinkeby'
			? '0x84b6712Ec4174536daBf019fa6549A2e2125DEae'
			: ''
	const marketFactoryContract = new ethers.Contract(
		marketFactoryAddress,
		marketFactoryAbi,
		l2Provider
	)
	return marketFactoryContract
}
