import { combineReducers } from 'redux';
import {
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  REQUEST_POSTS,
  RECEIVE_POSTS
} from './actions';

// state is: 'reactjs' or 'frontend'
// action is:
// {
//   type: SELECT_SUBREDDIT,
//   subreddit
// };
function selectedSubreddit(state = 'reactjs', action) {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit;
    default:
      return state;
  }
}

// state is:
// {
//   frontend: {
//     isFetching: true,
//     didInvalidate: false,
//     items: []
//   },
//   reactjs: {...}
// }
//
// action is:
// {
//   type: RECEIVE_POSTS,
//   subreddit,
//   posts: json.data.children.map(child => child.data),
//   receivedAt: Date.now()
// }
function postsBySubreddit(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case REQUEST_POSTS:
    case RECEIVE_POSTS:
      // equivalent to this
      // let nextState = {}
      // nextState[action.subreddit] = posts(state[action.subreddit], action)
      // return Object.assign({}, state, nextState)

      // modify the state at state.postsBySubreddit[subreddit]
      return Object.assign({}, state, {
        [action.subreddit]: posts(state[action.subreddit], action)
      });
    default:
      return state;
  }
}


// state is:
// {
//   isFetching: true,
//   didInvalidate: false,
//   items: []
// },
//
// action is:
// {
//   type: RECEIVE_POSTS,
//   subreddit,
//   posts: json.data.children.map(child => child.data),
//   receivedAt: Date.now()
// }
function posts(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_POSTS:
    return Object.assign({}, state, {
      didInvalidate: false,
      isFetching: false,
      items: action.posts,
      lastUpdated: action.receivedAt
    });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  selectedSubreddit,  // matches top-level state key, selectedSubreddit
  postsBySubreddit    // matches top-level state key, postsBySubreddit
});

export default rootReducer;
