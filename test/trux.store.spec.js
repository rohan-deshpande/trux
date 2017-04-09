/*global describe, it, xit, before, beforeEach, after, afterEach */

import chai from 'chai';
import Trux from '../dist/trux.js';
import sinon from 'sinon';

chai.expect();

const test = 'Store';
const expect = chai.expect;
const assert = chai.assert;
const store = new Trux.Store();
let sandbox;

describe(`${test} constructor`, () => {
  it('should setup the components object store', (done) => {
    assert.isTrue(typeof store.components === 'object');
    done();
  });

  it('should set up the event emitter', (done) => {
    assert.isTrue(typeof store.emitter === 'object');
    assert.isTrue(store.emitter.constructor.name === 'EventEmitter');
    done();
  });

  it('should set up the default request headers', (done) => {
    let store = new Trux.Store();
    assert.isTrue(typeof store.requestHeaders === 'object');
    done();
  });

  it('should set up default REST endpoints', (done) => {
    assert.isTrue(typeof store.GET !== 'undefined');
    assert.isTrue(typeof store.POST !== 'undefined');
    assert.isTrue(typeof store.PUT !== 'undefined');
    assert.isTrue(typeof store.PATCH !== 'undefined');
    assert.isTrue(typeof store.DELETE !== 'undefined');
    done();
  });
});


describe(`${test} prototype`, () => {
  it('should have a bindComponent method', (done) => {
    assert.isTrue(typeof store.bindComponent === 'function');
    done();
  });

  it('should have an unbindComponent method', (done) => {
    assert.isTrue(typeof store.unbindComponent === 'function');
    done();
  });

  it('should thrown an error if the component passed to unbindComponent is undefined', (done) => {
    assert.throws(() => store.unbindComponent('foo'), Error, 'The component you are attempting to unbind is not bound to this store');
    done();
  });

  it('should have an emitChangeEvent method', (done) => {
    assert.isTrue(typeof store.emitChangeEvent === 'function');
    done();
  });

  it('should have an addRequestHeader method', (done) => {
    assert.isTrue(typeof store.addRequestHeader === 'function');
    done();
  });

  it('should have an deleteRequestHeader method', (done) => {
    assert.isTrue(typeof store.deleteRequestHeader === 'function');
    done();
  });
});


describe(`${test} binding & unbinding`, () => {
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  it('should bind the component to the store', (done) => {
    let component = { truxId: 'foo', storeDidUpdate: () => {} };

    store.bindComponent(component);
    assert.isTrue(typeof store.components[component.truxId] !== 'undefined');
    assert.isTrue(store.components[component.truxId].truxId === 'foo');
    done();
  });

  it('should log a warning if a component is bound that does not have a storeDidUpdate method', (done) => {
    let component = { truxId: 'foo' };

    sinon.stub(console, 'warn');
    store.bindComponent(component);
    expect(console.warn.calledWith('The component you have bound to this store does not contain a storeDidUpdate method')).to.be.true;
    done();
  });

  it('should unbind the component from the store', (done) => {
    let component = { truxId: 'foo', storeDidUpdate: () => {} };

    store.unbindComponent(component);
    assert.isTrue(typeof store.components[component.truxId] === 'undefined');
    done();
  });

  it('should emit changes to bound components', (done) => {
    let foo = 1;
    let component = {
      truxId: 'bar',
      storeDidUpdate: () => {
        foo = 2;
      }
    };

    store.bindComponent(component);
    store.emitChangeEvent();
    assert.isTrue(foo === 2);
    done();
  });

  afterEach(() => {
    sandbox.restore();
  });
});

describe(`${test} request headers`, () => {
  it('should be able to add header by key, val', (done) => {
    store.addRequestHeader('Accept', 'application/json');
    assert.isTrue(store.requestHeaders['Accept'] === 'application/json');
    done();
  });

  it('should be able to delete header by key', (done) => {
    store.deleteRequestHeader('Accept');
    assert.isTrue(typeof store.requestHeaders['Accept'] === 'undefined');
    done();
  });
});
