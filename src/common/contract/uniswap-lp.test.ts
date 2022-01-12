import test from 'ava'
import { getUniswapLpAddress } from './uniswap-lp'

// getUniswapLpAddress
test('get the uniswap lp address(arbitrum-one).', async (t) => {
	const address = await getUniswapLpAddress('arbitrum-one')
	t.is(address, '0xAb2E6375623CDA1ea7950e38A6cF026d059B9791')
})

test('get the uniswap lp address(arbitrum-rinkeby).', async (t) => {
	const address = await getUniswapLpAddress('arbitrum-rinkeby')
	t.is(address, '')
})

test('get the uniswap lp address(polygon-mainnet).', async (t) => {
	const address = await getUniswapLpAddress('polygon-mainnet')
	t.is(address, '0x2314e3B36e8Da5b4E0B591adb18B3E806f0C6Af5')
})

test('get the uniswap lp address(polygon-mumbai).', async (t) => {
	const address = await getUniswapLpAddress('polygon-mumbai')
	t.is(address, '')
})
