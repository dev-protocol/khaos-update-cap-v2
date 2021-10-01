import { ethers, providers } from 'ethers'

export const getProvider = (network: string): providers.BaseProvider => {
	const endpoint = process.env[`KHAOS_${network.toUpperCase()}_JSON_RPC`]
	return new ethers.providers.JsonRpcProvider(endpoint)
}

export const getL1Provider = (network: string): providers.BaseProvider => {
	const endpoint = process.env[`KHAOS_${network.toUpperCase()}_JSON_RPC_L1`]
	return new ethers.providers.JsonRpcProvider(endpoint)
}
