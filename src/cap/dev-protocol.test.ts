/* eslint-disable functional/no-let */
/* eslint-disable functional/prefer-readonly-type */

import test from 'ava'
import sinon from 'sinon'
import { providers, BigNumber, Contract } from 'ethers'
import {
	getAuthinticatedProperty,
	getLockupSumValues,
	LockedupProperty,
} from './dev-protocol'
import * as commonModules from '../common'

let getMarketFactoryInstance: sinon.SinonStub<
	[l2Provider: providers.BaseProvider],
	Promise<Contract>
>

let getMarketInstance: sinon.SinonStub<
	[address: string, l2Provider: providers.BaseProvider],
	Contract
>

let getLockupInstance: sinon.SinonStub<
	[l2Provider: providers.BaseProvider],
	Promise<Contract>
>

const getEnabledMarketsFunc = async (): Promise<string[]> => {
	return Promise.resolve(['marketAddress1', 'marketAddress2'])
}

const getAuthenticatedPropertiesFunc1 = async (): Promise<string[]> => {
	return Promise.resolve(['property1', 'property2', 'property3'])
}
const getAuthenticatedPropertiesFunc2 = async (): Promise<string[]> => {
	return Promise.resolve(['property3', 'property4'])
}

const getLockedupPropertiesFunc = async (): Promise<LockedupProperty[]> => {
	const data1: LockedupProperty = {
		property: 'property1',
		value: BigNumber.from('10000000000000000'),
	}
	const data2: LockedupProperty = {
		property: 'property2',
		value: BigNumber.from('20000000000000000'),
	}
	const data3: LockedupProperty = {
		property: 'property3',
		value: BigNumber.from('30000000000000000'),
	}
	return Promise.resolve([data1, data2, data3])
}

test.before(() => {
	getMarketFactoryInstance = sinon.stub(
		commonModules,
		'getMarketFactoryInstance'
	)
	getMarketInstance = sinon.stub(commonModules, 'getMarketInstance')
	getLockupInstance = sinon.stub(commonModules, 'getLockupInstance')
})

test('get property list.', async (t) => {
	getMarketFactoryInstance
		.withArgs({ network: 'l2Mainnet' } as any)
		.returns({ getEnabledMarkets: getEnabledMarketsFunc } as any)
	getMarketInstance
		.withArgs('marketAddress1', { network: 'l2Mainnet' } as any)
		.returns({
			getAuthenticatedProperties: getAuthenticatedPropertiesFunc1,
		} as any)
	getMarketInstance
		.withArgs('marketAddress2', { network: 'l2Mainnet' } as any)
		.returns({
			getAuthenticatedProperties: getAuthenticatedPropertiesFunc2,
		} as any)
	const properties = await getAuthinticatedProperty({
		network: 'l2Mainnet',
	} as any)
	t.is(properties.length, 4)
	t.is(properties[0], 'property1')
	t.is(properties[1], 'property2')
	t.is(properties[2], 'property3')
	t.is(properties[3], 'property4')
})

test('get lockup info.', async (t) => {
	getLockupInstance
		.withArgs({ network: 'l2Mainnet' } as any)
		.returns({ getLockedupProperties: getLockedupPropertiesFunc } as any)
	const lockupSumValues = await getLockupSumValues({
		network: 'l2Mainnet',
	} as any)
	t.true(lockupSumValues['property1'].eq('10000000000000000'))
	t.true(lockupSumValues['property2'].eq('20000000000000000'))
	t.true(lockupSumValues['property3'].eq('30000000000000000'))
	const len = Object.keys(lockupSumValues).length
	t.is(len, 3)
})

test.after(() => {
	getMarketFactoryInstance.restore()
	getMarketInstance.restore()
	getLockupInstance.restore()
})
