import React, {Component} from 'react'

class Home extends Component{

    constructor(){
        super();

        this.state = {
            text : {
                recipient: '',
                textmessage: ''
            }
        }        
    }

    sendText = _ => {
        const {text} = this.state

        fetch(`http://localhost:4000/send-text?recipient=${text.recipient}&textmessage=${text.textmessage}`)
        .catch(err => console.log('error: ', err))
    }

    render(){
        const {text} = this.state

        return(
            <div>
                <input value={text.recipient} onChange={e => this.setState({
                    text: {
                        ...text, recipient: e.target.value
                    }
                })}/>
                <input value={text.textmessage} onChange={e => this.setState({
                    text: {
                        ...text, textmessage: e.target.value
                    }
                })}/>
                <button onClick={this.sendText}>Go!</button>
            </div>
        )
    }
}

export default Home;