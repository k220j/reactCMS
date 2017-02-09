import React, {Component} from 'react';
import './calendar.css';
var DayNames = React.createClass({
    render: function () {
        return <div className="week names">
            <span className="day">Sun</span>
            <span className="day">Mon</span>
            <span className="day">Tue</span>
            <span className="day">Wed</span>
            <span className="day">Thu</span>
            <span className="day">Fri</span>
            <span className="day">Sat</span>
        </div>;
    }
});

class Calendar extends Component {

    // constructor makes today's info
    constructor(props) {
        super(props);
        var m_oMonth = new Date();

        this.state = {
            year: m_oMonth.getFullYear(),
            month: m_oMonth.getMonth() + 1,
            day: m_oMonth.getDate()
        }
        console.log(this.state.month + "초기");
    }

    // if this.state.month is 1 then  year -1 and this month change 12
    prevMonth() {
        let month = this.state.month;
        let year = this.state.year;
        if (month === 1) {
            month = 12;
            year = year - 1;
        }
        else
            month -= 1;
        this.setState({
            year: year,
            month: month
        })
    }

    getState() {
        return this.state;
    }

    nextMonth() {
        let month = this.getState().month;
        let year = this.getState().year;
        if (month === 12) {
            month = 1;
            year += 1;
        }
        else
            month += 1;
        this.setState({
            year: year,
            month: month
        })
    }

    //1일이 시작되는 요일(3) 을 알아내서
    renderingMonth() {
        let i = 0, month, year;
        year = (this.getState().year);
        console.log(year);
        month = ((this.getState().month ));
        let myDate = new Date();
        myDate.setFullYear(year, month - 1, 1);
        let day = myDate.getDay();


        var line = [];
        var week = [];
        var nowDate = 0;
        for (i = 0; i < day; i++) {
            line.push(<td></td>);
        }
        for (i = 1; i <= 7 - day; i++) {
            nowDate = i;
            line.push(<td>
                        <div className="calendar_date">
                            <svg width="60" height="60">
                                <circle cx="30" cy="30" r="30" fill="#ebebeb"></circle>
                                <text x="25" y="35" font-size="18" fill="#c6c6c6">{i}</text>
                            </svg>
                        </div>
                    </td>);
        }
        week.push(<tr>{line}</tr>);


        myDate.setMonth(month);
        myDate.setDate(0);


        var last = myDate.getDate();
        console.log(last);

        line = [];
        var j = 1;
        for (i = nowDate + 1; i <= last; i++) {
            line.push(<td>
                <div className="calendar_date">
                    <svg width="60" height="60">
                        <circle cx="30" cy="30" r="30" fill="#ebebeb"></circle>
                        <text x="23" y="35" font-size="18" fill="#c6c6c6">{i}</text>
                    </svg>
                </div>
            </td>);
            if (j === 7 || i === last) {
                week.push(<tr>{line}</tr>);
                j = 0;
                line = [];
            }
            j++;

        }


        return week;

    }

    makeCalendar(year, month) {
        return (
            <tr>
                <th> sun</th>
                <th> mon</th>
                <th> TUE</th>
                <th> WEN</th>
                <th> TUR</th>
                <th> FRI</th>
                <th> SAT</th>
            </tr>
        )
    }

    render() {
        return (
            <div className="wrapper wrapper-content animated fadeInRight" id="calendar">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="thisMonth">
                            <span className="prevMonth" onClick={this.prevMonth.bind(this)}> 이전 </span>
                            <span className="prevMonth">  {this.state.year}년 {this.state.month}월 </span>
                            <span className="prevMonth" onClick={this.nextMonth.bind(this)}> 다음</span>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="thisMonth">
                            <table className="prevMonth">
                                <tbody>
                                {this.makeCalendar()}{this.renderingMonth()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Calendar