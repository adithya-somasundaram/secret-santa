import React, {Component} from 'react'

class Home extends Component{

    constructor(){
        super();

        this.state = {
            text : {
                recipient: '',
                textmessage: ''
            },
            entry : [],
            users :[],
            numbers : [],
            total : 2
        }        
    }

    componentDidMount() {
        const {text} = this.state
        
        var temp  = [(
            <div>
                <input id= {0} value={text.recipient} onChange={e => this.setState({
                    text: {
                        ...text, recipient: e.target.value
                    }
                })}/>
                <input id= {1} value={text.textmessage} onChange={e => this.setState({
                    text: {
                        ...text, textmessage: e.target.value
                    }
                })}/>
            </div>
        )];
        

        this.setState({
            entry : temp
        })
    }

    sendText = _ => {
        const {text} = this.state

        fetch(`http://localhost:4000/send-text?recipient=${text.recipient}&textmessage=${text.textmessage}`)
        .catch(err => console.log('error: ', err))
    }

    add(){
        const {text} = this.state

        var temp  = [(
            <div>
                <input id= {this.state.total} value={text.recipient} onChange={e => this.setState({
                    text: {
                        ...text, recipient: e.target.value
                    }
                })}/>
                <input id= {this.state.total+1} value={text.textmessage} onChange={e => this.setState({
                    text: {
                        ...text, textmessage: e.target.value
                    }
                })}/>
            </div>
        )];
        
        var x = this.state.entry.concat(temp);

        this.setState((prevState) => ({
            entry : x,
            total : prevState.total + 2
        }))
        console.log(this.state.entry)
    }

    sub(){
        var x = this.state.entry.splice(1)

        this.setState((prevState) => ({
            entry: x,
            total : prevState.total - 2
        }))
    }

    render(){
        if(this.state.entry === []){
            return (<div>rip</div>)
        }
        console.log(this.state.entry)
        return(
            <div>
                {this.state.entry}
                <div>
                    <button onClick={()=>{this.add()}}>+</button>
                    <button onClick={()=>{this.sub()}}>-</button>
                </div>
                <button onClick={this.sendText}>Go!</button>
            </div>
        )
    }
}

export default Home;