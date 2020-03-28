import React, { useContext, memo } from 'react';
import { TableContext } from './MineSearch';
import Td from './Td';

const Tr = memo(({ verIndex }) => {
    const { tableData } = useContext(TableContext);
    return (
        <tr>
            { 
                tableData[0] && Array(tableData[0].length)
                                .fill()
                                .map((td, i) => {
                                    return <Td verIndex={verIndex} horIndex={i} />;
                                })
            }
        </tr>
    );
});

export default Tr;