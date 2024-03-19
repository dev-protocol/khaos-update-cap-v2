import { ethers, providers } from 'ethers'
import {
	isLongTimeSinceLastUpdate,
	isLatestLockedupEvent,
} from './check-details'

export const isUpdateCap = async (
	provider: providers.BaseProvider,
	lockup: ethers.Contract,
	transactionHash: string
): Promise<boolean> => {
	const isLongTimeNotUpdate = await isLongTimeSinceLastUpdate(provider, lockup)
	const isLastEvent = isLongTimeNotUpdate
		? await isLatestLockedupEvent(provider, lockup, transactionHash)
		: false
	// eslint-disable-next-line functional/no-expression-statement
	console.log('update-cap-v2', { isLongTimeNotUpdate, isLastEvent })
	return isLastEvent
}
