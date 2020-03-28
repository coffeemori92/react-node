import React, { Component } from 'react';

// 클래스의 경우
// constructor -> render -> ref -> componentDidMonunt
// -> (setState/props 바뀔 때) -> shouldComponentUpdate -> render -> componentDidUpdate
//

const rspCoords = {
    r: '0',
    s: '-142px',
    p: '-284px'
};

const scores = {
    r: '0',
    s: '1',
    p: '-1'
};

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(v => {
        return v[1] === imgCoord;
    })[0];
};

class RSP extends Component {
    state = {
        result: '',
        score: 0,
        imgCoord: '0'
    };

    interval;

    changeHand = () => {
        const { imgCoord } = this.state;
        console.log(imgCoord, rspCoords.r);
        if(imgCoord === rspCoords.r){
            this.setState({
                imgCoord: rspCoords.s
            });
        }else if(imgCoord === rspCoords.s){
            this.setState({
                imgCoord: rspCoords.p
            });
        }else if(imgCoord === rspCoords.p){
            this.setState({
                imgCoord: rspCoords.r
            });
        }
    }

    componentDidMount(){ // 컴포넌트가 첫 랜더링 된 후
        // 주로 비동기 요청을 많이한다.
        this.interval = setInterval(this.changeHand, 500);
    }

    componentWillUnmount(){ // 컴포넌트가 제거되기 직전
        // 비동기 요청 정리를 많이한다.
        clearInterval(this.interval);
    }

    onClickBtn = (choice) => () => {
        const { imgCoord } = this.state;
        clearInterval(this.interval);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if(diff === 0){
            this.setState({
                result: '비겼습니다.'
            });
        }else if([-1, 2].includes(diff)){
            this.setState((prevState) => {
                return {
                    result: '이겼습니다.',
                    score: prevState.score + 1
                };
            });
        }else {
            this.setState((prevState) => {
                return {
                    result: '졌습니다.',
                    score: prevState.score - 1
                };
            });
        }
        setTimeout(() => {
            this.interval = setInterval(this.changeHand, 500);
        }, 2000);
        
    };

    render(){
        const { result, score, imgCoord } = this.state;
        return (
            <>
            <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
            <div>
                <button id="rock" className="btn" onClick={this.onClickBtn('r')}>바위</button>
                <button id="scissor" className="btn" onClick={this.onClickBtn('s')}>가위</button>
                <button id="paper" className="btn" onClick={this.onClickBtn('p')}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
            </>
        );
    }
}

export default RSP;