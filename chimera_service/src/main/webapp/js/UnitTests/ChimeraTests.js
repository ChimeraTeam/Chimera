function isEven(val) {
	return val % 2 === 0;
}

test('isEven()', function() {
    ok(isEven(0), 'Ноль - четное число');
    ok(isEven(2), 'Два - тоже');
    ok(isEven(-4), 'И отрицательное четыре - тоже четное число');
    ok(!isEven(1), 'Один - нечетное число');
    ok(!isEven(-7), 'Как и отрицательное семь - нечетное число');
})
