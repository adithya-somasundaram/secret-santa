import React, { Component } from 'react'
import { Button, Form, Col, Row, Container, Navbar, Nav } from 'react-bootstrap';
import {border, backgroundC} from './style';

class Home extends Component {

    constructor() {
        super();

        this.state = {
            text: {
                recipient: '',
                textmessage: ''
            },
            entry: [],
            users: [''],
            numbers: [0],
            total: 2
        }
    }

    componentDidMount() {
        const { text } = this.state

        var temp = [(
            <div>
                <Container>
<<<<<<< HEAD
                    <Row>
                        <Col xs="auto">
                            <Form.Control className="mb-2 mr-sm-2" placeholder="Name" id={0} type="text" onChange={e => {
                            console.log(0)
                            this.setUser(e.target.id, e.target.value)
                        }
                        } />
                        </Col>
                        <Col xs="auto">
                            <Form.Control className="mb-2 mr-sm-2" placeholder="Telephone Number" id={1} type="text" onChange={e => {
                            console.log(1)
=======
                    <Row className="justify-content-md-center">
                        <Col>
                            <Form.Control placeholder="Name" id={0} type="text" onChange={e => {
                            // console.log(0)
                            this.setUser(0, e.target.value)
                        }
                        } />
                        </Col>
                        <Col>
                            <Form.Control placeholder="Telephone Number" id={1} type="tel" onChange={e => {
                            // console.log(1)
>>>>>>> 584978011167300b97bebcd718c204fe93355ebb
                            this.setNum(e.target.id - 1, e.target.value)
                        }
                        } />
                        </Col>
                    </Row>
                </Container>
            </div>
        )];


        this.setState({
            entry: temp
        })
    }

    sendText = _ => {
        const { text } = this.state

        fetch(`http://localhost:4000/send-text?recipient=${text.recipient}&textmessage=${text.textmessage}`)
            .catch(err => console.log('error: ', err))
    }

    add() {
        const { text } = this.state

        var temp = [(
            <div>
                <Container>
<<<<<<< HEAD
                    <Row>
                        <Col xs="auto">
                            <Form.Control className="mb-2 mr-sm-2" placeholder="Name" id={this.state.total} type="text" onChange={e => {
                            console.log(e.target.id)
                            this.setUser(e.target.id / 2, e.target.value)
                        }} />
                        </Col>
                        <Col xs="auto">
                            <Form.Control className="mb-2 mr-sm-2" placeholder="Telephone Number" id={this.state.total + 1} type="text" onChange={e => {
                            console.log(e.target.id - 1)
=======
                    <Row className="justify-content-md-center">
                        <Col>
                            <Form.Control placeholder="Name" id={this.state.total} type="text" onChange={e => {
                            // console.log(e.target.id)
                            this.setUser(e.target.id / 2, e.target.value)
                        }} />
                        </Col>
                        <Col>
                            <Form.Control placeholder="Telephone Number" id={this.state.total + 1} type="tel" onChange={e => {
                            // console.log(e.target.id - 1)
>>>>>>> 584978011167300b97bebcd718c204fe93355ebb
                            this.setNum((e.target.id - 1) / 2, e.target.value)
                        }} />
                        </Col>
                    </Row>
                </Container>
            </div>
            
        )];

        var x = this.state.entry.concat(temp);
        var new_users = this.state.users.concat('');
        var new_num = this.state.numbers.concat(0);

        this.setState((prevState) => ({
            entry: x,
            users: new_users,
            numbers: new_num,
            total: prevState.total + 2
        }))
    }

    sub() {
        if (this.state.total > 2) {
            var x = this.state.entry.splice(0, this.state.entry.length - 1);
            var new_users = this.state.users;
            new_users.pop()
            console.log(new_users)
            var new_num = this.state.numbers;
            new_num.pop()

            this.setState((prevState) => ({
                entry: x,
                users: new_users,
                numbers: new_num,
                total: prevState.total - 2
            }))
        }
    }

    setNum(i, val) {
        var temp = this.state.numbers;
        temp[i] = parseInt(val);
        console.log(temp)
        this.setState({
            numbers: temp
        })
    }

    setUser(i, val) {
        var temp = this.state.users;
        temp[i] = val;
        console.log(i, val, temp)
        this.setState({
            users: temp
        })
    }

    render() {
        return (
            <div style={backgroundC}>
                <Container fluid="md">
                <Navbar border="success">
                    <Navbar.Brand href="#">Secret Santa</Navbar.Brand>
                    <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    </Nav>
                </Navbar>
                <div style={border}>
                    {this.state.entry}
                    <div>
                        <Button className="mb-2 mr-sm-2" variant="success" onClick={() => { this.add() }}>+</Button>
                        <Button className="mb-2 mr-sm-2" variant="danger" onClick={() => { this.sub() }}>-</Button>
                    </div>
                    <Button variant="primary" onClick={this.sendText}>Send!</Button>
                </div>
                </Container>
            </div>
            
        )
    }
}

{/* <input id= {this.state.total} value={text.recipient} onChange={e => this.setState({
                    text: {
                        ...text, recipient: e.target.value
                    }
                })}/> */}

export default Home;