/* eslint-disable functional/immutable-data */
import test from 'ava'
import { ethers } from 'ethers'
import { getProvider, getL2Provider } from './provider'

// getProvider
test('get the provider of the mainnet.', async (t) => {
	process.env[`KHAOS_MAINNET_JSON_RPC`] = 'https://testdomain:1234'
	const provider = getProvider('mainnet')
	const converted = <ethers.providers.JsonRpcProvider>provider
	t.is(converted.connection.url, 'https://testdomain:1234')
})

test('get the provider of the ropsten.', async (t) => {
	process.env[`KHAOS_ROPSTEN_JSON_RPC`] = 'https://testdomainropsten:1234'
	const provider = getProvider('ropsten')
	const converted = <ethers.providers.JsonRpcProvider>provider
	t.is(converted.connection.url, 'https://testdomainropsten:1234')
})

// getProvider
test('get the l2 provider of the mainnet.', async (t) => {
	process.env[`KHAOS_MAINNET_JSON_RPC_L2`] = 'https://testdomain:1234'
	const provider = getL2Provider('mainnet')
	const converted = <ethers.providers.JsonRpcProvider>provider
	t.is(converted.connection.url, 'https://testdomain:1234')
})

test('get the l2 provider of the ropsten.', async (t) => {
	process.env[`KHAOS_ROPSTEN_JSON_RPC_L2`] = 'https://testdomainropsten:1234'
	const provider = getL2Provider('ropsten')
	const converted = <ethers.providers.JsonRpcProvider>provider
	t.is(converted.connection.url, 'https://testdomainropsten:1234')
})
