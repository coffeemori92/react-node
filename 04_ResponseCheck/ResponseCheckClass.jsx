import React, { Component } from 'react';

class ResponseCheck extends Component {
    state = {
        state: 'waiting',
        message: '클릭해서 시작하세요',
        result: []
    };

    timeout;
    startTime;
    endTime;

    onClickScreen = (e) => {
        const {state, message, result } = this.state;
        if(state === 'waiting'){
            this.setState({
                state: 'ready',
                message: '초록색이 되면 클릭하세요.'
            });
            this.timeout = setTimeout(() => {
                this.setState({
                    state: 'now',
                    message: '지금 클릭'
                });
                this.startTime = new Date();
            }, Math.floor(Math.random() * 1000) + 2000);
        }else if(state === 'ready'){
            clearTimeout(this.timeout);
            this.setState({
                state: 'waiting',
                message: '너무 성급하셨습니다.'
            });
        }else if(state === 'now'){
            this.endTime = new Date();
            this.setState((prevState) => {
                return {
                    state: 'waiting',
                    result: [...prevState.result, this.endTime - this.startTime],
                    message: '클릭해서 시작하세요'
                };
            });
        }
    };

    render(){
        return (
            <>
                <div id="screen" className={this.state.state} onClick={this.onClickScreen}>
                    {this.state.message}
                </div>
                {
                    this.state.result.length === 0 
                        ? null 
                        : <div>평균 시간: {this.state.result.reduce((a, c) => a + c) / this.state.result.length}ms</div>
                }

            </>
        );
    }
}

export default ResponseCheck;