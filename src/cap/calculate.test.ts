import test from 'ava'
import { bignumber } from 'mathjs'
import { calculateGeometricMean, calculateArithmeticMean } from './calculate'

test('calculate geometric mean', async (t) => {
	const map = {
		'0xhogehoge': bignumber('10000000000000000000000'),
		'0xhugahuga': bignumber('20000000000000000000000'),
		'0xkayokayo': bignumber('30000000000000000000000'),
	}
	const res = calculateGeometricMean(map, [
		'0xhogehoge',
		'0xhugahuga',
		'0xkayokayo',
	])
	t.is(
		res.toFixed(),
		'18171205928321396588912.11756327260502428210463141219671481334289'
	)
})

test('calculate geometric mean(If not staked, convert to 1000000000000000000)', async (t) => {
	const map = {
		'0xhogehoge': bignumber('10000000000000000000000'),
		'0xhugahuga': bignumber('20000000000000000000000'),
		'0xkayokayo': bignumber('30000000000000000000000'),
		'0xqwerqwer': bignumber('0'),
	}
	const res = calculateGeometricMean(map, [
		'0xhogehoge',
		'0xhugahuga',
		'0xkayokayo',
		'0xqwerqwer',
		'0xpowefwev',
	])
	t.is(
		res.toFixed(),
		'359443181873802315917.2467881553402793655164293568395597722664181'
	)
})

test('if there is no value, result is 0(calculateGeometricMean)', async (t) => {
	const res = calculateGeometricMean({}, [])
	t.is(res.toString(), '0')
})

test('calculate arithmetic mean', async (t) => {
	const map = {
		'0xhogehoge': bignumber('10000'),
		'0xhugahuga': bignumber('20000'),
		'0xkayokayo': bignumber('30000'),
	}
	const res = calculateArithmeticMean(map, [
		'0xhogehoge',
		'0xhugahuga',
		'0xkayokayo',
	])
	t.is(res.toString(), '20000')
})

test('calculate arithmetic mean(If not staked, convert to zero)', async (t) => {
	const map = {
		'0xhogehoge': bignumber('10000'),
		'0xhugahuga': bignumber('20000'),
		'0xkayokayo': bignumber('30000'),
	}
	const res = calculateArithmeticMean(map, [
		'0xhogehoge',
		'0xhugahuga',
		'0xkayokayo',
		'0xqwerqwer',
		'0xpowefwev',
	])
	t.is(res.toString(), '12000')
})

test('if there is no value, result is 0(calculateArithmeticMean)', async (t) => {
	const res = calculateArithmeticMean({}, [])
	t.is(res.toString(), '0')
})
