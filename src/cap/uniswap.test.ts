/* eslint-disable functional/no-let */
/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/no-conditional-statement */
import test from 'ava'
import sinon from 'sinon'
import { providers, BigNumber, Contract } from 'ethers'
import * as contractModules from '../common'
import {
	getWEthBalanceOfLiquidityPool,
	getDevBalanceOfLiquidityPool,
} from './uniswap'

let getAddressRegistryInstance: sinon.SinonStub<
	[provider: providers.BaseProvider],
	Promise<Contract>
>
let getErc20Instance: sinon.SinonStub<
	[address: string, provider: providers.BaseProvider],
	Contract
>

const registriesFunc = async (arg: string): Promise<string> => {
	return arg === 'Dev' ? 'dummy-dev-token-address' : ''
}

const balanceOfFunc = async (address: string): Promise<BigNumber> => {
	if (address == '0xAb2E6375623CDA1ea7950e38A6cF026d059B9791') {
		return BigNumber.from(100)
	}
	return BigNumber.from(0)
}

test.before(() => {
	getAddressRegistryInstance = sinon.stub(
		contractModules,
		'getAddressRegistryInstance'
	)
	getAddressRegistryInstance
		.withArgs(null as any)
		.returns({ registries: registriesFunc } as any)
	getErc20Instance = sinon.stub(contractModules, 'getErc20Instance')
	getErc20Instance
		.withArgs('dummy-dev-token-address', null as any)
		.returns({ balanceOf: balanceOfFunc } as any)
	getErc20Instance
		.withArgs('0x82aF49447D8a07e3bd95BD0d56f35241523fBab1', null as any)
		.returns({ balanceOf: balanceOfFunc } as any)
})

// getDevBalanceOfLiquidityPool
test('get dev balance.', async (t) => {
	const balance = await getDevBalanceOfLiquidityPool(null as any)
	t.true(balance.eq(100))
})

// getWEthBalanceOfLiquidityPool
test('get weth balance.', async (t) => {
	const balance = await getWEthBalanceOfLiquidityPool(null as any)
	t.true(balance.eq(100))
})

test.after(() => {
	getAddressRegistryInstance.restore()
	getErc20Instance.restore()
})
