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
	return isLastEvent
}
