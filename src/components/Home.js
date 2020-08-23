import React, { Component } from 'react'
import { Button, Form, Col, Row, Container, Navbar, Nav } from 'react-bootstrap';
import { border, backgroundC } from './style';

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
            total: 2,
            title: 'Secret Santa!',
            title_style : {
                fontFamily : 'Comic Sans MS',
                paddingLeft : '20vh',
                fontSize : '50px',
                color : 'white'
            }
        }
    }

    componentDidMount() {
        const { text } = this.state

        var temp = [(
            <div>
                <Container>
                    <Row>
                        <Col xs="auto">
                            <Form.Control className="mb-2 mr-sm-2" placeholder="Name" id={0} type="text" onChange={e => {
                                // console.log(0)
                                this.setUser(0, e.target.value)
                            }
                            } />
                        </Col>
                        <Col xs="auto">
                            <Form.Control className="mb-2 mr-sm-2" placeholder="Telephone Number" id={1} type="tel" onChange={e => {
                                // console.log(1)
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

    logic = _ => {
        for (var i = 0; i < this.state.users.length; i++) {
            if (this.state.users[i] === "" ^ (this.state.numbers[i] === 0 || this.state.numbers[i] === isNaN)) {
                alert('invalid');
                return;
            }
        }

        var names = this.state.users.filter(name => name !== "")
        var nums = this.state.numbers.filter(num => num !== isNaN && num !== 0)
        for (var j = 0; j < nums.length; j++) {
            var first = nums[j].toString().substring(0, 1)
            if (first === "1") {
                var temp = nums[j].toString().substring(1, nums[j].toString().length)
                nums[j] = parseInt(temp)
            }
        }

        if (names.length < 2) {
            alert('Need at least 2 participants!')
            return
        }

        var combined = []
        var temp;

        for (var a = 0; a < names.length; a++) {
            temp = [names[a], nums[a]]
            combined.push(temp)
        }

        console.log(combined, combined.length)

        var comb_len = combined.length
        var shuffled = []
        var location;

        for (var b = 0; b < comb_len; b++) {
            location = Math.floor(Math.random() * (comb_len - b))
            shuffled[b] = combined[location]
            combined.splice(location, 1)
            console.log(location, combined)
        }

        console.log(shuffled)
        this.setState({
            title : 'Please wait...'
        })
        for (var c = 0; c < shuffled.length; c++) {
            // setTimeout(this.sendMsg(shuffled[c][0], shuffled[c][1], shuffled[(c+1)%shuffled.length][0]), 5000*c)
            setTimeout((shuffled, c) => {
                console.log(shuffled, c)
                this.sendMsg(shuffled[c][0], shuffled[c][1], shuffled[(c + 1) % shuffled.length][0])
            }, 5000 * c, shuffled, c)
        }

        setTimeout(() => {window.location.reload(false)}, shuffled.length * 5000);
    }

    sendMsg(recipName, recipNum, assignment) {
        var message = "Hello " + recipName + "!\nYour assignment for Secret Santa is " + assignment;
        console.log('here', message, recipName, recipNum, assignment)
        fetch(`http://localhost:4000/send-text?recipient=${recipNum}&textmessage=${message}`)
            .catch(err => console.log('error: ', err))
    }

    add() {
        const { text } = this.state

        var temp = [(
            <div>
                <Container>
                    <Row>
                        <Col xs="auto">
                            <Form.Control className="mb-2 mr-sm-2" placeholder="Name" id={this.state.total} type="text" onChange={e => {
                                console.log(e.target.id)
                                this.setUser(e.target.id / 2, e.target.value)
                            }} />
                        </Col>
                        <Col xs="auto">
                            <Form.Control className="mb-2 mr-sm-2" placeholder="Telephone Number" id={this.state.total + 1} type="tel" onChange={e => {
                                console.log(e.target.id - 1)
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
                <link href='https://fonts.googleapis.com/css?family=Mountains of Christmas'></link>
                <Container fluid="md">
                    <Navbar border="success">
                    <h2 style={this.state.title_style}>{this.state.title}</h2>
                        {/* <Navbar.Brand href="#">Secret Santa</Navbar.Brand>
                        <Nav className="mr-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                        </Nav> */}
                    </Navbar>
                    <div style={border}>
                        {this.state.entry}
                        <div>
                            <Button className="mb-2 mr-sm-2" variant="success" onClick={() => { this.add() }}>+</Button>
                            <Button className="mb-2 mr-sm-2" variant="danger" onClick={() => { this.sub() }}>-</Button>
                        </div>
                        <Button variant="primary" onClick={this.logic}>Go!</Button>
                    </div>
                </Container>
            </div>
        )
    }
}

export default Home;