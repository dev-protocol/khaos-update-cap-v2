import { ethers, providers, BigNumber } from 'ethers'
import { bignumber, BigNumber as MathBigNumber } from 'mathjs'
import { NetworkName } from '@devprotocol/khaos-core'
import { getDevInstance, getUniswapLpAddress, getWEthInstance } from '../common'

export const getDevBalanceOfLiquidityPool = async (
	l2Provider: providers.BaseProvider,
	addressRegistry: ethers.Contract,
	network: NetworkName
): Promise<MathBigNumber> => {
	const devInstance = await getDevInstance(l2Provider, addressRegistry)
	const uniswapLpAddress = getUniswapLpAddress(network)
	const balance: BigNumber = await devInstance.balanceOf(uniswapLpAddress)
	return bignumber(balance.toString())
}

export const getWEthBalanceOfLiquidityPool = async (
	l2Provider: providers.BaseProvider,
	network: NetworkName
): Promise<MathBigNumber> => {
	const wEth = getWEthInstance(l2Provider, network)
	const uniswapLpAddress = getUniswapLpAddress(network)
	const balance: BigNumber = await wEth.balanceOf(uniswapLpAddress)
	return bignumber(balance.toString())
}
