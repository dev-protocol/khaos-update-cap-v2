/* eslint-disable functional/no-promise-reject */
/* eslint-disable functional/no-let */
/* eslint-disable functional/prefer-readonly-type */
import test from 'ava'
import Wallet from 'ethereumjs-wallet'
import { getErc20Instance } from './erc20'

// getERC20Instance
test('get the erc20 contract object.', async (t) => {
	const wallet = Wallet.generate()
	const address = wallet.getAddressString()
	const market = await getErc20Instance(address, {
		network: 'l2Mainnet',
		_isProvider: true,
	} as any)
	t.is(market.address, address)
})
