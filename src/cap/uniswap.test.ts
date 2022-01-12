/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable functional/no-let */
/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/no-conditional-statement */
import test from 'ava'
import sinon from 'sinon'
import { NetworkName } from '@devprotocol/khaos-core'
import { ethers, providers, BigNumber, Contract } from 'ethers'
import * as commonModules from '../common'
import {
	getWEthBalanceOfLiquidityPool,
	getDevBalanceOfLiquidityPool,
} from './uniswap'

let getDevInstance: sinon.SinonStub<
	[l2Provider: providers.BaseProvider, addressRegistry: ethers.Contract],
	Promise<Contract>
>
let getWEthInstance: sinon.SinonStub<
	[l2Provider: providers.BaseProvider, network: NetworkName],
	Contract
>

test.before(() => {
	getDevInstance = sinon.stub(commonModules, 'getDevInstance')
	getWEthInstance = sinon.stub(commonModules, 'getWEthInstance')
})

// getDevBalanceOfLiquidityPool
test('get dev balance(arbitrum-one).', async (t) => {
	const balanceOfFuncArbiOne = async (address: string): Promise<BigNumber> => {
		if (address == '0xAb2E6375623CDA1ea7950e38A6cF026d059B9791') {
			return BigNumber.from(100)
		}
		return BigNumber.from(0)
	}
	getDevInstance
		.withArgs(
			{ network: 'arbitrum-one' } as any,
			{ name: 'AddressRegistry' } as any
		)
		.returns({ balanceOf: balanceOfFuncArbiOne } as any)
	const balance = await getDevBalanceOfLiquidityPool(
		{
			network: 'arbitrum-one',
		} as any,
		{ name: 'AddressRegistry' } as any,
		'arbitrum-one'
	)
	t.true(balance.eq(100))
})

test('get dev balance(polygon-mainnet).', async (t) => {
	const balanceOfFuncArbiOne = async (address: string): Promise<BigNumber> => {
		if (address == '0x2314e3B36e8Da5b4E0B591adb18B3E806f0C6Af5') {
			return BigNumber.from(200)
		}
		return BigNumber.from(0)
	}
	getDevInstance
		.withArgs(
			{ network: 'polygon-mainnet' } as any,
			{ name: 'AddressRegistry' } as any
		)
		.returns({ balanceOf: balanceOfFuncArbiOne } as any)
	const balance = await getDevBalanceOfLiquidityPool(
		{
			network: 'polygon-mainnet',
		} as any,
		{ name: 'AddressRegistry' } as any,
		'polygon-mainnet'
	)
	t.true(balance.eq(200))
})

// getWEthBalanceOfLiquidityPool
test('get weth balance(arbitrum-one).', async (t) => {
	const balanceOfFuncArbiOne = async (address: string): Promise<BigNumber> => {
		if (address == '0xAb2E6375623CDA1ea7950e38A6cF026d059B9791') {
			return BigNumber.from(300)
		}
		return BigNumber.from(0)
	}
	getWEthInstance
		.withArgs(
			{
				network: 'arbitrum-one',
			} as any,
			'arbitrum-one'
		)
		.returns({ balanceOf: balanceOfFuncArbiOne } as any)
	const balance = await getWEthBalanceOfLiquidityPool(
		{
			network: 'arbitrum-one',
		} as any,
		'arbitrum-one'
	)
	t.true(balance.eq(300))
})

test('get weth balance(polygon-mainnet).', async (t) => {
	const balanceOfFuncArbiOne = async (address: string): Promise<BigNumber> => {
		if (address == '0x2314e3B36e8Da5b4E0B591adb18B3E806f0C6Af5') {
			return BigNumber.from(400)
		}
		return BigNumber.from(0)
	}
	getWEthInstance
		.withArgs(
			{
				network: 'polygon-mainnet',
			} as any,
			'polygon-mainnet'
		)
		.returns({ balanceOf: balanceOfFuncArbiOne } as any)
	const balance = await getWEthBalanceOfLiquidityPool(
		{
			network: 'polygon-mainnet',
		} as any,
		'polygon-mainnet'
	)
	t.true(balance.eq(400))
})

test.after(() => {
	getDevInstance.restore()
	getWEthInstance.restore()
})
