import React, { useState, useCallback, useContext, memo } from 'react';
import { TableContext, START_GAME } from './MineSearch';

const Form = memo(() => {
    const [ver,  setVer] = useState(10);
    const [hor,  setHor] = useState(10);
    const [mine, setMine] = useState(10);
    const { dispatch } = useContext(TableContext);

    const onChangeVer = useCallback(e => {
        setVer(e.target.value);
    }, []);

    const onChangeHor = useCallback(e => {
        setHor(e.target.value);
    }, []);

    const onChangeMine = useCallback(e => {
        setMine(e.target.value);
    }, []);

    const onClickBtn = useCallback(() => {
        dispatch({ type: START_GAME, ver, hor, mine});
    }, [ver, hor, mine]);

    return (
        <>
            <input type="number" placeholder="가로" value={hor} onChange={onChangeHor} />
            <input type="number" placeholder="세로" value={ver} onChange={onChangeVer} />
            <input type="number" placeholder="지뢰" value={mine} onChange={onChangeMine} />
            <button onClick={onClickBtn}>시작</button>
        </>
    );

});

export default Form;