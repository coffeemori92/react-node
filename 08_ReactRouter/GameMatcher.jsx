import React, { Component } from 'react';
import NumberBaseball from '../03_Baseball/NumberBaseball';
import RSP from '../05_RSP/RSP';
import Lotto from '../04_ResponseCheck/ResponseCheckClass';

class GameMatcher extends Component {
    render(){
        console.log(this.props);
        return (
            <>
                <NumberBaseball />
                <RSP />
                <Lotto />
            </>
        );
    }
}

export default GameMatcher;
