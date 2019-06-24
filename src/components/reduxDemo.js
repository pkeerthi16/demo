import React,{Component} from 'react';
import {createStore} from 'redux';
export default class ReduxDemo extends Component{
    render(){
        // Step 1 Store: reducer and state
        const store = createStore(reducer,"peace");
        // Step 2 Reducer: state and action 
        const reducer = function(state,action){
            if(action.type==='Attack'){
                return action.payload
            }
        }
        // Step 3: Subscribe
        store.subscribe(() => {
            console.log('Store is now', store.getState());
        })
        // Step 4:
        return(
            <div><p>view</p></div>
        );
    }
}