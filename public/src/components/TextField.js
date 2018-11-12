import React from "react";
import ReactDOM from "react-dom";
import { Row, Col } from 'react-bootstrap';


class TextField extends React.Component{

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            value:''
        };
    }


    handleChange(event){
        this.setState({
            value : event.target.value,
        })
        this.props.onChange(event.target.value,this.props.type);
    }   


    render(){

        return(
                <div>
                    <Col xs={12}>
                        <label for={this.props.id}>{this.props.label}</label>
                    </Col>
                    <Col xs={12}>
                        <input aria-label={this.props.label}  id={this.props.id} type="text" onChange={(event) => this.handleChange(event)} 
                        value={this.state.value} maxlength={this.props.maxlength}
                        tabIndex={this.props.tabIndex}/>  
                    </Col>
                    <Col xs={12} className="redColor">
                        <span>{this.props.error}</span>
                    </Col>
                </div>
        );
    }

}

export default TextField;
