import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';

import ResponseCheckClass from './ResponseCheckClass';

const Hot = hot(ResponseCheckClass);

ReactDOM.render(<Hot />, document.querySelector('#root'));