import test from 'ava'
import { getLockupInstance, getLockupAddress, lockupAbi } from './lockup'

// getLockupInstance
test('get the lockup contract object', async (t) => {
	const detectNetworkFunc = async (): Promise<any> => {
		return { chainId: 42161 }
	}
	const registriesFunc = async (key: string): Promise<string> => {
		return key == 'Lockup' ? '0xA5577D1cec2583058A6Bd6d5DEAC44797c205701' : '0x'
	}
	const lockup = await getLockupInstance(
		{
			detectNetwork: detectNetworkFunc,
			_isProvider: true,
		} as any,
		{ registries: registriesFunc } as any
	)
	t.is(lockup.address, '0xA5577D1cec2583058A6Bd6d5DEAC44797c205701')
})

// lockupAbi
test('get lockup abi', async (t) => {
	t.is(
		lockupAbi[0],
		'event Lockedup(address indexed _from, address indexed _property, uint256 _value, uint256 _tokenId)'
	)
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
	const registriesFunc = async (key: string): Promise<string> => {
		return key == 'Lockup' ? '0xA5577D1cec2583058A6Bd6d5DEAC44797c205701' : '0x'
	}
	const address = await getLockupAddress({ registries: registriesFunc } as any)
	t.is(address, '0xA5577D1cec2583058A6Bd6d5DEAC44797c205701')
})
