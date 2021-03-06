
/*global regex */

module('or() cases');

test('basic usage', function () {

    var result;

    result = regex()
        .or()
            .literals('abc')
            .literals('def')
        .endOr()
        .peek();

    strictEqual(result, 'abc|def');

});

test('literals before and after', function () {

    var result;

    result = regex()
        .literal('a')
        .or()
            .literal('b')
            .literal('c')
        .endOr()
        .peek();

    strictEqual(result, 'a(?:b|c)', 'before');

    result = regex()
        .or()
            .literal('b')
            .literal('c')
        .endOr()
        .literal('d')
        .peek();

    strictEqual(result, '(?:b|c)d', 'after');

    result = regex()
        .literal('a')
        .or()
            .literal('b')
            .literal('c')
        .endOr()
        .literal('d')
        .peek();

    strictEqual(result, 'a(?:b|c)d', 'both before and after');

});

test('literals before and after, but no wrap needed', function () {

    var result;

    result = regex()
        .literal('a')
        .or()
            .literal('b')
        .endOr()
        .peek();

    strictEqual(result, 'ab', 'lit before');

    result = regex()
        .or()
            .literal('b')
        .endOr()
        .literal('c')
        .peek();

    strictEqual(result, 'bc', 'lit after');

    result = regex()
        .literal('a')
        .or()
            .literal('b')
        .endOr()
        .literal('c')
        .peek();

    strictEqual(result, 'abc', 'lit before and after');
});

test('capturing or()', function () {

    var result;

    result = regex()
        .literals('a')
        .or()
            .literals('bc')
        .endOr()
        .capture()
        .peek();

    strictEqual(result, 'a(bc)', 'No non-capturing group necessary');

    result = regex()
        .literals('a')
        .or()
            .literals('bc')
            .literals('jk')
        .endOr()
        .capture()
        .peek();

    strictEqual(result, 'a(bc|jk)', 'No non-capturing group necessary');

});

