import test from 'ava'
import { abi } from './abi'

test('Returns abi informations.', async (t) => {
	t.is(abi[0], 'event Lockedup(address, address, uint256)')
	t.is(abi[1], 'event UpdateCap(uint256)')
	t.is(abi[2], 'function updateCap(uint256) external')
	t.is(abi[3], 'function cap() external view returns (uint256)')
	t.is(
		abi[4],
		'function getLockedupProperties() external view returns (tuple(address property, uint256 value)[])'
	)
})
