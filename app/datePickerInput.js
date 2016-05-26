import React,{Component} from 'react'
export default class DatePickerInput extends Component{
    constructor(props){
        super(props)

        this.state={
            inputValue:''
        }
    }
    componentWillReceiveProps(props){
        this.setState({
            inputValue:props.V
        })
    }
    handleChange(e){
        this.setState({
            inputValue:e.target.value
        })
    }
    handleFocus(e){
        this.props.onFocus(e)
    }
    render(){
        return(
            <input type="text" onFocus={this.handleFocus.bind(this)} value={this.state.inputValue} onChange={this.handleChange.bind(this)}/>
        )

    }


}