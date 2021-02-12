// 1st Create the reducer
const CALCULATE = 'CALCULATE';
const CLICKCOUNT = 'CLICKCOUNT';
const HISTORYADD = 'HISTORYADD';

const INITIAL_STATE = {
  counter:0,
  clicks: 0,
  history: [],
};

function counterReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CALCULATE:
      return ({
        ...state,
        counter: state.counter + action.payload.amount,
      });
    case CLICKCOUNT:
      return ({
        ...state,
        clicks: state.clicks + 1,
      });
    case HISTORYADD:
      return ({
        ...state,
        history: [...state.history, action.payload.amount],
      });
    default:
      return state;
  }
}

// 2nd Create the Store and Like a good DEV window.__REDUX :D
const store = Redux.createStore(
  counterReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

// 3rd Dispatch the actions to Reducers
// Creating Actions
const CALCULATEACTION = (amount) => {
  return {
    type: CALCULATE,
    payload: { amount },
  };
};

const HISTORYACTION = (amount) => {
  return {
    type: HISTORYADD,
    payload: { amount },
  }
}

const incrementTotalClicks = {
  type: CLICKCOUNT,
}

// Adding To Event Listeners
const increaseButton = document.getElementById('increaseButton');
const increaseInput = document.getElementById('increaseInput');
const decreaseButton = document.getElementById('decreaseButton');
const decreaseInput = document.getElementById('decreaseInput');
const displayValue = document.getElementById('displayValue');
const totalClicksValue = document.getElementById('totalClicksValue');
const historyList = document.getElementById('historyList');
const loadButton = document.getElementById('loadButton');

function createli(element) {
  const li = document.createElement("li");
  li.innerHTML = element;
  return li;
}

function addToUl(element) {
  newli = createli(element);
  historyList.appendChild(newli);
}

function relisting() {
  historyList.innerHTML = "";
  store.getState().history.forEach((element) => {
    addToUl(element);
  });
}

increaseButton.addEventListener('click', () => {
  const { value } = increaseInput;
  addToUl(+value);
  store.dispatch(incrementTotalClicks);
  store.dispatch(HISTORYACTION(+value));
  store.dispatch(CALCULATEACTION(+value));
});
decreaseButton.addEventListener('click', () => {
  const { value } = decreaseInput;
  addToUl(-value);
  store.dispatch(incrementTotalClicks);
  store.dispatch(HISTORYACTION(-value));
  store.dispatch(CALCULATEACTION(-value));
});

loadButton.addEventListener('click', () => {
  relisting();
});

// Initialize the Value In the Screen
displayValue.innerText = store.getState().counter;
totalClicksValue.innerText = store.getState().clicks;

// Refresh Value in the screen
store.subscribe(() => {
  displayValue.innerText = store.getState().counter;
  totalClicksValue.innerText = store.getState().clicks;
});
