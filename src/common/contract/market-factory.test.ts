import test from 'ava'
import { getMarketFactoryInstance } from './market-factory'

// getMarketFactoryInstance
test('get the market factory contract object(arbi-one)', async (t) => {
	const detectNetworkFunc = async (): Promise<any> => {
		return { chainId: 42161 }
	}
	const registriesFunc = async (key: string): Promise<string> => {
		return key == 'MarketFactory'
			? '0xA5577D1cec2583058A6Bd6d5DEAC44797c205701'
			: '0x'
	}
	const marketFactory = await getMarketFactoryInstance(
		{
			detectNetwork: detectNetworkFunc,
			_isProvider: true,
		} as any,
		{ registries: registriesFunc } as any
	)
	t.is(marketFactory.address, '0xA5577D1cec2583058A6Bd6d5DEAC44797c205701')
})
