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
const User = Trux.Model.extend();
const Post = Trux.Model.extend({
  getTitle: function() {
    return this.data.title;
  }
});

describe(`${test} constructor`, () => {
  it('shound throw an error if no model constructor supplied', (done) => {
    assert.throws(() => new Trux.Collection(), TypeError, 'You must supply a model constructor to a collection');
    done();
  });

  it('should set the model constructor', (done) => {
    const collection = new Trux.Collection(User);

    assert.isTrue(collection.model instanceof User.constructor);
    done();
  });

  it('should set the models property as an array', (done) => {
    const collection = new Trux.Collection(User);

    assert.isTrue(Array.isArray(collection.models));
    done();
  });

  it('should return an instance of the collection', (done) => {
    const collection = new Trux.Collection(User);

    assert.isTrue(collection instanceof Trux.Collection);
    done();
  });
});

describe(`${test} methods`, () => {
  it('should have a fill method', (done) => {
    const collection = new Trux.Collection(User);

    assert.isTrue(typeof collection.fill === 'function');
    done();
  });

  it('should have a purge method', (done) => {
    const collection = new Trux.Collection(User);

    assert.isTrue(typeof collection.purge === 'function');
    done();
  });

  it('should have a fetch method', (done) => {
    const collection = new Trux.Collection(User);

    assert.isTrue(typeof collection.fetch === 'function');
    done();
  });

  it('should throw a type error when fill is called with the wrong argument type', (done) => {
    const collection = new Trux.Collection(User);

    assert.throws(() => collection.fill({ id: 1 }), TypeError, 'collections can only be filled with arrays of models');
    done();
  });

  it('should throw an error when trying to append or prepend an invalid model', (done) => {
    const collection = new Trux.Collection(User);

    assert.throws(() => collection.append({ id: 1 }), Error, 'collections can only contain one kind of trux model');
    assert.throws(() => collection.prepend({ id: 1 }), Error, 'collections can only contain one kind of trux model');
    done();
  });

  it('should fill with models when fill is called and passed an array of models', (done) => {
    const collection = new Trux.Collection(User);
    const usersNum = users.length;

    assert.isTrue(collection.models.length === 0);
    collection.fill(users);
    assert.isTrue(collection.models.length === usersNum);
    done();
  });

  it('should empty its models when purge is called', (done) => {
    const collection = new Trux.Collection(User);
    collection.fill(users);

    assert.isTrue(collection.models.length > 0);
    collection.purge();
    assert.isTrue(collection.models.length === 0);

    done();
  });
});

describe(`${test} requests`, () => {
  beforeEach(() => {
    startServer();
  });

  afterEach(() => {
    stopServer();
  });

  it('should fill the collection with models after the fetch request has resolved', (done) => {
    const posts = new Trux.Collection(Post);

    posts.GET = endpoints.posts;
    posts.fetch()
      .then(() => {
        assert.isTrue(posts.models.length !== 0);
        assert.isTrue(posts.models[0].getTitle() === 'baz');
        done();
      })
      .catch(() => {
        done('fetch failed');
      });
  });
});
