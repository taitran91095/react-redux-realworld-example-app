import {Link} from 'react-router-dom';
import React from 'react';
import agent from '../agent';
import {connect} from 'react-redux';
import {MY_ACTION} from '../constants/actionTypes'

const mapStateToProps = state =>{
    return {a:state.myreducer.mykey}
};

const mapDispatchToProps = dispatch =>({
    myAction: value =>
    dispatch({type:MY_ACTION,key:'mySection',value})
});

class MySection extends React.Component{
    constructor(){
        super();
        //set inner text for action
        this.myAction = event => this.props.myAction(event.target.innerText);
        }
    
    componentWillReceiveProps(props){
        console.log(props);
    }
    render(){
        var value = this.props.a;
        return(
            <div>
                <h1 onClick={this.myAction}>This is my page</h1>
                <h2 attr={this.props.a}>{value}</h2>
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MySection);