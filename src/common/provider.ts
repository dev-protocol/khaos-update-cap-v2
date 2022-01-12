import { ethers, providers } from 'ethers'
import { NetworkName } from '@devprotocol/khaos-core'

export const getL2Provider = (network: NetworkName): providers.BaseProvider => {
	const keyName = network.toUpperCase().replace('-', '_')
	const endpoint = process.env[`KHAOS_${keyName}_JSON_RPC_L2`]
	return new ethers.providers.JsonRpcProvider(endpoint)
}

// TODO
// KHAOS_POLYGON_MAINNET_JSON_RPC_L2
// KHAOS_POLYGON_MUMBAI_JSON_RPC_L2
