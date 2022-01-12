import { ethers, providers } from 'ethers'
import { NetworkName } from '@devprotocol/khaos-core'
import { getErc20Instance } from './erc20'

export const getWEthInstance = (
	l2Provider: providers.BaseProvider,
	network: NetworkName
): ethers.Contract => {
	const wEthAddress = getWEthAddress(network)
	return getErc20Instance(wEthAddress, l2Provider)
}

const getWEthAddress = (network: NetworkName): string => {
	return network === 'arbitrum-one'
		? '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1'
		: network === 'arbitrum-rinkeby'
		? '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1'
		: network === 'polygon-mainnet'
		? '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619'
		: network === 'polygon-mumbai'
		? '0x062f24cb618e6ba873EC1C85FD08B8D2Ee9bF23e'
		: ''
}
