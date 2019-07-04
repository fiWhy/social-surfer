import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Wrapper from './components/wrapper';
import Slider from './components/slider';
import Menu from './components/menu';
import store from './store';

import rivia from '../assets/images/rivia.jpg';
import menu from './components/menu/mock';

class App extends React.Component {
    render() {
        return <Provider store={store}>
            <Wrapper>
                {/* <Slider /> */}
                {<Menu background={rivia}
                    menu={menu}
                    contentHeader={'<h4>Geralt of</h4><h2>Rivia</h2>'}
                    contentBody={'<p>School of the Wolf</p>'}
                    contentFooter={'<h2>Witcher</h2>'} />}
            </Wrapper>
        </Provider>
    }
}

render(<App></App>, document.getElementById('app'));