/*global describe, it, xit, before, beforeEach, after, afterEach */

import chai from 'chai';
import Trux from '../dist/trux.js';
import { startServer, stopServer, endpoints } from './server.js';
import sinon from 'sinon';
import fetch from 'node-fetch';

chai.expect();

global.fetch = fetch;

const test = 'Collection';
const expect = chai.expect;
const assert = chai.assert;
const users = [{ id: 1, name: 'foo' }, { id: 2, name: 'bar' }, { id: 3, name: 'baz' }];
const user = Trux.Model.extend({
  getId: () => {
    return this.data.id;
  },
  getName: () => {
    return this.data.name;
  }
});

describe(`${test} constructor`, () => {
  it('shound throw an error if no model constructor supplied', (done) => {
    assert.throws(() => new Trux.Collection(), TypeError, 'You must supply a model constructor to a collection');
    done();
  });

  it('should set the model constructor', (done) => {
    let collection = new Trux.Collection(user);

    assert.isTrue(collection.model instanceof user.constructor);
    done();
  });

  it('should set the models property as an array', (done) => {
    let collection = new Trux.Collection(user);

    assert.isTrue(Array.isArray(collection.models));
    done();
  });

  it('should return an instance of the collection', (done) => {
    let collection = new Trux.Collection(user);

    assert.isTrue(collection instanceof Trux.Collection);
    done();
  });
});

describe(`${test} methods`, () => {
  it('should have a fill method', (done) => {
    let collection = new Trux.Collection(user);

    assert.isTrue(typeof collection.fill === 'function');
    done();
  });

  it('should have a purge method', (done) => {
    let collection = new Trux.Collection(user);

    assert.isTrue(typeof collection.purge === 'function');
    done();
  });

  it('should have a fetch method', (done) => {
    let collection = new Trux.Collection(user);

    assert.isTrue(typeof collection.fetch === 'function');
    done();
  });

  it('should throw a type error when fill is called with the wrong argument type', (done) => {
    let collection = new Trux.Collection(user);

    assert.throws(() => collection.fill({ id: 1 }), TypeError, 'collections can only be filled with arrays of models');
    done();
  });

  it('should throw an error when trying to append or prepend an invalid model', (done) => {
    let collection = new Trux.Collection(user);

    assert.throws(() => collection.append({ id: 1 }), Error, 'collections can only contain one kind of trux model');
    assert.throws(() => collection.prepend({ id: 1 }), Error, 'collections can only contain one kind of trux model');
    done();
  });

  it('should fill with models when fill is called and passed an array of models', (done) => {
    let collection = new Trux.Collection(user);
    const usersNum = users.length;

    assert.isTrue(collection.models.length === 0);
    collection.fill(users);
    assert.isTrue(collection.models.length === usersNum);
    done();
  });

  it('should empty its models when purge is called', (done) => {
    let collection = new Trux.Collection(user);
    collection.fill(users);

    assert.isTrue(collection.models.length > 0);
    collection.purge();
    assert.isTrue(collection.models.length === 0);

    done();
  });
});

describe.skip(`${test} requests`, () => {
  it('should fill the collection with models after the fetch request has resolved', (done) => {
    done();
  });
});
