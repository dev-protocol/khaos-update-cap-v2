import { ethers, providers } from 'ethers'

export const marketAbi = [
	'function getAuthenticatedProperties() external view returns (address[] memory)',
]

export const getMarketInstance = (
	address: string,
	l2Provider: providers.BaseProvider
): ethers.Contract => {
	const marketContract = new ethers.Contract(address, marketAbi, l2Provider)
	return marketContract
}
