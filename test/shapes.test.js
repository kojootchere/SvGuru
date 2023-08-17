const { Triangle, Circle, Square } = require('../lib/shapes');

test('Triangle render method', () => {
    const triangle = new Triangle('blue');
    expect(triangle.render()).toBe('<polygon points="150,18 244,182 56,182" fill="blue" />');
});

test('Circle render method', () => {
    const circle = new Circle('red');
    expect(circle.render()).toBe('<circle cx="150" cy="100" r="90" fill="red" />');
});

test('Square render method', () => {
    const square = new Square('green');
    expect(square.render()).toBe('<rect x="50" y="50" width="200" height="100" fill="green" />');
});

