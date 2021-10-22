/* eslint-disable functional/immutable-data */
import test from 'ava'
import { ethers } from 'ethers'
import { getProvider, getL2Provider, isL2 } from './provider'

// getProvider
test('get the provider of the mainnet.', async (t) => {
	process.env[`KHAOS_MAINNET_JSON_RPC`] = 'https://testdomain:1234'
	const provider = getProvider('arbitrum-one')
	const converted = <ethers.providers.JsonRpcProvider>provider
	t.is(converted.connection.url, 'https://testdomain:1234')
	process.env[`KHAOS_MAINNET_JSON_RPC`] = ''
})

test('get the provider of the ropsten.', async (t) => {
	process.env[`KHAOS_ROPSTEN_JSON_RPC`] = 'https://testdomainropsten:1234'
	const provider = getProvider('arbitrum-rinkeby')
	const converted = <ethers.providers.JsonRpcProvider>provider
	t.is(converted.connection.url, 'https://testdomainropsten:1234')
	process.env[`KHAOS_ROPSTEN_JSON_RPC`] = ''
})

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

// isL2
test('If the network name is mainnet, return false', async (t) => {
	const result = isL2('mainnet')
	t.false(result)
})

test('If the network name is ropsten, return false', async (t) => {
	const result = isL2('ropsten')
	t.false(result)
})

test('If the network name is l2, return true', async (t) => {
	const result = isL2('arbitrum-one')
	t.true(result)
})
