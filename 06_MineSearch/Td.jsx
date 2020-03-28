import React, { useContext, useCallback, memo, useMemo } from 'react';
import { TableContext, CODE, OPEN_CELL, CLICK_MINE, NORMALIZE_CELL, QUESTION_CELL, FLAG_CELL } from './MineSearch';

const getTdStyle = code => {
    switch(code){
        case CODE.NORMAL:
        case CODE.MINE:
            return {
                background: '#444'
            };
        case CODE.OPENED:
            return {
                background: 'white'
            };
        case CODE.FLAG_MINE:
        case CODE.FLAG:
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return {
                background: 'yellow'
            };
        default: 
            return {
                background: 'white'
            };
    }
};  

const getTdText = code => {
    switch(code){
        case CODE.NORMAL:
            return '';
        case CODE.MINE:
            return 'X';
        case CODE.CLICKED_MINE:
            return '💥';
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return '🚩';
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return '❓';
        default:
            return code || '';
    }
};

const Td = memo(({ verIndex, horIndex }) => {
    const { tableData, dispatch, halted } = useContext(TableContext);
    
    const onClickTd = useCallback(() => {
        if(halted){
            return;
        }
        switch (tableData[verIndex][horIndex]){
            case CODE.OPENED:
            case CODE.FLAG_MINE:
            case CODE.FLAG:
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
            case CODE.NORMAL:
                dispatch({ type: OPEN_CELL, ver: verIndex, hor: horIndex });
                return;
            case CODE.MINE:
                dispatch({ type: CLICK_MINE, ver: verIndex, hor: horIndex });
                return;
            default:
                return;
        }
    }, [tableData[verIndex][horIndex], halted]);

    const onRightClickTd = useCallback(e => {
        e.preventDefault();
        if(halted){
            return;
        }
        switch(tableData[verIndex][horIndex]){
            case CODE.NORMAL:
            case CODE.MINE:
                dispatch({ type: FLAG_CELL, ver: verIndex, hor: horIndex });
                return;
            case CODE.FLAG_MINE:
            case CODE.FLAG:
                dispatch({ type: QUESTION_CELL, ver: verIndex, hor: horIndex });
                return;
            case CODE.QUESTION:
                dispatch({ type: NORMALIZE_CELL, ver: verIndex, hor: horIndex });
                return;
            case CODE.QUESTION_MINE:
            default:
                return;
        }
    }, [tableData[verIndex][horIndex], halted]);

    return useMemo(() => {
        <td 
            style={getTdStyle(tableData[verIndex][horIndex])}
            onClick={onClickTd}
            onContextMenu={onRightClickTd}
        >
            { getTdText(tableData[verIndex][horIndex]) }
        </td>
    }, [tableData[verIndex][horIndex]]);
});

export default Td;