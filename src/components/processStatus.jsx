import React, { Component } from 'react'

var StateMachine = require('javascript-state-machine');
var visualize = require('javascript-state-machine/lib/visualize');


//https://github.com/jakesgordon/javascript-state-machine 


export default class ProcessStatus extends Component {

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
            init: 'start',
            transitions: [

                { name: 'next', from: 'start', to: 'templatePreparing' },
                { name: 'templatePrepare', from: 'templatePreparing', to: 'templatePrepared' },
                { name: 'next', from: 'templatePrepared', to: 'templatePendingAcceptanceByVendor' },
                { name: 'partBacceptTemplate', from: 'templatePendingAcceptanceByVendor', to: 'templateAcceptedByVendor' },
                { name: 'next', from: 'templateAcceptedByVendor', to: 'templateFixed' },
                { name: 'next', from: 'templateFixed', to: 'contractPreparing' },
                { name: 'contractPrepare', from: 'contractPreparing', to: 'contractPrepared' },
                { name: 'next', from: 'contractPrepared', to: 'PendingL1Approval' },
                { name: 'level1Approve', from: 'PendingL1Approval', to: 'level1Approved' },
                { name: 'level1Decline', from: 'PendingL1Approval', to: 'level1Declined' },
                { name: 'next', from: 'level1Declined', to: 'contractPendingCorrection' },
                { name: 'contractCorrectionL1', from: 'contractPendingCorrection', to: 'contractCorrectedL1Issue' },
                { name: 'next', from: 'contractCorrectedL1Issue', to: 'PendingL1Approval' },
                { name: 'next', from: 'level1Approved', to: 'PendingL2Approval' },
                { name: 'level2Approve', from: 'PendingL2Approval', to: 'level2Approved' },
                { name: 'level2Decline', from: 'PendingL2Approval', to: 'level2Declined' },
                { name: 'next', from: 'level2Declined', to: 'contractPendingCorrectionL2Issue' },
                { name: 'contractCorrectionL2', from: 'contractPendingCorrectionL2Issue', to: 'contractCorrectedL2Issue' },
                { name: 'next', from: 'contractCorrectedL2Issue', to: 'PendingL1Approval' },
                { name: 'next', from: 'level2Approved', to: 'PendingL3Approval' },
                { name: 'level3Approve', from: 'PendingL3Approval', to: 'level3Approved' },
                { name: 'level3Decline', from: 'PendingL3Approval', to: 'level3Declined' },
                { name: 'next', from: 'level3Declined', to: 'contractPendingCorrectionL3Issue' },
                { name: 'contractCorrectionL3', from: 'contractPendingCorrectionL3Issue', to: 'contractCorrectedL3Issue' },
                { name: 'next', from: 'contractCorrectedL3Issue', to: 'PendingL3Approval' },
                { name: 'next', from: 'level3Approved', to: 'PendingL4Approval' },
                { name: 'level4Approve', from: 'PendingL4Approval', to: 'level4Approved' },
                { name: 'level4Decline', from: 'PendingL4Approval', to: 'level4Declined' },
                { name: 'next', from: 'level4Declined', to: 'contractPendingCorrectionL4Issue' },
                { name: 'contractCorrectionL4', from: 'contractPendingCorrectionL4Issue', to: 'contractCorrectedL4Issue' },
                { name: 'next', from: 'contractCorrectedL4Issue', to: 'PendingL3Approval' },
                { name: 'next', from: 'level4Approved', to: 'PendingL5Approval' },
                { name: 'level5Approve', from: 'PendingL5Approval', to: 'level5Approved' },
                { name: 'level5Decline', from: 'PendingL5Approval', to: 'level5Declined' },
                { name: 'next', from: 'level5Declined', to: 'contractPendingCorrectionL5Issue' },
                { name: 'contractCorrectionL5', from: 'contractPendingCorrectionL5Issue', to: 'contractCorrectedL5Issue' },
                { name: 'next', from: 'contractCorrectedL5Issue', to: 'PendingL3Approval' },
                { name: 'next', from: 'level5Approved', to: 'PreparingPartBSign' },
                { name: 'preparePartBSign', from: 'PreparingPartBSign', to: 'PendingPartBSign' },
                { name: 'partBSign', from: 'PendingPartBSign', to: 'PartBSigned' },
                { name: 'partBSignDecline', from: 'PendingPartBSign', to: 'PartBDeclined' },
                { name: 'next', from: 'PartBDeclined', to: 'contractPendingCorrectionL100Issue' },
                { name: 'contractCorrectionL100', from: 'contractPendingCorrectionL100Issue', to: 'contractCorrectedL100Issue' },
                { name: 'next', from: 'contractCorrectedL100Issue', to: 'PendingL3Approval' },
                { name: 'next', from: 'PartBSigned', to: 'PreparingPartASign' },
                { name: 'preparePartASign', from: 'PreparingPartASign', to: 'PendingPartASign' },
                { name: 'partASign', from: 'PendingPartASign', to: 'PartASigned' },
                { name: 'next', from: 'PartASigned', to: 'Finalizing' },
                { name: 'finalize', from: 'Finalizing', to: 'Finalized' },
                { name: 'next', from: 'Finalized', to: 'Finished' }

            ],
            methods: {
              onMelt:     function() { console.log('I melted')    },
              onContractCorrectionL1:  function() {this.role = "Author"},
              onContractCorrectionL100:  function() {this.role = "Author"},
              onContractCorrectionL2:  function() {this.role = "Author"},
              onContractCorrectionL3:  function() {this.role = "Author"},
              onContractCorrectionL4:  function() {this.role = "SCC"},
              onContractCorrectionL5:  function() {this.role = "SCC"},
              onContractPrepare:  function() {this.role = "Author"},
              onFinalize:  function() {this.role = "SCC"},
              onLevel1Approve:  function() {this.role = "Manager";},
              onLevel1Decline:  function() {this.role = "Manager"},
              onLevel2Approve:  function() {this.role = "Director"},
              onLevel2Decline:  function() {this.role = "Director"},
              onLevel3Approve:  function() {this.role = "SCC"},
              onLevel3Decline:  function() {this.role = "SCC"},
              onLevel4Approve:  function() {this.role = "CFO"},
              onLevel4Decline:  function() {this.role = "CFO"},
              onLevel5Approve:  function() {this.role = "COO"},
              onLevel5Decline:  function() {this.role = "COO"},
              onNext:  function() {this.role= "move to next state Automatically";},
              onPartASign:  function() {this.role= "Treasury Board";},
              onPartBacceptTemplate:  function() {this.role = "Vendor"},
              onPartBSign:  function() {this.role = "Vendor"},
              onPartBSignDecline:  function() {this.role = "Vendor"},
              onPreparePartASign:  function() {this.role = "Author"},
              onPreparePartBSign:  function() {this.role= "Author";},
              onTemplatePrepare:  function() {this.role= "Author"; }


            },
            data: {
                role:""
            }
          });

        //   if(this.fsm) {
        //     visualize(this.fsm);
        //   }
          

        this.state = {data:  " ", role: " ", trans: " "};
        this.setState({data: this.fsm.state});
        
        console.log("====================");
        console.log("current state: ", this.state);
        
    }

    onEvent = (e) => {
        console.log("====================");
        console.log("current state: ", this.fsm.state);
        if(e.target.name === 'melt'){
            this.fsm.melt();
        }
        else if(e.target.name === 'contractCorrectionL1') { this.fsm.contractCorrectionL1(); }
        else if(e.target.name === 'contractCorrectionL100') { this.fsm.contractCorrectionL100(); }
        else if(e.target.name === 'contractCorrectionL2') { this.fsm.contractCorrectionL2(); }
        else if(e.target.name === 'contractCorrectionL3') { this.fsm.contractCorrectionL3(); }
        else if(e.target.name === 'contractCorrectionL4') { this.fsm.contractCorrectionL4(); }
        else if(e.target.name === 'contractCorrectionL5') { this.fsm.contractCorrectionL5(); }
        else if(e.target.name === 'contractPrepare') { this.fsm.contractPrepare(); }
        else if(e.target.name === 'finalize') { this.fsm.finalize(); }
        else if(e.target.name === 'level1Approve') { this.fsm.level1Approve(); }
        else if(e.target.name === 'level1Decline') { this.fsm.level1Decline(); }
        else if(e.target.name === 'level2Approve') { this.fsm.level2Approve(); }
        else if(e.target.name === 'level2Decline') { this.fsm.level2Decline(); }
        else if(e.target.name === 'level3Approve') { this.fsm.level3Approve(); }
        else if(e.target.name === 'level3Decline') { this.fsm.level3Decline(); }
        else if(e.target.name === 'level4Approve') { this.fsm.level4Approve(); }
        else if(e.target.name === 'level4Decline') { this.fsm.level4Decline(); }
        else if(e.target.name === 'level5Approve') { this.fsm.level5Approve(); }
        else if(e.target.name === 'level5Decline') { this.fsm.level5Decline(); }
        else if(e.target.name === 'next') { this.fsm.next(); }
        else if(e.target.name === 'partASign') { this.fsm.partASign(); }
        else if(e.target.name === 'partBacceptTemplate') { this.fsm.partBacceptTemplate(); }
        else if(e.target.name === 'partBSign') { this.fsm.partBSign(); }
        else if(e.target.name === 'partBSignDecline') { this.fsm.partBSignDecline(); }
        else if(e.target.name === 'preparePartASign') { this.fsm.preparePartASign(); }
        else if(e.target.name === 'preparePartBSign') { this.fsm.preparePartBSign(); }
        else if(e.target.name === 'templatePrepare') { this.fsm.templatePrepare(); }

        console.log("changed to => ", this.fsm.state);
        // let trans = this.fsm.transitions().map((t) => {return (<div>{t}</div>)});
        let trans = this.fsm.transitions();
        this.setState({data: this.fsm.state});
        this.setState({trans: trans});
        this.setState({role: this.fsm.role});
        console.log("state is: ", this.state);
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

        let possibles;
        if(this.state) {
            if(this.state.trans) {
                possibles = this.state.trans.map((s) => {
                    console.log(this.state.trans);
                    return (
                        <div>
                            <input type="button" value={s} name={s} onClick={(e)=>this.onEvent(e)}></input>
                        </div>
                    )
                })
            }

        }


        if(this.state && this.state.trans){
            return(            
            <div>
                <div style={current}>Current State >>> {this.state.data}  >>>  by role: {this.state.role}</div>
                
                <div style={possi}>
                    =========Possible Action(s):
                    {/* <div style={possi}>{this.state.trans}</div> */}
                    {possibles}
                </div>
                <div>=========All Actions=============================</div>
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
    fontSize: 20,
}

const current = {
    backgroundColor: '#f4e842',
    fontSize: 20,
    margin: 5,
}

