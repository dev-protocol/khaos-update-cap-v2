import { ethers, providers } from 'ethers'

export const lockupAbi = [
	'event Lockedup(address indexed _from, address indexed _property, uint256 _value, uint256 _tokenId)',
	'event UpdateCap(uint256)',
	'function updateCap(uint256) external',
	'function cap() external view returns (uint256)',
	'function getLockedupProperties() external view returns (tuple(address property, uint256 value)[])',
]

export const getLockupAddress = async (
	addressRegistry: ethers.Contract
): Promise<string> => {
	return await addressRegistry.registries('Lockup')
}

export const getLockupInstance = async (
	l2Provider: providers.BaseProvider,
	addressRegistry: ethers.Contract
): Promise<ethers.Contract> => {
	const lockupAddress = await getLockupAddress(addressRegistry)
	const lockupContract = new ethers.Contract(
		lockupAddress,
		lockupAbi,
		l2Provider
	)
	return lockupContract
}
