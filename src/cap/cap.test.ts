/* eslint-disable functional/no-let */
/* eslint-disable functional/prefer-readonly-type */
import test from 'ava'
import sinon from 'sinon'
import { ethers, providers } from 'ethers'
import { bignumber, BigNumber } from 'mathjs'
import { NetworkName } from '@devprotocol/khaos-core'
import { getCap } from './cap'
import * as uniswapModules from './uniswap'
import * as devProtocolModules from './dev-protocol'

let getDevBalanceOfLiquidityPool: sinon.SinonStub<
	[
		l2Provider: providers.BaseProvider,
		addressRegistry: ethers.Contract,
		network: NetworkName
	],
	Promise<BigNumber>
>
let getWEthBalanceOfLiquidityPool: sinon.SinonStub<
	[l2Provider: providers.BaseProvider, network: NetworkName],
	Promise<BigNumber>
>
let getAuthinticatedProperty: sinon.SinonStub<
	[l2Provider: providers.BaseProvider, addressRegistry: ethers.Contract],
	Promise<readonly string[]>
>
let getLockupSumValues: sinon.SinonStub<
	[lockup: ethers.Contract],
	Promise<{
		readonly [k: string]: BigNumber
	}>
>

test.before(() => {
	getDevBalanceOfLiquidityPool = sinon.stub(
		uniswapModules,
		'getDevBalanceOfLiquidityPool'
	)
	getDevBalanceOfLiquidityPool
		.withArgs(
			{ network: 'l2Main' } as any,
			{ name: 'AddressRegistry' } as any,
			'polygon-mainnet'
		)
		.resolves(bignumber('20000000000000000000000'))

	getWEthBalanceOfLiquidityPool = sinon.stub(
		uniswapModules,
		'getWEthBalanceOfLiquidityPool'
	)
	getWEthBalanceOfLiquidityPool
		.withArgs({ network: 'l2Main' } as any, 'polygon-mainnet')
		.resolves(bignumber('100000000000000000000'))

	getAuthinticatedProperty = sinon.stub(
		devProtocolModules,
		'getAuthinticatedProperty'
	)
	getAuthinticatedProperty
		.withArgs({ network: 'l2Main' } as any, { name: 'AddressRegistry' } as any)
		.resolves([
			'0xhogehoge',
			'0xhugahuga',
			'0xbaubau',
			'0xuiruiruir',
			'0xoiroiroir',
		])
	getLockupSumValues = sinon.stub(devProtocolModules, 'getLockupSumValues')
	getLockupSumValues.withArgs({ name: 'Lockup' } as any).resolves({
		'0xhogehoge': bignumber('10000000000000000000000'),
		'0xhugahuga': bignumber('20000000000000000000000'),
		'0xbaubau': bignumber('30000000000000000000000'),
	})
})

test('get withdraw cap', async (t) => {
	const res = await getCap(
		{ network: 'l2Main' } as any,
		{ name: 'AddressRegistry' } as any,
		{ name: 'Lockup' } as any,
		'polygon-mainnet'
	)
	t.is(
		res.toFixed(),
		'7152919319288666086753.21108429127155937377694420110723946810172'
	)
})

test.after(() => {
	getDevBalanceOfLiquidityPool.restore()
	getWEthBalanceOfLiquidityPool.restore()
	getAuthinticatedProperty.restore()
	getLockupSumValues.restore()
})
