import test from 'ava'
import { getAddressRegistryInstance } from './addressRegistry'

// getAddressRegistryInstance
test('get the AddressConfig contract object.(mainnet)', async (t) => {
	const dummyDetectNetwork = async (): Promise<any> => {
		return {
			chainId: 42161,
		}
	}
	const addressConfig = await getAddressRegistryInstance({
		detectNetwork: dummyDetectNetwork,
		_isProvider: true,
	} as any)
	t.is(addressConfig.address, '0x1D415aa39D647834786EB9B5a333A50e9935b796')
})

test('get the AddressConfig contract object.(rinkeby)', async (t) => {
	const dummyDetectNetwork = async (): Promise<any> => {
		return {
			chainId: 421611,
		}
	}
	const addressConfig = await getAddressRegistryInstance({
		detectNetwork: dummyDetectNetwork,
		_isProvider: true,
	} as any)
	t.is(addressConfig.address, '0xD6D07f1c048bDF2B3d5d9B6c25eD1FC5348D0A70')
})
