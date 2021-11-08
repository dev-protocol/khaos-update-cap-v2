/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable functional/no-let */
/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/no-conditional-statement */
import test from 'ava'
import sinon from 'sinon'
import { NetworkName } from '@devprotocol/khaos-core'
import { providers, BigNumber, Contract } from 'ethers'
import * as commonModules from '../common'
import {
	getWEthBalanceOfLiquidityPool,
	getDevBalanceOfLiquidityPool,
} from './uniswap'

let getErc20Instance: sinon.SinonStub<
	[address: string, provider: providers.BaseProvider],
	Contract
>
let getNetworknameFromProvider: sinon.SinonStub<
	[l2Provider: providers.BaseProvider],
	Promise<NetworkName>
>

test.before(() => {
	getNetworknameFromProvider = sinon.stub(
		commonModules,
		'getNetworknameFromProvider'
	)
	getErc20Instance = sinon.stub(commonModules, 'getErc20Instance')
})

// getDevBalanceOfLiquidityPool
test('get dev balance(arbi-one).', async (t) => {
	const balanceOfFuncArbiOne = async (address: string): Promise<BigNumber> => {
		if (address == '0xAb2E6375623CDA1ea7950e38A6cF026d059B9791') {
			return BigNumber.from(100)
		}
		return BigNumber.from(0)
	}
	getNetworknameFromProvider
		.withArgs({ network: 'arbitrum-one' } as any)
		.resolves('arbitrum-one')
	getErc20Instance
		.withArgs('0x91F5dC90979b058eBA3be6B7B7e523df7e84e137', {
			network: 'arbitrum-one',
		} as any)
		.returns({ balanceOf: balanceOfFuncArbiOne } as any)
	const balance = await getDevBalanceOfLiquidityPool({
		network: 'arbitrum-one',
	} as any)
	t.true(balance.eq(100))
})

test('get dev balance(arbi-rinkeby).', async (t) => {
	const balanceOfFuncArbiRinkeby = async (
		address: string
	): Promise<BigNumber> => {
		if (address == '0xAb2E6375623CDA1ea7950e38A6cF026d059B9791') {
			return BigNumber.from(1000)
		}
		return BigNumber.from(0)
	}
	getNetworknameFromProvider
		.withArgs({ network: 'arbitrum-rinkeby' } as any)
		.resolves('arbitrum-rinkeby')
	getErc20Instance
		.withArgs('0xc28BBE3B5ec1b06FDe258864f12c1577DaDFadDC', {
			network: 'arbitrum-rinkeby',
		} as any)
		.returns({ balanceOf: balanceOfFuncArbiRinkeby } as any)
	const balance = await getDevBalanceOfLiquidityPool({
		network: 'arbitrum-rinkeby',
	} as any)
	t.true(balance.eq(1000))
})

test('get dev balance(dummy).', async (t) => {
	const balanceOfFuncDummy = async (address: string): Promise<BigNumber> => {
		return BigNumber.from(0)
	}
	getNetworknameFromProvider
		.withArgs({ network: 'dummy' } as any)
		.resolves('' as any)
	getErc20Instance
		.withArgs('', { network: 'dummy' } as any)
		.returns({ balanceOf: balanceOfFuncDummy } as any)
	const balance = await getDevBalanceOfLiquidityPool({
		network: 'dummy',
	} as any)
	t.true(balance.eq(0))
})

// getWEthBalanceOfLiquidityPool
test('get weth balance.', async (t) => {
	const balanceOfFuncArbiOne = async (address: string): Promise<BigNumber> => {
		if (address == '0xAb2E6375623CDA1ea7950e38A6cF026d059B9791') {
			return BigNumber.from(100)
		}
		return BigNumber.from(0)
	}
	getErc20Instance
		.withArgs('0x82aF49447D8a07e3bd95BD0d56f35241523fBab1', {
			network: 'arbitrum-one',
		} as any)
		.returns({ balanceOf: balanceOfFuncArbiOne } as any)
	const balance = await getWEthBalanceOfLiquidityPool({
		network: 'arbitrum-one',
	} as any)
	t.true(balance.eq(100))
})

test.after(() => {
	getErc20Instance.restore()
})
