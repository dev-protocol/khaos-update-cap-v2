import { FunctionAddresses } from '@devprotocol/khaos-core'
import { getAddressRegistryInstance } from './common'
import { getProvider } from './common'

export const addresses: FunctionAddresses = async ({ network }) => {
	const provider = getProvider(network)
	const addressRegistory = await getAddressRegistryInstance(provider)
	const lockupAddress = await addressRegistory.registries('Lockup')
	return lockupAddress
}
