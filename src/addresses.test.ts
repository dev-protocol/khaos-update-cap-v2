/* eslint-disable functional/immutable-data */
/* eslint-disable functional/no-promise-reject */
/* eslint-disable functional/no-let */
/* eslint-disable functional/prefer-readonly-type */
import test from 'ava'
import sinon from 'sinon'
import { ethers } from 'ethers'
import { addresses } from './addresses'
import { NetworkName } from '@devprotocol/khaos-core'
import * as providerModules from './common'
import * as contractModules from './common'

let getL2Provider: sinon.SinonStub<
	[network: NetworkName],
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
	getL2Provider.withArgs('arbitrum-one').returns('arbitrum-one' as any)
	getL2Provider.withArgs('arbitrum-rinkeby').returns('arbitrum-rinkeby' as any)
	getAddressRegistryInstance = sinon.stub(
		contractModules,
		'getAddressRegistryInstance'
	)
	getAddressRegistryInstance
		.withArgs('arbitrum-one' as any)
		.resolves({ registries: testFunc } as any)
	getAddressRegistryInstance
		.withArgs('arbitrum-rinkeby' as any)
		.resolves({ registries: testFunc } as any)
})

test('Returns undefined if network is mainnet', async (t) => {
	const res = await addresses({ network: 'mainnet' })
	t.is(res, undefined)
})

test('Returns undefined if network is ropsten', async (t) => {
	const res = await addresses({ network: 'ropsten' })
	t.is(res, undefined)
})

test('Returns arbitrum-one lockup address', async (t) => {
	const res = await addresses({ network: 'arbitrum-one' })
	t.is(res, 'lockup-address')
})

test('Returns arbitrum-rinkeby lockup address', async (t) => {
	const res = await addresses({ network: 'arbitrum-rinkeby' })
	t.is(res, 'lockup-address')
})

test.after(() => {
	getL2Provider.restore()
	getAddressRegistryInstance.restore()
})
