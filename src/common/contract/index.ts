import { lockupAbi, getLockupInstance, getLockupAddress } from './lockup'
import { getMarketFactoryInstance } from './market-factory'
import { getMarketInstance } from './market'
import { getErc20Instance } from './erc20'
import { getDevInstance } from './dev'
import { getUniswapLpAddress } from './uniswap-lp'
import { getWEthInstance } from './w-eth'
import { getAddressRegistryInstance } from './address-registry'

export {
	getMarketFactoryInstance,
	getMarketInstance,
	getErc20Instance,
	getLockupInstance,
	getLockupAddress,
	getDevInstance,
	getUniswapLpAddress,
	getWEthInstance,
	getAddressRegistryInstance,
	lockupAbi,
}
