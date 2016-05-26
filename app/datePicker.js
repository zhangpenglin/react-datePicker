/**
 * Created by gx on 2016/5/23.
 */
import './datePicker.scss'
import React, {Component} from 'react'
import * as Immutable from 'immutable'
import DatePickerInput from './datePickerInput'
class DatePickerClass {
    constructor(year, month) {
        let thisDate = new Date()
        this.year = year || thisDate.getFullYear()
        this.month = month || thisDate.getMonth() + 1
        this.days = []
        this.getDays()
    }

    //获取某年某月展示在ui上的日期 一共42天
    getDays() {
        const ONEDAY = 86400000
        let date = new Date()
        date.setFullYear(this.year, this.month - 1, 1)
        console.log('full year' + date.toDateString())
        let day1 = date.getTime()
        console.log('get time' + day1)
        let prevDayCount = 1
        let thisDayCount = 0
        //获取上一个月的天数
        while (true) {
            date.setTime(day1 - prevDayCount * ONEDAY)
            let d = date.getDay()
            var newDate = new Date(date.getTime())
            this.days.unshift(newDate)
            console.log(newDate)
            if (d == 0 && prevDayCount != 1) {
                break
            }
            prevDayCount++
        }
        console.log(prevDayCount)
        //获取当月及下一月
        while (42 - prevDayCount - thisDayCount) {
            date.setTime(day1 + thisDayCount * ONEDAY)
            var newDate = new Date(date.getTime())
            this.days.push(newDate)
            console.log(newDate)
            thisDayCount++
        }
        this.chunk()
        console.log(this.days)
    }

    next() {
        if (this.month == 12) {
            return new DatePickerClass(this.year + 1, 1)
        } else {
            return new DatePickerClass(this.year, this.month + 1)
        }
    }

    prev() {
        if (this.month == 1) {
            return new DatePickerClass(this.year - 1, 12)
        } else {
            return new DatePickerClass(this.year, this.month - 1)
        }
    }

    chunk() {
        let chunked = [[], [], [], [], [], []]
        let chunkIndex = 0
        this.days.forEach((x, i, c)=> {
            if ((i % 7 == 0 || i == c.length) && i != 0) {
                chunkIndex++
            }
            chunked[chunkIndex].push(x)

        })
        this.days = chunked
    }

}



export default class DatePicker extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dp: new DatePickerClass(),
            selectedDay: Immutable.fromJS([]),
            show: false
        }

    }

    getDayClass(n) {
        const d = n.getDay()
        if (!this.props.oneDay) {
            //端点样式
            let sd = this.state.selectedDay
            if (sd.indexOf(n) > -1) {
                return 'startOrEnd'
            }
            if (sd.size == 2 && n.getTime() < sd.get(1) && n.getTime() > sd.get(0)) {
                return 'inArea'
            }
        }
        if (this.props.oneDay && this.state.selectedDay.get(0) == n) {
            return 'selected'
        }
        if (n.getMonth() + 1 == this.state.dp.month) {
            if (d == 0 || d == 6) {
                return "weekEnd"
            } else {
                return 'currentMonth'
            }
        } else {
            return 'notCurrentMonth'
        }
    }

    handlePrev() {
        this.setState({
            dp: this.state.dp.prev()
        })
    }

    handleNext() {
        this.setState({
            dp: this.state.dp.next()
        })
    }

    handleFocus() {
        this.setState({
            show: true
        })
    }

    handleSelectedDay(n, e) {
        let sd = this.state.selectedDay
        if (this.props.oneDay) {
            //只选一天
            this.setState({
                selectedDay: Immutable.fromJS([n])
            })
        } else {
            //选择时间段
            if (sd.includes(n)) {
                return
            }
            if (sd.size == 2) {
                sd = sd.shift()
            }
            let a = sd.push(n).sort((x, y)=> {
                return x.getTime() - y.getTime()
            })
            this.setState({
                selectedDay: a
            })
        }

    }

    handleConfirm() {
        this.setState({
            show: false
        })
        this.props.onSelected(this.state.selectedDay)
    }

    handleCancel() {
        this.setState({
            selectedDay: Immutable.fromJS([]),
            show:false
        })
    }

    setInputValue() {
        let sd = this.state.selectedDay
        if (sd.size == 0) {
            return ''
        }
        if (this.props.oneDay) {
            //只选一天
            return sd.get(0).toLocaleDateString()
        } else {
            //选择时间段
            if(sd.size==1)return ""
            return sd.get(0).toLocaleDateString()+" - "+ sd.get(1).toLocaleDateString()
        }
    }


    render() {
        const dp = this.state.dp
        return (<div>
                <div className="date">
                    <DatePickerInput type="text" onFocus={this.handleFocus.bind(this)}
                           V={this.setInputValue()}/>
                </div>

                <div className={"container "+(this.state.show?'show':'hide')}>

                    <div className="header">
                        <div className="triangle-left" onClick={this.handlePrev.bind(this)}></div>
                        <div className="triangle-right" onClick={this.handleNext.bind(this)}></div>
                        {dp.year + '年' + dp.month + "月"}
                    </div>
                    <table>
                        <thead>
                        <tr>
                            <td className="weekEnd">日</td>
                            <td>一</td>
                            <td>二</td>
                            <td>三</td>
                            <td>四</td>
                            <td>五</td>
                            <td className="weekEnd">六</td>
                        </tr>
                        </thead>
                        <tbody>
                        {dp.days.map((x)=> {
                            return (
                                <tr>
                                    {x.map((n)=> {
                                        return <td className={this.getDayClass(n)}
                                                   onClick={this.handleSelectedDay.bind(this,n)}>{n.getDate()}</td>
                                    })}
                                </tr>
                            )
                        })}
                        </tbody>

                    </table>
                    <div className="footer">
                        <button onClick={this.handleConfirm.bind(this)}>确定</button>
                        <button onClick={this.handleCancel.bind(this)}>取消</button>
                    </div>
                </div>
            </div>
        )
    }
}
DatePicker.propTypes = {
    onSelected: React.PropTypes.func.isRequired
}