import { ethers, providers } from 'ethers'
import { NetworkName } from '@devprotocol/khaos-core'

export const getL2Provider = (network: NetworkName): providers.BaseProvider => {
	const keyName = network.toUpperCase().replace('-', '_')
	const endpoint = process.env[`KHAOS_${keyName}_JSON_RPC_L2`]
	return new ethers.providers.JsonRpcProvider(endpoint)
}

export const getNetworknameFromProvider = async (
	l2Provider: providers.BaseProvider
): Promise<NetworkName> => {
	// https://developer.offchainlabs.com/docs/public_testnet
	const network = await l2Provider.detectNetwork()
	return network.chainId === 42161 ? 'arbitrum-one' : 'arbitrum-rinkeby'
}
