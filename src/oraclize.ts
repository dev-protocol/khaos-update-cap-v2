/* eslint-disable functional/no-expression-statement */
import { ethers, providers } from 'ethers'
import { FunctionOraclizer, NetworkName } from '@devprotocol/khaos-core'
import {
	getL2Provider,
	getLockupInstance,
	getAddressRegistryInstance,
} from './common'
import { isSameVal, isUpdateCap, getCap } from './cap'
import { bignumber } from 'mathjs'

export const oraclize: FunctionOraclizer = async ({ query, network }) => {
	const l2Provider = getL2Provider(network)
	const addressRegistry = getAddressRegistryInstance(l2Provider, network)
	const lockup = await getLockupInstance(l2Provider, addressRegistry)
	const isUpdate = await isUpdateCap(l2Provider, lockup, query.transactionhash)
	const message = isUpdate
		? await getCapValue(l2Provider, addressRegistry, lockup, network)
		: ''
	const isSame =
		message !== '' ? await isSameVal(lockup, bignumber(message)) : true
	console.log('update-cap-v2', { isUpdate, message, isSame })
	const result = isSame
		? undefined
		: {
				message,
				status: 0,
				statusMessage: `${network} ${query.publicSignature}`,
		  }
	return result
}

const getCapValue = async (
	l2Provider: providers.BaseProvider,
	addressRegistry: ethers.Contract,
	lockup: ethers.Contract,
	network: NetworkName
): Promise<string> => {
	const cap = await getCap(l2Provider, addressRegistry, lockup, network)
	const [message] = cap.toFixed().split('.') // Forcibly truncates the decimal point regardless of the BigNumber specifications.
	return message
}
