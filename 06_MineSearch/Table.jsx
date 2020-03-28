import React, { useContext, memo } from 'react';
import { TableContext } from './MineSearch';
import Tr from './Tr';

const Table = memo(() => {
    const { tableData } = useContext(TableContext);
    return (
        <table>
            <tbody>
                {
                    Array(tableData.length)
                        .fill()
                        .map((tr, i) => {
                        return <Tr verIndex={i} key={i} />;
                        }) 
                }
            </tbody>
        </table>
    );
});

export default Table;