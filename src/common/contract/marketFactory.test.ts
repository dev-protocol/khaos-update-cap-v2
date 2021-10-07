/* eslint-disable functional/no-promise-reject */
/* eslint-disable functional/no-let */
/* eslint-disable functional/prefer-readonly-type */
import test from 'ava'
import sinon from 'sinon'
import { ethers } from 'ethers'
import Wallet from 'ethereumjs-wallet'
import * as addressRegistoryModules from './addressRegistry'
import { getMarketFactoryInstance } from './marketFactory'

let getAddressRegistryInstance: sinon.SinonStub<
	[provider: ethers.providers.BaseProvider],
	Promise<ethers.Contract>
>

const address = Wallet.generate().getAddressString()

test.before(() => {
	const testFunc = async (contractname: string): Promise<string> => {
		const result =
			contractname === 'MarketFactory'
				? Promise.resolve(address)
				: Promise.reject('error')
		return result
	}
	getAddressRegistryInstance = sinon.stub(
		addressRegistoryModules,
		'getAddressRegistryInstance'
	)
	getAddressRegistryInstance
		.withArgs({ network: 'l2Mainnet', _isProvider: true } as any)
		.returns({ registries: testFunc } as any)
})

// getMarketFactoryInstance
test('get the MarketFactory contract object', async (t) => {
	const marketFactory = await getMarketFactoryInstance({
		network: 'l2Mainnet',
		_isProvider: true,
	} as any)
	t.is(marketFactory.address, address)
})

test.after(() => {
	getAddressRegistryInstance.restore()
})
