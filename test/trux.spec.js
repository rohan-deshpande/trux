/*global describe, it, before, after */

import chai from 'chai';
import Trux from '../dist/trux.js';
import serve from './server.js';

chai.expect();

global.fetch = require('node-fetch');

const expect = chai.expect;
const assert = chai.assert;

describe('Store constructor', () => {
  it('should setup the components object store', (done) => {
    let store = new Trux.Store();
    assert.isTrue(typeof store.components === 'object');
    done();
  });
});

describe('Store constructor', () => {
  it('should set up the event emitter', (done) => {
    let store = new Trux.Store();
    assert.isTrue(typeof store.emitter === 'object');
    assert.isTrue(store.emitter.constructor.name === 'EventEmitter');
    done();
  });
});

describe('Store constructor', () => {
  it('should set up the default request headers', (done) => {
    let store = new Trux.Store();
    assert.isTrue(typeof store.requestHeaders === 'object');
    done();
  });
});

describe('Store constructor', () => {
  it('should set up default REST endpoints', (done) => {
    let store = new Trux.Store();
    assert.isTrue(typeof store.GET !== 'undefined');
    assert.isTrue(typeof store.POST !== 'undefined');
    assert.isTrue(typeof store.PUT !== 'undefined');
    assert.isTrue(typeof store.PATCH !== 'undefined');
    assert.isTrue(typeof store.DELETE !== 'undefined');
    done();
  });
});
