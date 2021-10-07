import { ethers, providers } from 'ethers'

const addresses = {
	arbitrum: {
		main: {
			// TODO
			registry: '0x1D415aa39D647834786EB9B5a333A50e9935b796',
		},
		rinkeby: {
			// TODO
			registry: '0xD6D07f1c048bDF2B3d5d9B6c25eD1FC5348D0A70',
		},
	},
}

export const getAddressRegistryInstance = async (
	l2Provider: providers.BaseProvider
): Promise<ethers.Contract> => {
	const abi = [
		'function registries(string memory _key) external view returns (address)',
	]
	// https://developer.offchainlabs.com/docs/public_testnet
	const network = await l2Provider.detectNetwork()
	const address =
		network.chainId === 42161
			? addresses.arbitrum.main.registry
			: addresses.arbitrum.rinkeby.registry
	return new ethers.Contract(address, abi, l2Provider)
}
