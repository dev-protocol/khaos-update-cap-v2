import test from 'ava'
import { addresses } from './addresses'

test('Returns undefined if network is mainnet', async (t) => {
	const res = await addresses({ network: 'mainnet' })
	t.is(typeof res, 'undefined')
})

test('Returns undefined if network is ropsten', async (t) => {
	const res = await addresses({ network: 'ropsten' })
	t.is(typeof res, 'undefined')
})

test('Returns arbitrum-one lockup address', async (t) => {
	const res = await addresses({ network: 'arbitrum-one' })
	t.is(res, '0x1A2B49e10013C40AAC9b6f9e785837bfd329e5e0')
})

test('Returns arbitrum-rinkeby lockup address', async (t) => {
	const res = await addresses({ network: 'arbitrum-rinkeby' })
	t.is(res, '0x4944CA0423f42DF7c77ad8Cd53F30f31A097F4fa')
})
