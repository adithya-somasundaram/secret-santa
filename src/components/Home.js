import React, { Component } from 'react'

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
                <input id={0} type="text" onChange={e => {
                    console.log(0)
                    this.setUser(e.target.id, e.target.value)
                }
                } />
                <input id={1} type="text" onChange={e => {
                    console.log(1)
                    this.setNum(e.target.id - 1, e.target.value)
                }
                } />
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
                <input id={this.state.total} type="text" onChange={e => {
                    console.log(e.target.id)
                    this.setUser(e.target.id / 2, e.target.value)
                }} />
                <input id={this.state.total + 1} type="text" onChange={e => {
                    console.log(e.target.id - 1)
                    this.setNum((e.target.id - 1) / 2, e.target.value)
                }} />
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
        console.log(temp)
        this.setState({
            users: temp
        })
    }

    render() {
        return (
            <div>
                {this.state.entry}
                <div>
                    <button onClick={() => { this.add() }}>+</button>
                    <button onClick={() => { this.sub() }}>-</button>
                </div>
                <button onClick={this.sendText}>Go!</button>
                <p> this is a test</p>
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