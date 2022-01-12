import { ethers, providers, BigNumber } from 'ethers'
import { bignumber, BigNumber as MathBigNumber } from 'mathjs'
import { getMarketFactoryInstance, getMarketInstance } from '../common'

export const getAuthinticatedProperty = async (
	l2Provider: providers.BaseProvider,
	addressRegistry: ethers.Contract
): Promise<readonly string[]> => {
	const marketFactory = await getMarketFactoryInstance(
		l2Provider,
		addressRegistry
	)
	const marketAddressList = await marketFactory.getEnabledMarkets()
	const propertiesList = await Promise.all(
		marketAddressList.map(async (marketAddress: string) => {
			const market = getMarketInstance(marketAddress, l2Provider)
			const properties = await market.getAuthenticatedProperties()
			return properties
		}) as readonly [readonly string[]]
	)
	const properties = propertiesList.reduce(
		(val1: readonly string[], val2: readonly string[]): readonly string[] => {
			return val1.concat(val2)
		},
		[]
	)
	return [...new Set(properties)]
}

export type LockedupProperty = {
	readonly property: string
	readonly value: BigNumber
}
export const getLockupSumValues = async (
	lockup: ethers.Contract
): Promise<{
	readonly [k: string]: MathBigNumber
}> => {
	const lockedupProperties =
		(await lockup.getLockedupProperties()) as readonly LockedupProperty[]
	const lockupSumValues = Object.fromEntries(
		lockedupProperties.map((lockedupProperty) => [
			lockedupProperty.property,
			bignumber(lockedupProperty.value.toString()),
		])
	)
	return lockupSumValues
}
