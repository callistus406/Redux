const redux = require("redux");
const createStore = redux.createStore;
const combineReducer=redux.combineReducers
const BUY_CAKES = "BUY_CAKES";
const BUY_ICECREAM = "BUY_ICECREAM";
function buyCake() {
  return {
    type: BUY_CAKES,
    // type: Buy_ICECREAM,
    info: "first redux application",
  };
}

function buyIceCream() {
  return {
    type: BUY_ICECREAM,
    info: "first redux application",
  };
}
// initial content of the state
const initialCakeState = {
  numOfCakes: 10,
};
const initialIceCreamState = {
  numOfIceCreams: 20,
};



// the reducer
const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKES:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };

    default:
      return state;
  }
};
// the reducer
const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 2,
      };
    default:
      return state;
  }
};
const rootReducer  =combineReducer({
  iceCream:iceCreamReducer,
  cakes:cakeReducer
}) 

// assigning a reducer to the store
const store = createStore(rootReducer);
// const store = createStore(cakeReducer);

console.log("initialState", store.getState());
console.log("initialState", store.getState());

const unsubscribe = store.subscribe(() =>
  console.log("updated", store.getState())
);

store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());

store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());

unsubscribe();

