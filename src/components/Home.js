import React, { Component } from 'react'
import { Button, Form, Col, Row, Container } from 'react-bootstrap';

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
        // const { text } = this.state

        // fetch(`http://localhost:4000/send-text?recipient=${text.recipient}&textmessage=${text.textmessage}`)
        //     .catch(err => console.log('error: ', err))
        if(this.state.users.length < 2){
            alert('Need at least 2 participants!')
        } else {
            for(var i = 0; i < this.state.users.length; i++){
                if(this.state.users[i] === "" ^ (this.state.numbers[i] === 0 || this.state.numbers[i] === isNaN)){
                    alert('invalid');
                    return;
                }
            }
        }
        var test = this.state.users.filter(name => name !== "")
        var test2 = this.state.numbers.filter(num => num !== isNaN && num !== 0)
        for(var j = 0; j < this.state.numbers.length; j++){
            var first = this.state.numbers[j].toString().substring(0,1)
            console.log(first)
            // if(first == 1){
            //     console.log("yup")
            // }
        }
        console.log(test, test2)
    }

    add() {
        const { text } = this.state

        var temp = [(
            <div>
                <Container>
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
            <div>
                <Container>
                    {this.state.entry}
                    <div>
                        <Button variant="light" onClick={() => { this.add() }}>+</Button>
                        <Button variant="light" onClick={() => { this.sub() }}>-</Button>
                    </div>
                    <Button variant="primary" onClick={this.sendText}>Go!</Button>
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