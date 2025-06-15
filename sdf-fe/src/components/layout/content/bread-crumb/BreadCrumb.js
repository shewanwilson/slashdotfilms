import React from 'react';
import './BreadCrumb.css';


class BreadCrumb extends React.Component{
    render(){
        return (<div className="bread-crumb">{"<" + this.props.previousBoard}</div>)
    }
}
export default BreadCrumb;