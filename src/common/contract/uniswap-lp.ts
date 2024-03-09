import { NetworkName } from '@devprotocol/khaos-core'

export const getUniswapLpAddress = (network: NetworkName): string => {
	return network === 'arbitrum-one'
		? '0xAb2E6375623CDA1ea7950e38A6cF026d059B9791'
		: network === 'arbitrum-rinkeby'
		? ''
		: network === 'polygon-mainnet'
		? '0x4a2752F465EB31653B0D81dF79719c17226801FE'
		: network === 'polygon-mumbai'
		? ''
		: ''
}
