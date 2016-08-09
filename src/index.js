import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// State:
// 1. Author
  //  - id
//     - Name
// 2. Post
    // - id
//     - Title
//     - Author id

// combineReducers
var { combineReducers } = Redux;
// The only argument to combineReducers is an object
// This object allows mapping of state field names and the reducers managing them
var blogApp = combineReducers({
  // { state: reducer } - name reducers after the state keys they manage
  authors //: authors - ES6 object literal shorthand notation
  posts //: posts
})

// var blogApp = (state = {}, action)  => {
//   return {
//     authors: authors(state.authors, action),
//     posts: posts(state.posts, action)
//   }
// }

function authors(state, action) {
  switch(action.type) {
  case 'ADD_AUTHOR':
    debugger;
    return {authors: state.authors.concat(action.payload)}
  case 'SELECT_AUTHOR':
    return {}
  default:
    return state
  }
}

function posts(state, action) {
  switch(action.type) {
  case 'ADD_POST':
    return {}
  default:
    return state
  }
}

//store
function createStore(reducer){
  let state;
  const getState = () => {
    return state
  }
  const dispatch = (action) => {
    state = reducer(state, action)
    render()
  }
  state = reducer(state, {})
  return { getState, dispatch}
}


// const visibilityFilter = (state = 'SHOW_ALL', action) => {
//   switch (action.type) {
//     case 'SET_VISIBILITY_FILTER':
//       return action.filter
//     default:
//       return state
//   }
// }

////////////////////////////////////////

const store = createStore(blogApp)
//
class AuthorList extends Component {
  render() {
    return (
      <ul>
      </ul>
    )
  }
}

class PostList extends Component {
  render() {
    return (
      <ul>
      </ul>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <AddAuthorForm />

        <AuthorList />
        <PostList />
      </div>
    )
  }
}

class AddAuthorForm extends Component {
  constructor(){
    super()
    this.state = {term: ''}
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
  }
  render() {
    return (
      <div>
        <form className="add_author" onSubmit={this.handleOnClick}>
          <input type="text" id="AuthorName" value={this.state.term} onChange={this.handleInputChange}/>
          <input type="submit" value="Add Author" />
        </form>
      </div>
    )
  }

  handleInputChange(e){
    this.setState({term: e.target.value})
  }

  handleOnClick(e){
    e.preventDefault();
    store.dispatch({type: 'ADD_AUTHOR', payload: {text: this.state.term}});
    store.dispatch({type: 'SELECT_AUTHOR', payload: {text: e.target.value}});
    store.dispatch({type: 'ADD_POST', payload: {text: e.target.value}});
  }
}
const render = () => {
  ReactDOM.render(
    <App data={store.getState()} />,
      document.getElementById('root')
  );
}

render()
