const expect = require('expect.js');

class Calculator {
    static Sum(x: number, y: number): number {
        return x + y;
    }
}

describe('calculate', function () {
    it('add', function () {
        let result = Calculator.Sum(5, 2);
        expect(result).to.be(7);
    });
});