import { ethers, providers } from 'ethers'
import { NetworkName } from '@devprotocol/khaos-core'
import { getNetworknameFromProvider } from '../../common'

export const lockupAbi = [
	'event Lockedup(address indexed _from, address indexed _property, uint256 _value, uint256 _tokenId)',
	'event UpdateCap(uint256)',
	'function updateCap(uint256) external',
	'function cap() external view returns (uint256)',
	'function getLockedupProperties() external view returns (tuple(address property, uint256 value)[])',
]

export const getLockupAddress = (network: NetworkName): string => {
	return network === 'arbitrum-one'
		? '0x1A2B49e10013C40AAC9b6f9e785837bfd329e5e0'
		: network === 'arbitrum-rinkeby'
		? '0x4944CA0423f42DF7c77ad8Cd53F30f31A097F4fa'
		: ''
}

export const getLockupInstance = async (
	l2Provider: providers.BaseProvider
): Promise<ethers.Contract> => {
	const networkName = await getNetworknameFromProvider(l2Provider)
	const lockupAddress = getLockupAddress(networkName)
	const lockupContract = new ethers.Contract(
		lockupAddress,
		lockupAbi,
		l2Provider
	)
	return lockupContract
}
