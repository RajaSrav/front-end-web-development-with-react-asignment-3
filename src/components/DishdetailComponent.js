import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle, BreadcrumbItem, Breadcrumb, Button, Row, Col, Modal, ModalBody, ModalHeader, Label} from 'reactstrap';
import {Link} from 'react-router-dom'
import {LocalForm, Control, Errors} from 'react-redux-form'

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

export class CommentForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({ isModalOpen: !this.state.isModalOpen });
    }

    handleSubmit(values){
        console.log("Curruent state is: "+ JSON.stringify(values));
        alert("Curruent state is: "+ JSON.stringify(values));
    }

    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"> Submit comment</span>
                </Button>

                <div className="row row-content">
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <div className="m-3">
                        <ModalHeader toggle={this.toggleModal}><strong>Submit Comment</strong></ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label htmlFor=".rating" >Rating</Label>
                                    <Control.select model=".rating" name="rating"
                                        className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                    </Control.select>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="name">Your Name</Label>
                                    <Control.text model=".name" id="name" name="name" placeholder="Your Name"
                                    className="form-control"
                                    validators ={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: "Required",
                                            minLength: "Must be greater than 2 numbers",
                                            maxLength: "Must be 15 numbers or less"
                                        }}
                                    />
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="message">Comment</Label>
                                    <Control.textarea model=".message"  id="message" name="message" rows="6"
                                        className="form-control"/>
                                </Row>
                                <Row className="form-group">
                                    <Button type="submit" color="primary">Send Feedback</Button>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                        </div>

                    </Modal>
                </div>
            </div>
        );
    }
}


    function RenderDish({dish}) {
        if (dish != null) {
            return (
                <div className='col-12 col-md-5 m-1'>
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        }
        else {
            return (<div></div>)
        }
    }

    function RenderComments({comments}){
        if (comments != null){
            const comms = comments.map((com  ) => {
                const date = new Intl.DateTimeFormat('en-US', {
                    year:'numeric',
                    month: 'short',
                    day: '2-digit'
                }).format(new Date(Date.parse(com.date)))

                return (
                    <ul key={com.id} className="list-unstyled">
                        <li className="comment">{com.comment}</li>
                        <li className="author">-- {com.author}, {date}</li>
                    </ul>
                );
            })

            return (
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <div>{comms}</div>
                    <CommentForm  />
                </div>

            );
        }
        else {
            return(
                <div></div>
            )
        }
    }



    const DishDetail = (props) => {
        const dish = props.dish
        if (dish == null) {
            return (<div></div>)
        }

        return (
                <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">

                        <RenderDish dish={props.dish} />

                        <RenderComments comments={props.comments} />
                </div>
                </div>
            );
    }

export default DishDetail
