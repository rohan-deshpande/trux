/*global describe, it, xit, before, beforeEach, after, afterEach */

import chai from 'chai';
import Trux from '../dist/trux.js';
import { startServer, stopServer, endpoints } from './server.js';
import sinon from 'sinon';
import fetch from 'node-fetch';

chai.expect();

global.fetch = fetch;

const test = 'Model';
const expect = chai.expect;
const assert = chai.assert;
const data = { id: 1, name: 'rohan deshpande' };
const model = new Trux.Model(data);
let sandbox;

describe(`${test} constructor`, () => {
  it('should be filled with the data supplied to the constructor', (done) => {
    assert.isTrue(model.data !== null);
    assert.isTrue(JSON.stringify(data) === JSON.stringify(model.data));
    done();
  });

  it('should not belong to a collection yet', (done) => {
    assert.isFalse(model.collection);
    done();
  });

  it('should set a fill method', (done) => {
    assert.isTrue(typeof model.fill === 'function');
    done();
  });

  it('should set a restore method', (done) => {
    assert.isTrue(typeof model.restore === 'function');
    done();
  });
});

describe(`${test} protoype`, () => {
  it('should have a persist method', (done) => {
    assert.isTrue(typeof model.persist === 'function');
    done();
  });

  it('should have a fetch method', (done) => {
    assert.isTrue(typeof model.fetch === 'function');
    done();
  });

  it('should have a create method', (done) => {
    assert.isTrue(typeof model.create === 'function');
    done();
  });

  it('should have an update method', (done) => {
    assert.isTrue(typeof model.update === 'function');
    done();
  });

  it('should have a destroy method', (done) => {
    assert.isTrue(typeof model.destroy === 'function');
    done();
  });
});

describe(`${test} statics`, () => {
  it('should have a static extend method', (done) => {
    assert.isTrue(typeof Trux.Model.extend === 'function');
    done();
  });

  it('static extend method should generate a constructor which is an extension of Trux.Model', (done) => {
    let baz = 1;
    const Extension = Trux.Model.extend({ 'foo': 'bar' }, () => { baz = 2; });
    const extended = new Extension(data);

    assert.isTrue(extended.data.id === 1);
    assert.isTrue(extended.foo === 'bar');
    assert.isTrue(baz === 2);
    done();
  });

  it('should have a static modify method', (done) => {
    assert.isTrue(typeof Trux.Model.modify === 'function');
    done();
  });

  it('static modify method should modify the Trux.Model class', (done) => {
    Trux.Model.modify({ 'foo': 'bar' });
    const modified = new Trux.Model();

    assert.isTrue(modified.foo === 'bar');
    done();
  });
});

describe(`${test} requests`, () => {
  beforeEach(() => {
    startServer();
  });

  it('model.fetch should fill the model with the correct data', (done) => {
    const profile = new Trux.Model();
    profile.GET = endpoints.profile;

    profile.fetch()
      .then(() => {
        assert.isTrue(profile.data.name === 'rohandeshpande');
        done();
      })
      .catch(() => {
        done('request failed');
      });
  });

  it('model.fetch should set the wasFetched and wasFetchedAt properties', (done) => {
    const profile = new Trux.Model();
    profile.GET = endpoints.profile;

    profile.fetch()
      .then(() => {
        assert.isTrue(profile.wasFetched);
        assert.isTrue(typeof profile.wasFetchedAt !== 'undefined');
        done();
      })
      .catch(() => {
        done('fetch failed');
      });
  });

  it('model.update should update the remote data and update the component', (done) => {
    const post = new Trux.Model();
    const component = {
      truxId: 'postView',
      storeDidUpdate: () => {
        component.title = post.data.title;
        component.author = post.data.author;
      },
      title: '',
      author: ''
    };

    post.PUT = endpoints.putPost;
    post.bindComponent(component);

    assert.isTrue(component.author === '');

    post.update({
      'title': 'foo',
      'author': 'bar'
    }).then((response) => {
      assert.isTrue(JSON.stringify(post.data) === JSON.stringify(response.json));
      assert.isTrue(component.author === 'bar');
      assert.isTrue(component.title === 'foo');
      done();
    }).catch(() => {
      done('update failed');
    });
  });

  afterEach(() => {
    stopServer();
  });
});
