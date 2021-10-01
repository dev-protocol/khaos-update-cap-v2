import { ethers, providers } from 'ethers'

export const marketAbi = [
	'function getAuthenticatedProperties() external view returns (address[] memory)',
]

export const getMarketInstance = (
	address: string,
	provider: providers.BaseProvider
): ethers.Contract => {
	const marketContract = new ethers.Contract(address, marketAbi, provider)
	return marketContract
}
