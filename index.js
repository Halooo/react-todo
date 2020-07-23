<!DOCTYPE html>
<html>
<head>
  <title>MANORLEAD Todos Goals</title>
  <script src='https://cdnjs.cloudflare.com/ajax/libs/redux/3.7.2/redux.min.js'></script>
  <script src='https://unpkg.com/react@16.3.0-alpha.1/umd/react.development.js'></script>
  <script src='https://unpkg.com/react-dom@16.3.0-alpha.1/umd/react-dom.development.js'></script>
  <script src='https://unpkg.com/babel-standalone@6.15.0/babel.min.js'></script>
  <script src='https://tylermcginnis.com/goals-todos-api/index.js'></script>
  <script src='https://unpkg.com/redux-thunk@2.2.0/dist/redux-thunk.min.js'></script>
</head>
<body>
  <div id='app'></div>

  <script type='text/javascript'>
    function generateId () {
      return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
    }

    // App Code
    const ADD_TODO = 'ADD_TODO'
    const REMOVE_TODO = 'REMOVE_TODO'
    const TOGGLE_TODO = 'TOGGLE_TODO'
    const ADD_GOAL = 'ADD_GOAL'
    const REMOVE_GOAL = 'REMOVE_GOAL'
    const RECEIVE_DATA = 'RECEIVE_DATA'

    function addTodoAction (todo) {
      return {
        type: ADD_TODO,
        todo,
      }
    }

    function removeTodoAction (id) {
      return {
        type: REMOVE_TODO,
        id,
      }
    }

    function toggleTodoAction (id) {
      return {
        type: TOGGLE_TODO,
        id,
      }
    }

    function addGoalAction (goal) {
      return {
        type: ADD_GOAL,
        goal,
      }
    }

    function removeGoalAction (id) {
      return {
        type: REMOVE_GOAL,
        id,
      }
    }

    function receiveDataAction (todos, goals) {
      return {
        type: RECEIVE_DATA,
        todos,
        goals,
      }
    }

    function handleAddTodo (name, cb) {
        // TO IMPLEMENT
        // You can use the following API call: API.saveTodo(name)
    }

    function handleDeleteTodo (todo) {
        // TO IMPLEMENT
        // You can use the following API call: API.deleteTodo(todo.id)
    }

    function handleToggle (id) {
        // TO IMPLEMENT
        // You can use the following API call: API.saveTodoToggle(id)
    }

    function handleAddGoal (name, cb) {
        // TO IMPLEMENT
        // You can use the following API call: API.saveGoal(name)
    }

    function handleDeleteGoal (goal) {
        // TO IMPLEMENT
        // You can use the following API call: API.deleteGoal(goal.id)
    }

    function handleInitialData () {
      return (dispatch) => {
        return Promise.all([
          API.fetchTodos(),
          API.fetchGoals()
        ]).then(([ todos, goals ]) => {
          dispatch(receiveDataAction(todos, goals))
        })
      }
    }

    // UPDATED THE STATE DEPENDING ON THE CASE
    function todos (state = [], action) {
      switch(action.type) {
        case ADD_TODO :
          // TO IMPLEMENT
        case REMOVE_TODO :
          // TO IMPLEMENT
        case TOGGLE_TODO :
          // TO IMPLEMENT
        case RECEIVE_DATA :
          return action.todos
        default :
          return state
      }
    }

    // UPDATED THE STATE DEPENDING ON THE CASE
    function goals (state = [], action) {
      switch(action.type) {
        case ADD_GOAL :
          // TO IMPLEMENT
        case REMOVE_GOAL :
          // TO IMPLEMENT
        case RECEIVE_DATA :
          return action.goals
        default :
          return state
      }
    }

    function loading (state = true, action) {
      switch(action.type) {
        case RECEIVE_DATA :
          return false
        default :
          return state
      }
    }

    const checker = (store) => (next) => (action) => {
      if (
        action.type === ADD_TODO &&
        action.todo.name.toLowerCase().includes('bitcoin')
      ) {
        return alert("Nope. That's a bad idea.")
      }

      if (
        action.type === ADD_GOAL &&
        action.goal.name.toLowerCase().includes('bitcoin')
      ) {
        return alert("Nope. That's a bad idea.")
      }

      return next(action)
    }

    const logger = (store) => (next) => (action) => {
      console.group(action.type)
        console.log('The action: ', action)
        const result = next(action)
        console.log('The new state: ', store.getState())
      console.groupEnd()
      return result
    }

    const store = Redux.createStore(// TO IMPLEMENT)
  </script>

  <script type='text/babel'>
    function List (props) {
      return (
        <ul>
          {props.items.map((item) => (
            <li key={item.id}>
              <span
                onClick={() => props.toggle && props.toggle(item.id)}
                style={{textDecoration: item.complete ? 'line-through' : 'none'}}>
                  {item.name}
              </span>
              <button onClick={() => props.remove(item)}>
                X
              </button>
            </li>
          ))}
        </ul>
      )
    }

    class Todos extends React.Component {
      addItem = (e) => {
        // TO IMPLEMENT
      }
      removeItem = (todo) => {
        // TO IMPLEMENT
      }
      toggleItem = (id) => {
        // TO IMPLEMENT
      }
      render() {
        return (
          <div>
            <h1>Todo List</h1>
            <input
              type='text'
              placeholder='Add Todo'
              ref={(input) => this.input = input}
            />
            <button onClick={this.addItem}>Add Todo</button>

            <List
              toggle={this.toggleItem}
              items={this.props.todos}
              remove={this.removeItem}
            />
          </div>
        )
      }
    }

    class Goals extends React.Component {
      addItem = (e) => {
        // TO IMPLEMENT
      }
      removeItem = (goal) => {
        // TO IMPLEMENT
      }
      render() {
        return (
          <div>
            <h1>Goals</h1>
            <input
              type='text'
              placeholder='Add Goal'
              ref={(input) => this.input = input}
            />
            <button onClick={this.addItem}>Add Goal</button>

            <List
              items={this.props.goals}
              remove={this.removeItem}
            />
          </div>
        )
      }
    }

    class App extends React.Component {
      componentDidMount () {
        const { store } = this.props

        store.dispatch(handleInitialData())

        store.subscribe(() => this.forceUpdate())
      }
      render() {
        const { store } = this.props
        const { todos, goals, loading } = store.getState()

        if (loading === true) {
          return <h3>Loading</h3>
        }

        return (
          <div>
            <Todos todos={todos} store={this.props.store} />
            <Goals goals={goals} store={this.props.store} />
          </div>
        )
      }
    }

    ReactDOM.render(
      <App store={store}/>,
      document.getElementById('app')
    )
  </script>
</body>
</html>
