import { FunctionAddresses } from '@devprotocol/khaos-core'
import { getL2Provider, getAddressRegistryInstance } from './common'

export const addresses: FunctionAddresses = async ({ network }) => {
	const l2Provider = getL2Provider(network)
	const addressRegistory = await getAddressRegistryInstance(l2Provider)
	const lockupAddress = await addressRegistory.registries('Lockup')
	return lockupAddress
}
