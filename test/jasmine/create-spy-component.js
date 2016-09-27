jasmine.createSpyComponent = function createSpyComponent(Component) {
    if (typeof Component !== 'function') {
        throw new Error('Type of a "Component" should be a Function');
    }

    const proto = Component.prototype;
    const name = Component.name;
    const methods = Object.getOwnPropertyNames(proto)
        .filter(function(prop){ return typeof proto[prop] === 'function'});

    return jasmine.createSpyObj(name, methods);
};
