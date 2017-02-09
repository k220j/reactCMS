import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link, Location } from 'react-router';

class Navigation extends Component {

    componentDidMount() {
        const { menu } = this.refs;
        $(menu).metisMenu();
    }

    // 조만간 공부할 예정
    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
    }

    secondLevelActive(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
    }

    render() {
        return (
            <nav className="navbar-default navbar-static-side" role="navigation">
                    <ul className="nav metismenu" id="side-menu" ref="menu">
                        <li className={this.activeRoute("/main")}>
                            <Link to="/main"><i className="fa fa-th-large"></i> <span className="nav-label">Main</span></Link>
                        </li>
                        <li className={this.activeRoute("/minor")}>
                            <Link to="/minor"><i className="fa fa-th-large"></i> <span className="nav-label">Test</span></Link>
                        </li>
                        <li className={this.activeRoute("/calander")}>
                            <Link to="/calendar"><i className="fa fa-th-large"></i> <span className="nav-label">Calander</span></Link>
                        </li>
                        <li>
                            <Link to="/notice"><i className="fa fa-th-large"></i><span className="nav-label">담벼락</span></Link>
                        </li>
                        <li>
                            <a href="http://server.kooru.space:9091"><i className="fa fa-th-large"></i> <span className="nav-label">Transmission</span></a>
                        </li>
                        <li>
                            <a href="http://server.kooru.space:8090"><i className="fa fa-th-large"></i> <span className="nav-label">Confluence</span></a>
                        </li>
                        <li>
                            <a href="http://kooru.net"><i className="fa fa-th-large"></i> <span className="nav-label">Blog</span></a>
                        </li>
                    </ul>


            </nav>
        )
    }
}

export default Navigation