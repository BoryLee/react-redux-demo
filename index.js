import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider,connect } from 'react-redux';
import './style.css'

class Counter extends React.Component{
    render(){
        const { value, add, minute } = this.props
        return (
            <div className="container">
                <h1>React-redux 实例</h1>
               <span>{ value }</span>
               <button onClick={ add }>加</button>
               <button onClick={ minute }>减</button>
            </div>
        )
    }
}

// action
const addAction = { type: 'ADD' } 
const minuteAction = { type: 'MINUTE' }

// reducer
const reducer = (state={count:0},action) => {
    let count = state.count;
    switch(action.type){
        case 'ADD':
        return {count: ++count};
        case 'MINUTE':
        --count;
        if(count <= 0){
           return{count:0}; 
        }
        return {count: count};
        default:
        return state;
    }
}

// store
const store = createStore(reducer)

const mapStateToProps = (state) => {
    return {
        value: state.count
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        add: () => dispatch(addAction),
        minute: () => dispatch(minuteAction)
    }
}

const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter)

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    ,
    document.getElementById('app')
)
