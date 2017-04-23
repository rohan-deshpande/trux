# Extending

The Trux `Model` and `Collection` classes are fairly barebones and are designed to be extended for your own use cases. By themselves they really just provide an architectural pattern for changing data and broadcasting these changes to your components.

The power of Trux lies in extending these classes. Let's look at an example of how to do this

```javascript
class User extends Model {
  constructor(data) {
    super(data);
  }

  get firstname() {
    return this.data.firstname;
  }

  get lastname() {
    return this.data.lastname;
  }

  get fullname() {
    return `${this.firstname} ${this.lastname}`;
  }
}
```

Now you can instantiate your `User` model and connect components to it

```javascript
const user = new User({
  firstname: 'Bilbo',
  lastname: 'Baggins'
});

console.log(user.fullname); // logs Bilbo Baggins
```

This allows to also do things like the following when you expect that models will all share some common kinds of data:

```javascript
class Model extends Model {
  constructor(data) {
    super(data);
  }

  get id() {
    return this.data.id;
  }

  get createdAt() {
    return this.data.created_at;
  }

  get modifiedAt() {
    return this.data.modified_at;
  }
}

class User extends Model {
  //...
}

class Post extends Model {
  //...
}
```

**Note!** If you are using ES5 syntax then there is a static method provided on both `Model` and `Collection` - `extend(props, setup)` which can be used for convenience like so:

```javascript
var User = Model.extend({
  getId: function () {
    return this.data.id;
  }
}, function(User) {
  // called within User constructor after the parent has been constructed
  User.GET = `'http://example.com/api/profile/'${User.getId()}`;
});
```



