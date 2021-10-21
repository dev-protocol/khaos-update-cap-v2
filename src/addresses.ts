import { FunctionAddresses } from '@devprotocol/khaos-core'
import { NetworkName } from '@devprotocol/khaos-core'
import { getL2Provider, getAddressRegistryInstance, isL2 } from './common'

export const addresses: FunctionAddresses = async ({ network }) => {
	return isL2(network) ? await getLockupAddress(network) : undefined
}

const getLockupAddress = async (network: NetworkName): Promise<string> => {
	const l2Provider = getL2Provider(network)
	const addressRegistory = await getAddressRegistryInstance(l2Provider)
	const lockupAddress = await addressRegistory.registries('Lockup')
	return lockupAddress
}
