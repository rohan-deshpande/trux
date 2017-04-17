# React

Trux was designed with React in mind, so working it into your app should be very straight forward. There are a few things you will need to do in your components to get it working as intended however, let's take a look at those now.

## Connecting

Connecting a React component to a Trux store is easy. Here's an example

```js
import { User } from './stores/models';
import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom';

const user = new User(); // custom user model

class Profile extends Component {
    static propTypes = {
        userStore: PropTypes.object.isRequired
    }
    
    constructor(props) {
        super(props);
        this.state = { ready: false }
    }
    
    componentDidMount() {
        this.truxid = 'Profile';
        this.props.userStore.connect(this);
        this.props.userStore.fetch()
            .then(() => {
                this.setState({ ready: true });
            })
            .catch(console.log);
    }
    
    componentWillUnmount() {
        this.props.userStore.disconnect(this);
    }
    
    render() {
        if (!this.props.ready) return null;
        
        const user = this.props.userStore;
        
        return (
            <div className='profile'>
                <ProfilePic image={user.pic} />
                <UserName username={user.username} />
                <UserBio bio={user.bio} />
            </div>
        );
    }
}


```

## Disconnecting



