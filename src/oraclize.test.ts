/* eslint-disable functional/no-let */
/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import test from 'ava'
import { ethers } from 'ethers'
import { bignumber, BigNumber } from 'mathjs'
import sinon from 'sinon'
import { NetworkName } from '@devprotocol/khaos-core'
import { oraclize } from './oraclize'
import * as commonModules from './common'
import * as capModules from './cap'
import { BaseProvider } from '@ethersproject/providers'
import { Contract } from '@ethersproject/contracts'

let getL2Provider: sinon.SinonStub<[network: NetworkName], BaseProvider>
let getAddressRegistryInstance: sinon.SinonStub<
	[provider: BaseProvider, network: NetworkName],
	ethers.Contract
>
let getCap: sinon.SinonStub<
	[
		provider: BaseProvider,
		registry: ethers.Contract,
		lofkup: ethers.Contract,
		network: NetworkName
	],
	Promise<BigNumber>
>
let isUpdateCap: sinon.SinonStub<
	[provider: BaseProvider, lockupContract: Contract, transactionHash: string],
	Promise<boolean>
>
let isSameVal: sinon.SinonStub<
	[lockup: Contract, nextCap: BigNumber],
	Promise<boolean>
>
let getLockupInstance: sinon.SinonStub<
	[provider: BaseProvider, registry: ethers.Contract],
	Promise<Contract>
>

const dummyNumber =
	'3175573141986827732.839958658618868394957633106846215492361'

test.before(() => {
	getL2Provider = sinon.stub(commonModules, 'getL2Provider')
	getAddressRegistryInstance = sinon.stub(
		commonModules,
		'getAddressRegistryInstance'
	)
	getLockupInstance = sinon.stub(commonModules, 'getLockupInstance')
	isUpdateCap = sinon.stub(capModules, 'isUpdateCap')
	getCap = sinon.stub(capModules, 'getCap')
	isSameVal = sinon.stub(capModules, 'isSameVal')
	getL2Provider
		.withArgs('polygon-mainnet')
		.returns({ network: 'polygon-mainnet' } as any)
	getAddressRegistryInstance
		.withArgs({ network: 'polygon-mainnet' } as any, 'polygon-mainnet')
		.returns({ name: 'AddressRegistry' } as any)
	getLockupInstance
		.withArgs(
			{ network: 'polygon-mainnet' } as any,
			{ name: 'AddressRegistry' } as any
		)
		.returns({ name: 'lockup' } as any)
})

test('Returns oraclize data', async (t) => {
	isUpdateCap
		.withArgs(
			{ network: 'polygon-mainnet' } as any,
			{ name: 'lockup' } as any,
			'dummy-transaction'
		)
		.resolves(true)
	getCap
		.withArgs(
			{ network: 'polygon-mainnet' } as any,
			{ name: 'AddressRegistry' } as any,
			{ name: 'lockup' } as any,
			'polygon-mainnet'
		)
		.resolves(bignumber(dummyNumber))
	isSameVal
		.withArgs({ name: 'lockup' } as any, bignumber(dummyNumber.split('.')[0]))
		.resolves(false)
	const query = {
		transactionhash: 'dummy-transaction',
		publicSignature: 'dummy-sig',
	}
	const res = await oraclize({
		query: query as any,
		network: 'polygon-mainnet',
		signatureOptions: null as any,
	})
	t.is(res!.message, '3175573141986827732')
	t.is(res!.status, 0)
	t.is(res!.statusMessage, 'polygon-mainnet dummy-sig')
})

test('Returns undefind', async (t) => {
	isUpdateCap
		.withArgs(
			{ network: 'polygon-mumbai' } as any,
			{ name: 'lockup' } as any,
			'dummy-transaction2'
		)
		.resolves(false)
	const query = {
		transactionhash: 'dummy-transaction2',
		publicSignature: 'dummy-sig',
	}
	const res = await oraclize({
		query: query as any,
		network: 'polygon-mumbai',
		signatureOptions: null as any,
	})
	t.true(typeof res === 'undefined')
})

test.after(() => {
	getL2Provider.restore()
	getAddressRegistryInstance.restore()
	getCap.restore()
	isUpdateCap.restore()
	isSameVal.restore()
	getLockupInstance.restore()
})
