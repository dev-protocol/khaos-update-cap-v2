/* eslint-disable functional/immutable-data */
import test from 'ava'
import { ethers } from 'ethers'
import { getL2Provider, getNetworknameFromProvider } from './provider'

// getL2Provider
test('get the l2 provider of the mainnet.', async (t) => {
	process.env[`KHAOS_ARBITRUM_ONE_JSON_RPC_L2`] = 'https://testdomain:1234'
	const provider = getL2Provider('arbitrum-one')
	const converted = <ethers.providers.JsonRpcProvider>provider
	t.is(converted.connection.url, 'https://testdomain:1234')
	process.env[`KHAOS_ARBITRUM-ONE_JSON_RPC_L2`] = ''
})

test('get the l2 provider of the ropsten.', async (t) => {
	process.env[`KHAOS_ARBITRUM_RINKEBY_JSON_RPC_L2`] =
		'https://testdomainropsten:1234'
	const provider = getL2Provider('arbitrum-rinkeby')
	const converted = <ethers.providers.JsonRpcProvider>provider
	t.is(converted.connection.url, 'https://testdomainropsten:1234')
	process.env[`KHAOS_ARBITRUM-RINKEBY_JSON_RPC_L2`] = ''
})

// getNetworknameFromProvider
test('get network name(arbi-one).', async (t) => {
	const detectNetworkFunc = async (): Promise<any> => {
		return { chainId: 42161 }
	}
	const networkName = await getNetworknameFromProvider({
		detectNetwork: detectNetworkFunc,
	} as any)
	t.is(networkName, 'arbitrum-one')
})

test('get network name(arbi-rinkeby).', async (t) => {
	const detectNetworkFunc = async (): Promise<any> => {
		return { chainId: 421611 }
	}
	const networkName = await getNetworknameFromProvider({
		detectNetwork: detectNetworkFunc,
	} as any)
	t.is(networkName, 'arbitrum-rinkeby')
})
