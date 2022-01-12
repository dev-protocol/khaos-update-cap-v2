import { ethers, providers } from 'ethers'
import { getErc20Instance } from './erc20'

export const getDevInstance = async (
	l2Provider: providers.BaseProvider,
	addressRegistry: ethers.Contract
): Promise<ethers.Contract> => {
	const devAddress = await addressRegistry.registries('Dev')
	return getErc20Instance(devAddress, l2Provider)
}
