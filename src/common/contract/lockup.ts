import { ethers, providers } from 'ethers'
import { getAddressRegistryInstance } from './addressRegistry'

export const lockupAbi = [
	'event Lockedup(address, address, uint256)',
	'event UpdateCap(uint256)',
	'function updateCap(uint256) external',
	'function cap() external view returns (uint256)',
	'function getLockedupProperties() external view returns (tuple(address property, uint256 value)[])',
]

export const getLockupInstance = async (
	l2Provider: providers.BaseProvider
): Promise<ethers.Contract> => {
	const addressConfigInstance = await getAddressRegistryInstance(l2Provider)
	const lockupAddress = await addressConfigInstance.registries('Lockup')
	const lockupContract = new ethers.Contract(
		lockupAddress,
		lockupAbi,
		l2Provider
	)
	return lockupContract
}
