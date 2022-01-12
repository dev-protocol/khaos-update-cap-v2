import test from 'ava'
import { getAddressRegistryInstance } from './address-registry'

const detectNetworkFunc = async (): Promise<any> => {
	return { chainId: 42161 }
}
test('get the address registry instance(arbitrum-one).', async (t) => {
	const addressRegistry = getAddressRegistryInstance(
		{
			detectNetwork: detectNetworkFunc,
			_isProvider: true,
		} as any,
		'arbitrum-one'
	)
	t.is(addressRegistry.address, '0xbeF4DeEA3AE863739Bd402E025c749536f491ffa')
})

test('get the address registry instance(arbitrum-rinkeby).', async (t) => {
	const addressRegistry = getAddressRegistryInstance(
		{
			detectNetwork: detectNetworkFunc,
			_isProvider: true,
		} as any,
		'arbitrum-rinkeby'
	)
	t.is(addressRegistry.address, '0x519d5e729fbE6B3e4607260413Fb684759612465')
})

test('get the address registry instance(polygon-mainnet).', async (t) => {
	const addressRegistry = getAddressRegistryInstance(
		{
			detectNetwork: detectNetworkFunc,
			_isProvider: true,
		} as any,
		'polygon-mainnet'
	)
	t.is(addressRegistry.address, '0xbeF4DeEA3AE863739Bd402E025c749536f491ffa')
})

test('get the address registry instance(polygon-mumbai).', async (t) => {
	const addressRegistry = getAddressRegistryInstance(
		{
			detectNetwork: detectNetworkFunc,
			_isProvider: true,
		} as any,
		'polygon-mumbai'
	)
	t.is(addressRegistry.address, '0xe2C16936413D74c667aeF0D040c920BF639067d4')
})
