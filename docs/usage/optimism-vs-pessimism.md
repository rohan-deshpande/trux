# Optimism vs Pessimism

Before we get into how Trux handles optimistic and pessimistic updates, let me just explain what I mean by these terms. 

An optimistic update is a state mutating request that you trigger and immediately pass on your new state to your UI with the expectation that the request will succeed. 

In contrast to this, a pessimistic update is a state mutating request that you trigger but are unsure of what the result might be, so you'd like to wait before re-rendering your UI. 

Optimistic updates are incredibly useful for enhancing the user experience of your app. Why make users wait if we know that the data will be identical in the end anyway?

On the other hand, there may be times where continuing in the app would be foolish without confirmation that a request has actually been successful. 

The danger that optimistic updates pose is that if the request fails, you are left in an out-of-sync state on the front end.




