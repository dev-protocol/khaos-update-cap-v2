import { FunctionAddresses } from '@devprotocol/khaos-core'
import {
	getL2Provider,
	getLockupAddress,
	getAddressRegistryInstance,
} from './common'

export const addresses: FunctionAddresses = async ({ network }) => {
	const l2Provider = getL2Provider(network)
	const addressRegistry = getAddressRegistryInstance(l2Provider, network)
	const address = await getLockupAddress(addressRegistry)
	return address
}
