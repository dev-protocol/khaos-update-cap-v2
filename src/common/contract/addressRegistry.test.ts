/* eslint-disable functional/immutable-data */
import test from 'ava'
import { getAddressRegistryInstance } from './addressRegistry'

test('get the AddressConfig contract object.(mainnet)', async (t) => {
	const dummyDetectNetwork = async (): Promise<any> => {
		return {
			chainId: 42161,
		}
	}
	const addressReg = await getAddressRegistryInstance({
		detectNetwork: dummyDetectNetwork,
		_isProvider: true,
	} as any)
	t.is(addressReg.address, '0x1D415aa39D647834786EB9B5a333A50e9935b796')
})

test('get the AddressConfig contract object.(rinkeby)', async (t) => {
	const dummyDetectNetwork = async (): Promise<any> => {
		return {
			chainId: 421611,
		}
	}
	const addressReg = await getAddressRegistryInstance({
		detectNetwork: dummyDetectNetwork,
		_isProvider: true,
	} as any)
	t.is(addressReg.address, '0xD6D07f1c048bDF2B3d5d9B6c25eD1FC5348D0A70')
})
