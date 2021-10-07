/* eslint-disable functional/no-promise-reject */
/* eslint-disable functional/no-let */
/* eslint-disable functional/prefer-readonly-type */
import test from 'ava'
import sinon from 'sinon'
import Wallet from 'ethereumjs-wallet'
import { ethers } from 'ethers'
import * as addressRegistoryModules from './addressRegistry'
import { getLockupInstance, lockupAbi } from './lockup'

let getAddressRegistryInstance: sinon.SinonStub<
	[provider: ethers.providers.BaseProvider],
	Promise<ethers.Contract>
>

const address = Wallet.generate().getAddressString()

const testFunc = async (contractname: string): Promise<string> => {
	const result =
		contractname === 'Lockup'
			? Promise.resolve(address)
			: Promise.reject('error')
	return result
}

test.before(() => {
	getAddressRegistryInstance = sinon.stub(
		addressRegistoryModules,
		'getAddressRegistryInstance'
	)
	getAddressRegistryInstance
		.withArgs({ network: 'l2Mainnet', _isProvider: true } as any)
		.returns({ registries: testFunc } as any)
})

// getMarketFactoryInstance
test('get the lockup contract object', async (t) => {
	const lockup = await getLockupInstance({
		network: 'l2Mainnet',
		_isProvider: true,
	} as any)
	t.is(lockup.address, address)
})

// getMarketFactoryInstance
test('get lockup abi', async (t) => {
	t.is(lockupAbi[0], 'event Lockedup(address, address, uint256)')
	t.is(lockupAbi[1], 'event UpdateCap(uint256)')
	t.is(lockupAbi[2], 'function updateCap(uint256) external')
	t.is(lockupAbi[3], 'function cap() external view returns (uint256)')
	t.is(
		lockupAbi[4],
		'function getLockedupProperties() external view returns (tuple(address property, uint256 value)[])'
	)
})

test.after(() => {
	getAddressRegistryInstance.restore()
})
