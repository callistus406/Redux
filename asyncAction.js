const redux = require("redux");
const thunkMiddleware = require("redux-thunk").default;

const createStore = redux.createStore;
const axios = require("axios");
const applyMiddleware = redux.applyMiddleware;
// create a state
const initialState = {
  loading: false,
  users: [],
  error: "",
};

//  actions

const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

// actionCreators

function fetchUsersRequest() {
  return {
    type: FETCH_USER_REQUEST,
  };
}

function fetchUsersSuccess(users) {
  return {
    type: FETCH_USER_SUCCESS,
    payload: users,
  };
}
function fetchUsersFailure(error) {
  return {
    type: FETCH_USER_FAILURE,
    payload: error,
  };
}

// reducer fns

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        error: "",
      };
    case FETCH_USER_FAILURE:
      return {
        loading: false,
        user: [],
        error: action.payload,
      };
  }
};

// create an async action creator that will fetch the info from the api end point
// this gives the action creators defined above  the ability to return a function instead of an action object
// it receives a dispatch method as argument which makes it possible for it to dispatch action
function fetchUsers() {
  return function (dispatch) {
    dispatch(fetchUsersRequest());
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        const users = response.data.username;
        dispatch(fetchUsersSuccess(users));
      })
      .catch((error) => {
        dispatch(fetchUsersFailure(error.message));
      });
  };
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
// subscribe to the store
store.subscribe(() => console.log(store.getState()));

// dispatch the async action creator

store.dispatch(fetchUsers());
// async  actions
// async api calls to fetch data from an endpoint and use that data in your application
// our application fetches list of users from an api endpoint and stores it in the redux store
// state will have 3 properties
// state={
//     loading: false, //loading spinner in your component
//     data:[], //list of users
//     error:"" //in case of fail api call

// }

// three actions is needed to
// fetchInfoReg
// fetchInfoSuccess
// fetchInfoFailure
