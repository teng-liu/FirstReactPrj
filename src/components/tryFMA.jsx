import React, { Component } from 'react'

var StateMachine = require('javascript-state-machine');
var visualize = require('javascript-state-machine/lib/visualize');

export default class TryFMA extends Component {

    componentDidMount() {
        // this.fsm = new StateMachine({
        //     init: 'solid',
        //     transitions: [
        //       { name: 'melt',     from: 'solid',  to: 'liquid' },
        //       { name: 'freeze',   from: 'liquid', to: 'solid'  },
        //       { name: 'vaporize', from: 'liquid', to: 'gas'    },
        //       { name: 'condense', from: 'gas',    to: 'liquid' },
        //       { name: 'conden22', from: 'gas',    to: 'solid' }
        //     ],
        //     methods: {
        //       onMelt:     function() { console.log('I melted')    },
        //       onFreeze:   function() { console.log('I froze')     },
        //       onVaporize: function() { console.log('I vaporized') },
        //       onCondense: function() { console.log('I condensed') },
        //       onConden22: function() { console.log('Conden22: I changed! gas -> solid') }
        //     }
        //   });


        this.fsm = new StateMachine({
            init: 'author',
            transitions: [
                { name: 'prepareMyStaff', from: 'author', to:'manager' },
                { name: 'approve', from: 'manager', to:'director' },
                { name: 'approve', from: 'director', to:'scc' },
                { name: 'approve', from: 'scc', to:'cfo' },
                { name: 'approve', from: 'cfo', to:'coo' },
                { name: 'approve', from: 'coo', to:'author' },
                { name: 'decline', from: ['manager', 'director', 'scc'], to:'author' },
                { name: 'decline', from: ['cfo', 'coo'], to:'scc' },
                { name: 'reqVendorSign', from: 'author', to:'vendor' },
                { name: 'sign', from: 'vendor', to:'author' },
                { name: 'reqSign', from: 'author', to:'scc' },
                { name: 'reqSign', from: 'scc', to:'coo' },
                { name: 'sign', from: 'coo', to:'author' },
                { name: 'complete', from: 'author', to:'author' }
            ],
            methods: {
              onPrepareMyStaff:     function() { console.log('prepared...')    },
              onMelt:     function() { console.log('I melted')    },
              onFreeze:   function() { console.log('I froze')     },
              onVaporize: function() { console.log('I vaporized') },
              onCondense: function() { console.log('I condensed') },
              onConden22: function() { console.log('Conden22: I changed! gas -> solid') }
            }
          });

        //   if(this.fsm) {
        //     visualize(this.fsm);
        //   }
          

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
        else if(e.target.name === 'prepareMyStaff'){
            this.fsm.prepareMyStaff();
        }
        else if(e.target.name === 'approve'){
            this.fsm.approve();
        }
        else if(e.target.name === 'decline'){
            this.fsm.decline();
        }
        else if(e.target.name === 'reqSign'){
            this.fsm.reqSign();
        }
        else if(e.target.name === 'sign'){
            this.fsm.sign();
        }
        else if(e.target.name === 'complete'){
            this.fsm.complete();
        }

        console.log("changed to => ", this.fsm.state);
        let trans = this.fsm.transitions().map((t) => {return (<div>{t}</div>)});
        this.setState({data: this.fsm.state});
        this.setState({trans: trans});
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

        if(this.state && this.state.trans){
            return(            
            <div>
                <div style={current}>Current State| Holder  >>>>>  {this.state.data}</div>
                
                <div>
                    Possible Next State:
                    <div style={possi}>{this.state.trans}</div>
                </div>
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

const possi = {
    backgroundColor: '#f4f4f4',
    margin: '5px 10px',
}

const current = {
    backgroundColor: '#f4e842',
}

