import { providers } from 'ethers'
import {
	getDevBalanceOfLiquidityPool,
	getWEthBalanceOfLiquidityPool,
	getAuthinticatedProperty,
} from './access'
//import { getLockupSumValues, getAuthinticatedProperty } from './'

// import { getLockupSumValues } from './graphql'
// import { getAuthinticatedPropertyList, getLockupValuesMap } from './format'
// import { calculateGeometricMean, calculateArithmeticMean } from './calculate'
import { bignumber, BigNumber } from 'mathjs'

export const getCap = async (
	provider: providers.BaseProvider,
	l1Provider: providers.BaseProvider
): Promise<BigNumber> => {
	const devBalance = await getDevBalanceOfLiquidityPool(l1Provider)
	const wEthBalance = await getWEthBalanceOfLiquidityPool(l1Provider)
	const authinticatedPropertoes = await getAuthinticatedProperty(provider)
	// const lockupSumValues = await getLockupSumValues('v1')
	// const authinticatedPropertyList = getAuthinticatedPropertyList(
	// 	authinticatedPropertoes
	// )
	// const lockupValuesMap = getLockupValuesMap(lockupSumValues)
	// const geometricMean = calculateGeometricMean(
	// 	lockupValuesMap,
	// 	authinticatedPropertyList
	// )
	// const arithmeticMean = calculateArithmeticMean(
	// 	lockupValuesMap,
	// 	authinticatedPropertyList
	// )
	// const tmp = bignumber(1).sub(wEthBalance.div(devBalance))
	// return devBalance
	// 	.times(tmp)
	// 	.times(12)
	// 	.times(geometricMean)
	// 	.div(arithmeticMean)
	return bignumber(0)
}
