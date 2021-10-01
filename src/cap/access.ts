import { providers, BigNumber, ethers } from 'ethers'
import { bignumber, BigNumber as MathBigNumber } from 'mathjs'
import { getErc20Instance, getAddressConfigInstance, getMarketFactoryInstance, getMarketInstance } from '../common'

const UNISWAP_LP = '0x4168CEF0fCa0774176632d86bA26553E3B9cF59d'
const WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'

export const getDevBalanceOfLiquidityPool = async (
	l1Provider: providers.BaseProvider
): Promise<MathBigNumber> => {
	const addressConfigInstance = await getAddressConfigInstance(l1Provider)
	const devTokenAddress: string = await addressConfigInstance.token()
	const devInstance = getErc20Instance(devTokenAddress, l1Provider)
	const balance: BigNumber = await devInstance.balanceOf(UNISWAP_LP)
	return bignumber(balance.toString())
}

export const getWEthBalanceOfLiquidityPool = async (
	l1Provider: providers.BaseProvider
): Promise<MathBigNumber> => {
	const wEthInstance = getErc20Instance(WETH, l1Provider)
	const balance: BigNumber = await wEthInstance.balanceOf(UNISWAP_LP)
	return bignumber(balance.toString())
}

export const getAuthinticatedProperty = async (
	provider: providers.BaseProvider
): Promise<readonly string[]> => {
	const marketFactory = await getMarketFactoryInstance(provider)
	const marketAddressList = await marketFactory.enableMarketList()
	const propertiesList = (await marketAddressList.map(async (marketAddress: string) => {
		const market = getMarketInstance(marketAddress, provider)
		const properties = (await market.getAuthenticatedProperties()) as readonly string[]
		return properties
	})) as readonly [readonly string[]]
	const properties = propertiesList.reduce((val1: readonly string[], val2: readonly string[]): readonly string[] => {
		return val1.concat(val2)
	}, [])
	return properties
}
