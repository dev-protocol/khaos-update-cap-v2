import { ethers, providers } from 'ethers'
import { NetworkName } from '@devprotocol/khaos-core'

export const getAddressRegistryInstance = (
	l2Provider: providers.BaseProvider,
	network: NetworkName
): ethers.Contract => {
	const addressRegistryAddress = getAddressRegistryAddress(network)
	const abi = [
		'function registries(string memory _key) external view returns (address)',
	]
	return new ethers.Contract(addressRegistryAddress, abi, l2Provider)
}

const getAddressRegistryAddress = (network: NetworkName): string => {
	return network === 'arbitrum-one'
		? '0xbeF4DeEA3AE863739Bd402E025c749536f491ffa'
		: network === 'arbitrum-rinkeby'
		? '0x519d5e729fbE6B3e4607260413Fb684759612465'
		: network === 'polygon-mainnet'
		? '0xbeF4DeEA3AE863739Bd402E025c749536f491ffa'
		: network === 'polygon-mumbai'
		? '0xe2C16936413D74c667aeF0D040c920BF639067d4'
		: ''
}
