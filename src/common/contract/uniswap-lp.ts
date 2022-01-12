import { NetworkName } from '@devprotocol/khaos-core'

export const getUniswapLpAddress = (network: NetworkName): string => {
	return network === 'arbitrum-one'
		? '0xAb2E6375623CDA1ea7950e38A6cF026d059B9791'
		: network === 'arbitrum-rinkeby'
		? ''
		: network === 'polygon-mainnet'
		? '0x2314e3B36e8Da5b4E0B591adb18B3E806f0C6Af5'
		: network === 'polygon-mumbai'
		? ''
		: ''
}
