import React, { Component } from 'react'

var StateMachine = require('javascript-state-machine');


export default class TryFMA extends Component {

    componentDidMount() {
        this.fsm = new StateMachine({
            init: 'solid',
            transitions: [
              { name: 'melt',     from: 'solid',  to: 'liquid' },
              { name: 'freeze',   from: 'liquid', to: 'solid'  },
              { name: 'vaporize', from: 'liquid', to: 'gas'    },
              { name: 'condense', from: 'gas',    to: 'liquid' },
              { name: 'conden22', from: 'gas',    to: 'solid' }
            ],
            methods: {
              onMelt:     function() { console.log('I melted')    },
              onFreeze:   function() { console.log('I froze')     },
              onVaporize: function() { console.log('I vaporized') },
              onCondense: function() { console.log('I condensed') },
              onConden22: function() { console.log('Conden22: I changed! gas -> solid') }
            }
          });

        this.state = {data:  ""};
        this.setState({data: this.fsm.state});
        console.log("====================");
        console.log("current state: ", this.state.data);
        
    }

    onEvent = (e) => {
        console.log("====================");
        console.log("current state: ", this.fsm.state);
        if(e.target.name === 'melt'){
            this.fsm.melt();
        }
        else if(e.target.name === 'freeze'){
            this.fsm.freeze();
        }
        else if(e.target.name === 'vaporize'){
            this.fsm.vaporize();
        }
        else if(e.target.name === 'condense'){
            this.fsm.condense();
        }
        else if(e.target.name === 'conden22'){
            this.fsm.conden22();
        }

        console.log("changed to => ", this.fsm.state);
        this.setState({data: this.fsm.state});
    }


    render() {


        let items;
        if(this.fsm){
            items = this.fsm.allTransitions().map((s) => {
                return (
                    <div>
                        <input type="button" value={s} name={s} onClick={(e)=>this.onEvent(e)}></input>
                    </div>
                )
            })
        }

        if(this.state){
            return(            
            <div>
                Current State >>>  {this.state.data}
                {items}
            </div>)
        }
        else{
            return (
                <div>
                    {items}
                </div>
            )
        }

    }
}



