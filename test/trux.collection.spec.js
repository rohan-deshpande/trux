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
let sandbox;

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
  it('should throw a type error when fill is called with the wrong argument type', (done) => {
    let collection = new Trux.Collection(user);

    assert.throws(() => collection.fill({ id: 1 }), TypeError, 'collections can only be filled with arrays of models');
    done();
  });

  it('should throw an error when trying to append or prepend an invalid model', (done) => {
    let collection = new Trux.Collection(user);

    assert.throws(() => collection.append({ id: 1 }), Error, 'collections can only contain one kind of trux model');
    done();
  });
});
