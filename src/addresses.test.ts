/* eslint-disable functional/no-promise-reject */
/* eslint-disable functional/no-let */
/* eslint-disable functional/prefer-readonly-type */
import test from 'ava'
import sinon from 'sinon'
import { ethers } from 'ethers'
import { addresses } from './addresses'
import * as providerModules from './common'
import * as contractModules from './common'

let getL2Provider: sinon.SinonStub<
	[network: string],
	ethers.providers.BaseProvider
>
let getAddressRegistryInstance: sinon.SinonStub<
	[provider: ethers.providers.BaseProvider],
	Promise<ethers.Contract>
>

const testFunc = async (contractname: string): Promise<string> => {
	const result =
		contractname === 'Lockup'
			? Promise.resolve('lockup-address')
			: Promise.reject('error')
	return result
}

test.before(() => {
	getL2Provider = sinon.stub(providerModules, 'getL2Provider')
	getL2Provider.withArgs('mainnet').returns('mainnet' as any)
	getL2Provider.withArgs('ropsten').returns('ropsten' as any)
	getAddressRegistryInstance = sinon.stub(
		contractModules,
		'getAddressRegistryInstance'
	)
	getAddressRegistryInstance
		.withArgs('mainnet' as any)
		.resolves({ registries: testFunc } as any)
	getAddressRegistryInstance
		.withArgs('ropsten' as any)
		.resolves({ registries: testFunc } as any)
})

test('Returns mainnet lockup address', async (t) => {
	const res = await addresses({ network: 'mainnet' })
	t.is(res, 'lockup-address')
})

test('Returns ropsten lockup address', async (t) => {
	const res = await addresses({ network: 'ropsten' })
	t.is(res, 'lockup-address')
})
test.after(() => {
	getL2Provider.restore()
	getAddressRegistryInstance.restore()
})
