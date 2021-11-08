import { FunctionAddresses } from '@devprotocol/khaos-core'
import { getLockupAddress } from './common'

export const addresses: FunctionAddresses = async ({ network }) => {
	const address = getLockupAddress(network)
	return address === '' ? undefined : address
}
