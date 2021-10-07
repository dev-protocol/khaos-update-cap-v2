import { providers } from 'ethers'
import {
	getDevBalanceOfLiquidityPool,
	getWEthBalanceOfLiquidityPool,
} from './uniswap'
import { getAuthinticatedProperty, getLockupSumValues } from './dev-protocol'
import { calculateGeometricMean, calculateArithmeticMean } from './calculate'
import { bignumber, BigNumber } from 'mathjs'

export const getCap = async (
	provider: providers.BaseProvider,
	l2Provider: providers.BaseProvider
): Promise<BigNumber> => {
	const devBalance = await getDevBalanceOfLiquidityPool(provider)
	const wEthBalance = await getWEthBalanceOfLiquidityPool(provider)
	const authinticatedPropertoes = await getAuthinticatedProperty(l2Provider)
	const lockupSumValues = await getLockupSumValues(l2Provider)
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
