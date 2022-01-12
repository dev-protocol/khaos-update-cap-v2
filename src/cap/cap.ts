import { ethers, providers } from 'ethers'
import { NetworkName } from '@devprotocol/khaos-core'
import {
	getDevBalanceOfLiquidityPool,
	getWEthBalanceOfLiquidityPool,
} from './uniswap'
import { getAuthinticatedProperty, getLockupSumValues } from './dev-protocol'
import { calculateGeometricMean, calculateArithmeticMean } from './calculate'
import { bignumber, BigNumber } from 'mathjs'

export const getCap = async (
	l2Provider: providers.BaseProvider,
	addressRegistry: ethers.Contract,
	lockup: ethers.Contract,
	network: NetworkName
): Promise<BigNumber> => {
	const devBalance = await getDevBalanceOfLiquidityPool(
		l2Provider,
		addressRegistry,
		network
	)
	const wEthBalance = await getWEthBalanceOfLiquidityPool(l2Provider, network)
	const authinticatedPropertoes = await getAuthinticatedProperty(
		l2Provider,
		addressRegistry
	)
	const lockupSumValues = await getLockupSumValues(lockup)
	const geometricMean = calculateGeometricMean(
		lockupSumValues,
		authinticatedPropertoes
	)
	const arithmeticMean = calculateArithmeticMean(
		lockupSumValues,
		authinticatedPropertoes
	)
	const tmp = bignumber(1).sub(wEthBalance.div(devBalance))
	return devBalance
		.times(tmp)
		.times(12)
		.times(geometricMean)
		.div(arithmeticMean)
}
