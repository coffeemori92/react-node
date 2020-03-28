import React, { useReducer, createContext, useMemo, useEffect } from 'react';
import Form from './Form';
import Table from './Table';

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0 // 0 이상이면 다 opened
};

export const TableContext = createContext({
    tableData: [],
    dispatch: () => {},
    halted: true
});

const initialState = {
    tableData: [],
    timer: 0,
    result: '',
    halted: true,
    data: {
        ver: 0,
        hor: 0,
        mine: 0
    },
    openedCount: 0
};

export const START_GAME = 'START_GAME';
export const CLICK_MINE = 'CLICK_MINE';
export const OPEN_CELL= 'OPEN_CELL';
export const FLAG_CELL= 'FLAG_CELL';
export const QUESTION_CELL= 'QUESTION_CELL';
export const NORMALIZE_CELL= 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

const plantMine = (ver, hor, mine) => {
    console.log(ver, hor, mine);
    const candidate = Array(ver * hor).fill().map((v, i) => {
        return i;
    });
    const shuffle = [];
    while(candidate.length > ver * hor - mine){
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }
    const data = [];
    for(let i = 0; i < ver; i++){
        const verData = [];
        data.push(verData);
        for(let j = 0; j < hor; j++){
            verData.push(CODE.NORMAL);
        }
    }
    for(let k = 0; k < shuffle.length; k++){
        const vertical = Math.floor(shuffle[k] / hor);
        const horizon = shuffle[k] % hor;
        data[vertical][horizon] = CODE.MINE;
    }

    console.log(data);
    return data;
};

const reducer = (state, action) => {
    switch (action.type) {
        case START_GAME: {
            return {
                ...state,
                tableData: plantMine(action.ver, action.hor, action.mine),
                halted: false,
                data: {
                    ver: action.ver,
                    hor: action.hor,
                    mine: action.mine
                },
                openedCount: 0,
                timer: 0
            };
        }
        case OPEN_CELL: {
            const tableData = [...state.tableData];
            tableData.forEach((ver, i) => {
              tableData[i] = [...ver];
            });
            const checked = [];
            let openedCount = 0;
            console.log(tableData.length, tableData[0].length);
            const checkAround = (ver, hor) => {
              console.log(ver, hor);
              if (ver < 0 || ver >= tableData.length || hor < 0 || hor >= tableData[0].length) {
                return;
              } // 상하좌우 없는칸은 안 열기
              if ([CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[ver][hor])) {
                return;
              } // 닫힌 칸만 열기
              if (checked.includes(ver + '/' + hor)) {
                return;
              } else {
                checked.push(ver + '/' +hor);
              } // 한 번 연칸은 무시하기
              let around = [
                tableData[ver][hor - 1], tableData[ver][hor + 1],
              ];
              if (tableData[ver - 1]) {
                around = around.concat([tableData[ver - hor - 1], tableData[ver - 1][hor], tableData[ver - 1][hor + 1]]);
              }
              if (tableData[ver + 1]) {
                around = around.concat([tableData[ver + 1][hor - 1], tableData[ver + 1][hor], tableData[ver + 1][hor + 1]]);
              }
              const count = around.filter(function (v) {
                return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
              }).length;
              if (count === 0) { // 주변칸 오픈
                if (ver > -1) {
                  const near = [];
                  if (ver - 1 > -1) {
                    near.push([ver -1, hor - 1]);
                    near.push([ver -1, hor]);
                    near.push([ver -1, hor + 1]);
                  }
                  near.push([ver, hor - 1]);
                  near.push([ver, hor + 1]);
                  if (ver + 1 < tableData.length) {
                    near.push([ver + 1, hor - 1]);
                    near.push([ver + 1, hor]);
                    near.push([ver + 1, hor + 1]);
                  }
                  near.forEach((n) => {
                    if (tableData[n[0]][n[1]] !== CODE.OPENED) {
                      checkAround(n[0], n[1]);
                    }
                  })
                }
              }
              if (tableData[ver][hor] === CODE.NORMAL) { // 내 칸이 닫힌 칸이면 카운트 증가
                openedCount += 1;
              }
              tableData[ver][hor] = count;
            };
            checkAround(action.ver, action.hor);
            let halted = false;
            let result = '';
            const { data, timer } = state;
            console.log(data.ver * data.hor - data.mine, state.openedCount, openedCount);
            if (data.ver * data.hor - data.mine === state.openedCount + openedCount) { // 승리
              halted = true;
              result = `${timer}초만에 승리하셨습니다`;
            }
            return {
              ...state,
              tableData,
              openedCount: state.openedCount + openedCount,
              halted,
              result,
            };
          }
        case CLICK_MINE: {
            const tableData = [...state.tableData];
            tableData[action.ver] = [...state.tableData[action.ver]];
            tableData[action.ver][action.hor] = CODE.CLICKED_MINE;
            return {
                ...state,
                tableData,
                halted: true
            };
        }
        case FLAG_CELL: {
            const tableData = [...state.tableData];
            tableData[action.ver] = [...state.tableData[action.ver]];
            if(tableData[action.ver][action.hor] === CODE.MINE){
                tableData[action.ver][action.hor] = CODE.FLAG_MINE;
            }else{
                tableData[action.ver][action.hor] = CODE.FLAG;
            }
            return {
                ...state,
                tableData
            };
        }
        case QUESTION_CELL: {
            const tableData = [...state.tableData];
            tableData[action.ver] = [...state.tableData[action.ver]];
            if(tableData[action.ver][action.hor] === CODE.FLAG_MINE){
                tableData[action.ver][action.hor] = CODE.QUESTION_MINE;
            }else{
                tableData[action.ver][action.hor] = CODE.QUESTION;
            }
            return {
                ...state,
                tableData
            };
        }
        case NORMALIZE_CELL: {
            const tableData = [...state.tableData];
            tableData[action.ver] = [...state.tableData[action.ver]];
            if(tableData[action.ver][action.hor] === CODE.QUESTION_MINE){
                tableData[action.ver][action.hor] = CODE.MINE;
            }else{
                tableData[action.ver][action.hor] = CODE.NORMAL;
            }
            return {
                ...state,
                tableData
            };
        }
        case INCREMENT_TIMER: {
            return {
                ...state,
                timer: state.timer + 1
            }
        }
        default:
            return state;
    }
};

const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { timer, result, tableData, halted } = state;
    const value = useMemo(() => ({
        tableData,
        dispatch,
        halted
    }), [tableData, halted]);

    useEffect(() => {
        let timer;
        if(halted === false){
            timer = setInterval(() => {
                dispatch({ type: INCREMENT_TIMER });
            }, 1000);
        }
        return () => {
            clearInterval(timer);
        };
    },[halted]);

    return (
        <TableContext.Provider value={value}>
            <Form />
            <p>{timer}</p>
            <Table />
            <p>{result}</p>
        </TableContext.Provider>
    );
};

export default MineSearch;