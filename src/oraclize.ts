/* eslint-disable functional/no-expression-statement */
import { providers } from 'ethers'
import { FunctionOraclizer } from '@devprotocol/khaos-core'
import { getProvider, getL2Provider, getLockupInstance } from './common'
import { isSameVal, isUpdateCap, getCap } from './cap'
import { bignumber } from 'mathjs'

export const oraclize: FunctionOraclizer = async ({ query, network }) => {
	const provider = getProvider(network)
	const l2Provider = getL2Provider(network)
	const lockupContract = await getLockupInstance(l2Provider)
	const isUpdate = await isUpdateCap(
		l2Provider,
		lockupContract,
		query.transactionhash
	)
	const message = isUpdate ? await getCapValue(provider, l2Provider) : ''
	const isSame =
		message !== '' ? await isSameVal(lockupContract, bignumber(message)) : true
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
	provider: providers.BaseProvider,
	l2Provider: providers.BaseProvider
): Promise<string> => {
	const cap = await getCap(provider, l2Provider)
	const [message] = cap.toFixed().split('.') // Forcibly truncates the decimal point regardless of the BigNumber specifications.
	return message
}
