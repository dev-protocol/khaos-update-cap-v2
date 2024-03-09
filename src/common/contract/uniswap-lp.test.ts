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
	t.is(address, '0x4a2752F465EB31653B0D81dF79719c17226801FE')
})

test('get the uniswap lp address(polygon-mumbai).', async (t) => {
	const address = await getUniswapLpAddress('polygon-mumbai')
	t.is(address, '')
})
