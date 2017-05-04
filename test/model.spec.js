/*global describe, it, beforeEach, afterEach */

import chai from 'chai';
import { Model, Collection } from '../src/index.js';
import { startServer, stopServer, endpoints, token } from './server.js';
import fetch from 'node-fetch';

chai.expect();

global.fetch = fetch; // eslint-disable-line no-undef

const test = 'Model';
const assert = chai.assert;
const data = { id: 1, name: 'foobar' };
const model = new Model(data);

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

  it('should set the wasCreated property to false', (done) => {
    assert.isFalse(model.wasCreated);
    done();
  });

  it('should set the wasUpdated property to false', (done) => {
    assert.isFalse(model.wasUpdated);
    done();
  });

  it('should set the wasDestroyed property to false', (done) => {
    assert.isFalse(model.wasDestroyed);
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

describe(`${test} methods`, () => {
  it('should persist changes to both its collection\'s connected components and its connected components', (done) => {
    const collection = new Collection(Model);

    collection.append(model);
    model.data.name = 'baz';
    model.persist();

    assert.isTrue(model.wasBroadcast);
    assert.isTrue(collection.wasBroadcast);
    done();
  });

  it('should persist changes to its connected components even when it belongs to a collection if false is passed to persist', (done) => {
    const collection = new Collection(Model);

    collection.append(model);
    model.data.name = 'baz';
    model.persist(false);

    assert.isTrue(model.wasBroadcast);
    assert.isFalse(collection.wasBroadcast);
    done();
  });

  it('should restore the data to its previous state', (done) => {
    model.data.name = 'baz';
    model.restore();

    assert.isTrue(model.data.name === 'foobar');
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

  it('model.fetch should fill the model with the correct data', (done) => {
    const profile = new Model();
    profile.GET = endpoints.profile;

    profile.fetch()
      .then(() => {
        assert.isTrue(profile.data.name === 'foo');
        done();
      })
      .catch(() => {
        done('request failed');
      });
  });

  it('model.fetch should set the wasFetched and wasFetchedAt properties', (done) => {
    const profile = new Model();
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

  it('model.fetch should set wasFetched to false if an error occurs', (done) => {
    const profile = new Model();
    profile.GET = endpoints.notfound;

    profile.fetch()
      .catch(() => {
        assert.isFalse(profile.wasFetched);
        assert.isTrue(typeof profile.wasFetchedAt === 'undefined');
        done();
      });
  });

  it('can chain request methods for custom uses eg., token retrieval from Authorization header', (done) => {
    const profile = new Model();
    profile.GET = endpoints.auth;

    profile.fetch()
      .then((response) => {
        assert.isTrue(response.headers.get('authorization') === token);
        done();
      })
      .catch(() => {
        done('request failed');
      });
  });

  it('model.create should create a record and update the component', (done) => {
    const comment = new Model();
    const component = {
      truxid: 'comment',
      storeDidUpdate: () => {
        component.body = comment.data.body;
      },
      body: ''
    };

    comment.POST = endpoints.comments;
    comment.connect(component);

    assert.isTrue(component.body === '');

    comment.create({
      body: 'foo',
      postId: 1
    }).then((response) => {
      assert.isTrue(JSON.stringify(comment.data) === JSON.stringify(response.json));
      assert.isTrue(component.body === 'foo');
      done();
    }).catch(() => {
      done('post failed');
    });
  });

  it('model.create should set the wasCreated and wasCreatedAt properties', (done) => {
    const comment = new Model();

    comment.POST = endpoints.comments;

    comment.create({
      body: 'bar',
      postId: 1
    }).then(() => {
      assert.isTrue(comment.wasCreated);
      assert.isTrue(typeof comment.wasCreatedAt !== 'undefined');
      done();
    }).catch(() => {
      done('post failed');
    });
  });

  it('model.create should set wasCreated to false if an error occurs', (done) => {
    const profile = new Model();
    profile.POST = endpoints.notfound;

    profile.create({
      body: 'bar',
      postId: 1
    }).catch(() => {
      assert.isFalse(profile.wasCreated);
      done();
    });
  });

  it('model.update should update the remote data and update the component', (done) => {
    const post = new Model();
    const component = {
      truxid: 'post',
      storeDidUpdate: () => {
        component.title = post.data.title;
        component.author = post.data.author;
      },
      title: '',
      author: ''
    };

    post.PUT = `${endpoints.posts}/1`;
    post.connect(component);

    assert.isTrue(component.author === '');

    post.update({
      data: {
        'title': 'foo',
        'author': 'bar'
      }
    }).then((response) => {
      assert.isTrue(JSON.stringify(post.data) === JSON.stringify(response.json));
      assert.isTrue(component.author === 'bar');
      assert.isTrue(component.title === 'foo');
      done();
    }).catch(() => {
      done('update failed');
    });
  });

  it('model.update should set the wasUpdated and wasUpdatedAt properties', (done) => {
    const post = new Model();

    post.PUT = `${endpoints.posts}/1`;

    post.update({data: { title: 'baz' }})
      .then(() => {
        assert.isTrue(post.wasUpdated);
        assert.isTrue(typeof post.wasUpdatedAt !== 'undefined');
        done();
      })
      .catch(() => {
        done('update failed');
      });
  });

  it('model.update should set the wasBroadcast and wasBroadcastAt properties', (done) => {
    const post = new Model();

    post.PUT = `${endpoints.posts}/1`;

    post.update({data: { title: 'qux' }})
      .then(() => {
        assert.isTrue(post.wasBroadcast);
        assert.isTrue(typeof post.wasBroadcastAt !== 'undefined');
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  it('model.update should update the component optimistically if desired', (done) => {
    const post = new Model();
    const component = {
      broadcastCount: 0,
      truxid: 'POST',
      storeDidUpdate: () => {
        component.broadcastCount++;
      }
    };

    post.connect(component);
    post.PUT = `${endpoints.posts}/1`;

    post.update({
      data: { title: 'qux' },
      optimistic: true
    })
      .then(() => {
        assert.isTrue(component.broadcastCount === 2);
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  it('model.delete should delete the remote record and nullify trux model data', (done) => {
    const comment = new Model();

    comment.DELETE = `${endpoints.comments}/1`;

    comment.destroy()
      .then(() => {
        assert.isTrue(comment.data === null);
        done();
      })
      .catch(() => {
        done('delete failed');
      });
  });

  it('model.delete should disconnect all components from itself', (done) => {
    const comment = new Model();
    const body = {
      truxid: 'comment',
      content: 'foo',
      storeDidUpdate: () => {
        body.content = 'bar';
      }
    };

    comment.connect(body);
    comment.DELETE = `${endpoints.comments}/2`;

    comment.destroy()
      .then(() => {
        assert.isTrue(Object.keys(comment.components).length === 0);
        assert.isTrue(body.content === 'foo');
        done();
      })
      .catch(() => {
        done('delete failed');
      });
  });

  it('model.delete should set the wasDestroyed and wasDestroyedAt properties', (done) => {
    const comment = new Model();

    comment.DELETE = `${endpoints.comments}/3`;

    comment.destroy()
      .then(() => {
        assert.isTrue(comment.wasDestroyed);
        assert.isTrue(typeof comment.wasDestroyedAt !== 'undefined');
        done();
      })
      .catch(() => {
        done('delete failed');
      });
  });

  it('model.delete should set wasDestroyed to false if an error occurs', (done) => {
    const profile = new Model();
    profile.DELETE = endpoints.notfound;

    profile.destroy()
      .catch(() => {
        assert.isFalse(profile.wasDestroyed);
        done();
      });
  });

  it('should restore the model data if a request failed', (done) => {
    const comment = new Model({
      id: 5,
      body: 'fooqux',
      postId: 1
    });

    comment.PUT = endpoints.notfound;
    comment.data.body = 'quux';

    assert.isTrue(comment.data.body === 'quux');

    comment.update()
      .catch(() => {
        assert.isTrue(comment.data.body === 'fooqux');
        done();
      });
  });
});

describe(`${test} statics`, () => {
  it('should have a static extend method', (done) => {
    assert.isTrue(typeof Model.extend === 'function');
    done();
  });

  it('static extend method should generate a constructor which is an extension of Model', (done) => {
    let baz = 1;
    const Extension = Model.extend({
      'foo': 'bar',
      'baz': function() {
        return 'qux';
      }
    },
    () => { baz = 2; });
    const extended = new Extension(data);

    assert.isTrue(extended.data.id === 1);
    assert.isTrue(extended.foo === 'bar');
    assert.isTrue(extended.baz() === 'qux');
    assert.isTrue(baz === 2);
    done();
  });

  it('should have a static modify method', (done) => {
    assert.isTrue(typeof Model.modify === 'function');
    done();
  });

  it('static modify method should modify the Model class', (done) => {
    Model.modify({ 'foo': 'bar' });
    const modified = new Model();

    assert.isTrue(modified.foo === 'bar');
    done();
  });

  it('static modify method should throw a TypeError if no props passed', (done) => {
    assert.throws(() => Model.modify(), TypeError, 'You must modify Model with a properties object');
    done();
  });
});
