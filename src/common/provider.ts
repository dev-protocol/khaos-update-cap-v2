import { ethers, providers } from 'ethers'
import { NetworkName } from '@devprotocol/khaos-core'

export const getProvider = (network: NetworkName): providers.BaseProvider => {
	const isMain = isMainNet(network)
	const keyName = isMain ? 'mainnet' : 'ropsten'
	const endpoint = process.env[`KHAOS_${keyName.toUpperCase()}_JSON_RPC`]
	return new ethers.providers.JsonRpcProvider(endpoint)
}

export const getL2Provider = (network: NetworkName): providers.BaseProvider => {
	const endpoint = process.env[`KHAOS_${network.toUpperCase()}_JSON_RPC_L2`]
	return new ethers.providers.JsonRpcProvider(endpoint)
}

export const isL2 = (network: NetworkName): boolean => {
	return network !== 'mainnet' && network !== 'ropsten'
}

const isMainNet = (network: NetworkName): boolean => {
	return network === 'mainnet' || network === 'arbitrum-one'
}
