import React from 'react';
import { BrowserRouter, HashRouter, Route, Link } from 'react-router-dom';
import GameMatcher from './GameMatcher';

const Games = () => {
    return (
        <BrowserRouter>
            <p><Link to="/game/number-baseball">숫자야구</Link></p>
            <p><Link to="/game/RSP">가위바위보</Link></p>
            <p><Link to="/game/lotto-generator">로또</Link></p>
            <p><Link to="/game/index">게임 매처</Link></p>
            <div>
            <Route path="/game/:name" component={GameMatcher}></Route>
            </div>
        </BrowserRouter>
    );
};

export default Games;