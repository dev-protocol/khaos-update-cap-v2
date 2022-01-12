/* eslint-disable functional/no-let */
/* eslint-disable functional/prefer-readonly-type */
import test from 'ava'
import sinon from 'sinon'
import { ethers } from 'ethers'
import { NetworkName } from '@devprotocol/khaos-core'
import { BaseProvider } from '@ethersproject/providers'
import * as commonModules from './common'
import { addresses } from './addresses'

let getL2Provider: sinon.SinonStub<[network: NetworkName], BaseProvider>
let getAddressRegistryInstance: sinon.SinonStub<
	[provider: BaseProvider, network: NetworkName],
	ethers.Contract
>
let getLockupAddress: sinon.SinonStub<
	[contract: ethers.Contract],
	Promise<string>
>

test.before(() => {
	getL2Provider = sinon.stub(commonModules, 'getL2Provider')
	getAddressRegistryInstance = sinon.stub(
		commonModules,
		'getAddressRegistryInstance'
	)
	getLockupAddress = sinon.stub(commonModules, 'getLockupAddress')
})

test('Returns lockup address', async (t) => {
	getL2Provider
		.withArgs('polygon-mainnet')
		.returns({ network: 'l2Mainnet' } as any)
	getAddressRegistryInstance
		.withArgs({ network: 'l2Mainnet' } as any, 'polygon-mainnet')
		.returns({ name: 'AddressRegistry' } as any)
	getLockupAddress
		.withArgs({ name: 'AddressRegistry' } as any)
		.resolves('0xhogehoge')

	const res = await addresses({ network: 'polygon-mainnet' })
	t.is(res, '0xhogehoge')
})

test.after(() => {
	getL2Provider.restore()
	getAddressRegistryInstance.restore()
	getLockupAddress.restore()
})
