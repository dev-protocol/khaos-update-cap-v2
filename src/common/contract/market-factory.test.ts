import test from 'ava'
import { getMarketFactoryInstance } from './market-factory'

// getMarketFactoryInstance
test('get the market factory contract object(arbi-one)', async (t) => {
	const detectNetworkFunc = async (): Promise<any> => {
		return { chainId: 42161 }
	}
	const marketFactory = await getMarketFactoryInstance({
		detectNetwork: detectNetworkFunc,
		_isProvider: true,
	} as any)
	t.is(marketFactory.address, '0xa2d49EF868b3F8C9501fF9bC836f0679A45E121c')
})

test('get the market factory contract object(arbi-rinkeby)', async (t) => {
	const detectNetworkFunc = async (): Promise<any> => {
		return { chainId: 421611 }
	}
	const marketFactory = await getMarketFactoryInstance({
		detectNetwork: detectNetworkFunc,
		_isProvider: true,
	} as any)
	t.is(marketFactory.address, '0x84b6712Ec4174536daBf019fa6549A2e2125DEae')
})
