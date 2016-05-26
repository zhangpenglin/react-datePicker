import './table.scss'
import React,{Component} from 'react'


class Sort extends Component{

    constructor(props){
        super(props)
    }

    render(){

        return (
            <div>
                <div className="triangle" onClick={this.props.ascSort}></div>
                <div className="triangle_transform"  onClick={this.props.descSort}></div>
            </div>
        )
    }
}


export default class Table extends Component{

    constructor(props){
        super(props)
        this.state={
            fixed:false
        }
    }

    componentDidMount(){

        window.addEventListener('scroll', this.handleScroll.bind(this));
    }
    handleScroll(event){
        let scrollTop = event.srcElement.body.scrollTop
        console.log("scrollTop:"+scrollTop)
        let head=this.refs["head"]
        let mockhead=this.refs["mockhead"]
        let table=this.refs["table"]
        console.log(table.offsetTop)
        console.log(table.offsetHeight)
        if(scrollTop>=table.offsetTop&&scrollTop<table.offsetTop+table.offsetHeight){
            this.setState({fixed:true})
        }else{
            this.setState({fixed:false})
        }
    }
    ascSort(index){
        this.props.actions.ascSort(index)
    }
    descSort(index){
        this.props.actions.descSort(index)
    }

    render(){
        const {head,body}=this.props
        return(
            <table border="none" ref="table">
                {this.mockhead()}
                {this.head()}
                <tbody>
                {body.map((n)=>{
                    return <tr>
                        {n.map((m)=>{
                            return <td>{m}</td>
                        })}
                    </tr>
                })}
                </tbody>
            </table>
        )
    }

    mockhead(){
        return(
        <thead ref="mockhead" style={this.state.fixed?{display:'table-header-group'}:{display:'none'}}>
        {this.headItem()}

        </thead>

        )
    }
    head(){
        return(
            <thead ref="head" style={this.state.fixed?{position:'fixed',top:"0px"}:{position:"static"}}>
           {this.headItem()}
        </thead>)
    }
    headItem(){
        const {head,body}=this.props

        return(
            <tr>
                {head.map((n,k)=>{
                    return(
                        <th>
                            {n.get('title')}
                            {n.get("sort")&&<Sort ascSort={this.ascSort.bind(this,k)} descSort={this.descSort.bind(this,k)}></Sort>}
                        </th>)
                })}
            </tr>
        )
    }
}