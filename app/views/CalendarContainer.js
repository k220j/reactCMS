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

class lenderingSVG  {


    colorMap={
        "redmin":360, "orangemin":18, "yellowmin":49 , "greenmin":120, "skybluemin":210, "bluemin":227 ,"purplemin":281, "magentamin":333,
        "redmax":360, "orangemax":33, "yellowmax":50 , "greenmax":120, "skybluemax":215, "bluemax":236 ,"purplemax":285, "magentamax":336
    };

    colorpower=
        {
            "redmax":85, "orangemax":96, "yellowmax":96 , "greenmax":67, "skybluemax":77, "bluemax":30 ,"purplemax":97, "magentamin":42,
            "redmin":81, "orangemin":79, "yellowmin":93 , "greenmin":41, "skybluemin":70, "bluemin":26 ,"purplemin":43, "magentamax":42
        };

    colorbrightness  ={
        "redmax":92, "orangemax":91, "yellowmax":91 , "greenmax":90, "skybluemax":92, "bluemax":90 ,"purplemax":90, "magentamax":90,
        "redmin":60, "orangemin":61, "yellowmin":66 , "greenmin":58, "skybluemin":70, "bluemin":56 ,"purplemin":57, "magentamin":60

    }

    makeColor (val ,color, minmax ) {   //minmax에는 최대최소를 구분하라. "minmax를 스트링을 줘서 맵에서 바로 뽑아쓰자."
        var colorpercent=parseInt(10 * val);
        console.log(val);
        console.log(color);
        var str;
        var colortype ; //색깔타입
        var power;      //채도 , hsla의 걍 두번째 인자값
        var brightness  // 명도,  hsla의 세번째 인자값


        power= (this.colorpower[color+"max"]  -this.colorpower[color+"min"] ) *  val *10/100+ this.colorpower[color+"min"];
        brightness = (this.colorbrightness[color+"max"]  -this.colorbrightness[color+"min"] ) *  val *10/100+ this.colorbrightness[color+"min"];
        console.log(brightness);
        str= color+minmax;
        console.log(str);
        return"hsla("+(this.colorMap[str])+","+power+ "%, "+brightness+"%"+", 1)";
    }

    checkMinMax(val  , minmax ) {  // start점에서 val을 더하라.  max 는 양수 min은 음수
        if(minmax=="max"){
            return val;
        }else
            return -1*val;
    }
}


class Calendar extends Component {

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
        let paintSVG = new lenderingSVG();


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
                        <circle cx="30" cy="30" r="30" fill={paintSVG.makeColor(2.6, "red" ,"min" )}> </circle>
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
                <div className="col-lg-8">
                    <div className="row">
                        <div className="thisMonth">
                            <span className="prevMonth" onClick={this.prevMonth.bind(this)}> 이전 </span>
                            <span className="prevMonth">  {this.state.year}년 {this.state.month}월 </span>
                            <span className="prevMonth" onClick={this.nextMonth.bind(this)}> 다음</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="thisMonth">
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
                <div className="col-lg-3">
                    <div className="row">
                        <img src={require('../../public/img/mood_result.svg')}/>
                    </div>
                    <div className="row">
                        <textarea  className="ui-autocomplete-input"placeholder="당신의 기분을 메모로 남겨주세요"width="80%" rows="14"cols="13" autocomplete="off" role="textbox" aria-autocomplete="list" aria-haspopup="true"></textarea>
                    </div>
                </div>

            </div>
        )
    }

}

export default Calendar