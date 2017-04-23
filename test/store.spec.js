/*global describe, it, beforeEach, afterEach */

import chai from 'chai';
import Store from '../src/Store.js';
import sinon from 'sinon';

chai.expect();

const test = 'Store';
const expect = chai.expect;
const assert = chai.assert;
const store = new Store();
let fakes;

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
    let store = new Store();
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

  it('should set the wasFetched property to false', (done) => {
    assert.isFalse(store.wasFetched);
    done();
  });

  it('should set the wasBroadcast property to false', (done) => {
    assert.isFalse(store.wasBroadcast);
    done();
  });
});


describe(`${test} prototype`, () => {
  it('should have a connect method', (done) => {
    assert.isTrue(typeof store.connect === 'function');
    done();
  });

  it('should have an disconnect method', (done) => {
    assert.isTrue(typeof store.disconnect === 'function');
    done();
  });

  it('should throw a reference error when attempting to connect a component with no truxid', (done) => {
    assert.throws(() => store.connect({}), ReferenceError, 'You must set a truxid on your component before connecting it to a store.');
    done();
  });

  it('should throw a reference error if the component passed to disconnect is not connected to the store', (done) => {
    assert.throws(() => store.disconnect('foo'), ReferenceError, 'The component you are attempting to disconnect is not connected to this store.');
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


describe(`${test} connecting & disconnecting`, () => {
  beforeEach(() => {
    fakes = sinon.collection;
  });

  afterEach(() => {
    fakes.restore();
  });

  it('should bind the component to the store', (done) => {
    let component = { truxid: 'foo', storeDidUpdate: () => {} };

    store.connect(component);
    assert.isTrue(typeof store.components[component.truxid] !== 'undefined');
    assert.isTrue(store.components[component.truxid].truxid === 'foo');
    done();
  });

  it('should log a warning if a component is bound that does not have a storeDidUpdate method', (done) => {
    fakes.stub(console, 'warn');
    store.connect({ truxid: 'foo' });
    expect(console.warn.calledWith('The component you have connected to this store does not contain a storeDidUpdate method.')).to.be.true;
    done();
  });

  it('should unbind the component from the store', (done) => {
    let component = { truxid: 'foo', storeDidUpdate: () => {} };

    store.connect(component);
    store.disconnect(component);
    assert.isTrue(typeof store.components[component.truxid] === 'undefined');
    done();
  });

  it('should emit changes to bound components', (done) => {
    let foo = 1;
    let component = {
      truxid: 'foo',
      storeDidUpdate: () => {
        foo = 2;
      }
    };

    store.connect(component);
    store.emitChangeEvent();
    assert.isTrue(foo === 2);
    done();
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
