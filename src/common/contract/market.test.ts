/* eslint-disable functional/no-promise-reject */
/* eslint-disable functional/no-let */
/* eslint-disable functional/prefer-readonly-type */
import test from 'ava'
import Wallet from 'ethereumjs-wallet'
import { getMarketInstance } from './market'

// getMarketInstance
test('get the market contract object.', async (t) => {
	const wallet = Wallet.generate()
	const address = wallet.getAddressString()
	const market = await getMarketInstance(address, {
		network: 'l2Mainnet',
		_isProvider: true,
	} as any)
	t.is(market.address, address)
})
