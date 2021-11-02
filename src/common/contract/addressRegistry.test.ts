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
	t.is(addressReg.address, '0xbeF4DeEA3AE863739Bd402E025c749536f491ffa')
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
	t.is(addressReg.address, '0x519d5e729fbE6B3e4607260413Fb684759612465')
})
