import React from "react";
import ReactDOM from "react-dom";
import TextField from "./components/TextField";
import TextArea from "./components/TextArea";
import Button from "./components/button";
import {NAME_REGEX, EMAIL_REGEX , 
    NAME, EMAIL, INVALID_NAME, INVALID_EMAIL, FIELD_REQURIED} from './constants/constants';
import {isEmpty} from "./helpers/index";
import { Row, Col } from 'react-bootstrap';
import {SubmitAPI, ClickBack} from "./actions/index";
import { connect, Provider } from "react-redux";
import { default as ReduxThunk } from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducer/index";
import css from './styles/main.css';

class Index extends React.Component {
  constructor(props) {
    super(props);
    /* Bind Method to its class */
    this.TextFieldChange = this.TextFieldChange.bind(this);
    
    /* Form States for input Fields and corresponding error messages */
    this.state={
            Name:'', email:'',  message:'', Nameerror:'', EMailerror:'', msgError:'',
    }
  }



  TextFieldChange(value,type) {
        
        switch(type){
            case NAME: 
            /* Set Name Field using Name Field Value */
            this.setState( { Name:value });

                /* Only If Name Field has value and if the value does not match the regex pattern give the error */
                if(value.length > 0 && !value.match(NAME_REGEX)){
                   this.setState({ Nameerror: INVALID_NAME,});
                }
                /* Else, clear Error */
                else{
                    this.setState({ Nameerror:'',});
                }
                return;
                
            case EMAIL:
            
            /*  Set Email Field  using Email Field Value,  */
            this.setState( { email:value });

            /* Only If Email Field has value and if the value does not match the regex pattern give the error */
                 if(value.length > 0 && !value.match(EMAIL_REGEX)){
                    this.setState({ EMailerror: INVALID_EMAIL, })
                 }
            /* Else, clear Error */
                else{
                    this.setState({ EMailerror:'',})
                 }
            default:
                 return;

        }
  }

  TextAreaChange(Message){

        /* Text Area does not have any restrictions on the type of input chars */
        this.setState({
            message: Message,
            msgError:'',
        })
  }


  display(){

    /* If No success Msg or Error Msg, display Form */
    if(!this.props.success && !this.props.error){
        return (
            <div className="ContactUsHeight">
                    <div className="ContactUsBox">
                        <Row><Col xs={12}><div className="HeadingStyling">Contact Us</div></Col></Row>
                        <Row>
                          <div className="TextFieldStyling">
                              <Col xs={6}>
                                  <TextField onChange={(value,type) => this.TextFieldChange(value,type)} 
                                  type="Name" id="Name" label="Name" maxlength="50" error={this.state.Nameerror}
                                  tabIndex={1} />
                              </Col>
                          </div>
                          <div className="TextFieldStylingRight">
                              <Col xs={6}>
                                  <TextField onChange={(value,type) => this.TextFieldChange(value,type)} 
                                  type="Email" id="Email" label="Email" maxlength="50"  
                                  error={this.state.EMailerror} tabIndex={2}/>
                              </Col> 
                          </div>
                        </Row>
                        <Row>
                          <div className="TextAreaStyling">
                              <TextArea onChange={(value) => this.TextAreaChange(value)}
                              type="Message" id="Message" label="Message" maxlength="500" 
                              error={this.state.msgError} tabIndex={3}/>
                          </div>
                        </Row>
                        <Row>
                            <Col xs={12}><Button name="Submit" className="btn btn-primary buttonAlign" 
                             onClick={() => this.handleClick()} tabIndex={4}/></Col>
                        </Row>
                    </div>
            </div>
          );
    }
    /* If Success, then display User Nam and Succesful Submission Message */
    else if(this.props.success){
        return (
            <div className="ContactUsHeight">
                 <div className="ContactUsBox">
                        <Row><Col xs={12}><div className="HeadingStyling">Dear {this.state.Name}, </div></Col></Row>
                        <Row><Col xs={12}><div className="SuccesfulSubmission">  
                                                    Successful Submission !!  
                                            </div>  
                        </Col></Row>
                        <Row>
                            <Col xs={12}><Button name="Back" className="btn btn-primary buttonAlign" 
                             onClick={() => this.handleBack()} tabIndex={1}/></Col>
                        </Row>
                 </div>
            </div>
        );
    }
    /* If Submission Failed, then display error Message */
    else if(this.props.error){
        return (
            <div className="ContactUsHeight">
                 <div className="ContactUsBox">
                        <Row><Col xs={12}><div className="HeadingStyling">Dear {this.state.Name}, </div></Col></Row>
                        <Row><Col xs={12}><div className="SuccesfulSubmission">  
                                                    Unsuccesfull Submission !!  
                                            </div>  
                        </Col></Row>
                        <Row>
                            <Col xs={12}><Button name="Back" className="btn btn-primary buttonAlign" 
                             onClick={() => this.handleBack()} tabIndex={1} /></Col>
                        </Row>
                 </div>
            </div>
        );
    }
  }

  /* Back Button, carries the user from Succesful/Unsuccesful Page to Form Page 
     Clear State for all corresponding form Fields and Their Errors.  */
  handleBack(){
    this.setState({
        Name:'', email:'',  message:'', Nameerror:'', EMailerror:'', msgError:'',
    });
    this.props.ClickBack();
  }

  /* Handle Submit */
  handleClick(){
        
    /* If any of the Fields are empty, display error messages */
    if(isEmpty(this.state.Name)){
        this.setState({ Nameerror: FIELD_REQURIED });
        return;
    }else if(isEmpty(this.state.email)){
        this.setState({ EMailerror: FIELD_REQURIED});
        return;
    }else if(isEmpty(this.state.message)){
        this.setState({ msgError: FIELD_REQURIED });
        return;
    }

    /* Only if the form is cleared of errors, API will be called, else it will prevent user from calling API */
    if(!this.state.Nameerror && !this.state.EMailerror && !this.state.msgError){
            var formObject = {
                Name: this.state.Name,
                email:this.state.email,
                message:this.state.message,
            }
            console.log(formObject);
            this.props.SubmitAPI(formObject);
        }
        
  }




  render() {
        /* Display Form/Succesful Message/ UnSuccesful Message */
        return(<div>{ this.display() }</div>);
  }
}

/* Map success and Error Field from State to Props, Intially on Form load both are undefined */
function mapStateToProps(state) {
    return {
        success:state.form.success,
        error:state.form.error
    };
  }

/* Connect the COmponent to the Store via the specified actions */
Index = connect(
    mapStateToProps,
    {  SubmitAPI, ClickBack  }
)(Index);


const rootElement = document.getElementById("root");
ReactDOM.render(
    /* Provide the store to the COmponent */
    <Provider store={createStore(rootReducer, {}, applyMiddleware(ReduxThunk))}>    
        <Index />
    </Provider>, rootElement);
