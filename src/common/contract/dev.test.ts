import test from 'ava'
import { getDevInstance } from './dev'

test('get the dev instance.', async (t) => {
	const registriesFunc = async (key: string): Promise<string> => {
		return key == 'Dev' ? '0xA5577D1cec2583058A6Bd6d5DEAC44797c205701' : '0x'
	}
	const dev = await getDevInstance(
		{
			network: 'l2Mainnet',
			_isProvider: true,
		} as any,
		{ registries: registriesFunc } as any
	)
	t.is(dev.address, '0xA5577D1cec2583058A6Bd6d5DEAC44797c205701')
})
