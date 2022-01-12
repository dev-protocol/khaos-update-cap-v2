import test from 'ava'
import { getWEthInstance } from './w-eth'

// getWEthInstance
const detectNetworkFunc = async (): Promise<any> => {
	return { chainId: 42161 }
}

test('get the wrapped ether instance(arbitrum-one).', async (t) => {
	const wEth = getWEthInstance(
		{
			detectNetwork: detectNetworkFunc,
			_isProvider: true,
		} as any,
		'arbitrum-one'
	)
	t.is(wEth.address, '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1')
})

test('get the wrapped ether instance(arbitrum-rinkeby).', async (t) => {
	const wEth = getWEthInstance(
		{
			detectNetwork: detectNetworkFunc,
			_isProvider: true,
		} as any,
		'arbitrum-rinkeby'
	)
	t.is(wEth.address, '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1')
})

test('get the wrapped ether instance(polygon-mainnet).', async (t) => {
	const wEth = getWEthInstance(
		{
			detectNetwork: detectNetworkFunc,
			_isProvider: true,
		} as any,
		'polygon-mainnet'
	)
	t.is(wEth.address, '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619')
})

test('get the wrapped ether instance(polygon-mumbai).', async (t) => {
	const wEth = getWEthInstance(
		{
			detectNetwork: detectNetworkFunc,
			_isProvider: true,
		} as any,
		'polygon-mumbai'
	)
	t.is(wEth.address, '0x062f24cb618e6ba873EC1C85FD08B8D2Ee9bF23e')
})
