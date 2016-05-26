import React, {Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './action/index'
import DatePicker from './datePicker'
class App extends Component {

    constructor(props) {
        super(props)

    }

    handleSelected(date){
        console.log('selected date is:'+date)
    }
    render() {

        return (
            <div>
                <div style={{height:'100px',width:'100px'}}></div>
                <DatePicker onSelected={this.handleSelected.bind(this)} oneDay={false}></DatePicker>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        head: state.sort.get('head'),
        body: state.sort.get('body')
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)



