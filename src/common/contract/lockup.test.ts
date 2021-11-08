import test from 'ava'
import { getLockupInstance, getLockupAddress, lockupAbi } from './lockup'

// getLockupInstance
test('get the lockup contract object', async (t) => {
	const detectNetworkFunc = async (): Promise<any> => {
		return { chainId: 42161 }
	}
	const lockup = await getLockupInstance({
		detectNetwork: detectNetworkFunc,
		_isProvider: true,
	} as any)
	t.is(lockup.address, '0x1A2B49e10013C40AAC9b6f9e785837bfd329e5e0')
})

// lockupAbi
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

// getLockupAddress
test('get lockup address(arbi-one)', async (t) => {
	const address = getLockupAddress('arbitrum-one')
	t.is(address, '0x1A2B49e10013C40AAC9b6f9e785837bfd329e5e0')
})

test('get lockup address(arbi-rinkeby)', async (t) => {
	const address = getLockupAddress('arbitrum-rinkeby')
	t.is(address, '0x4944CA0423f42DF7c77ad8Cd53F30f31A097F4fa')
})

test('get lockup address(mainnet)', async (t) => {
	const address = getLockupAddress('mainnet')
	t.is(address, '')
})
