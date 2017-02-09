import React, { Component } from 'react';
import '../../public/styles/notice.css'

class Minor extends Component {


    render() {
        return (
            <div className="wrapper wrapper-content animated fadeInRight">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="text-center m-t-lg">
                            <h1>
                                담벼락 페이지
                            </h1>
                            <small>
                                페이지 생성 연습
                            </small>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="text-center m-t-lg">
                            <canvas id="my_canvas"height="840" width="1400"></canvas>
                        </div>

                    </div>

                </div>
            </div>
        )
    }

}

export default Minor