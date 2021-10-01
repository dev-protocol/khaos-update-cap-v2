import { ethers, providers } from 'ethers'
import { getAddressRegistryInstance } from './addressRegistry'

export const lockupAbi = [
	'event Lockedup(address, address, uint256)',
	'event UpdateCap(uint256)',
	'function updateCap(uint256) external',
	'function cap() external view returns (uint256)',
]

export const getLockupInstance = async (
	provider: providers.BaseProvider
): Promise<ethers.Contract> => {
	const addressConfigInstance = await getAddressRegistryInstance(provider)
	const lockupAddress = await addressConfigInstance.registries('Lockup')
	const lockupContract = new ethers.Contract(lockupAddress, lockupAbi, provider)
	return lockupContract
}
