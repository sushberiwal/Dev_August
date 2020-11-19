import Todos from './components/todos';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {myReducer} from './reducers/myReducer';

const store = createStore(myReducer);




function App() {
  return (
    <Provider store={store}>
      <Todos></Todos>
    </Provider>
  );
}

export default App;
