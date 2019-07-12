import React from 'react';
import classnames from 'classnames';
import './styles.scss';
import { Item } from './components/item';
import { throttle } from 'lodash'

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.angle = 0;
        this.interval = null;
        this.borderSize = 1;
        this.radius = 150;
        this.state = {
            t: 0,
            speed: 1,
            opened: false
        }
        this.t = 0;

        this.handleClose = throttle(() => {
            this.setState({
                opened: !this.state.opened
            })
        }, 800)
    }

    componentDidMount() {
        this.setState({
            opened: true
        })
    }

    render() {
        const { background, menu, contentHeader, contentBody, contentFooter } = this.props;
        const { speed, opened } = this.state;
        return <div className={classnames({ 'menu': true , opened})} onClick={this.handleClose}>
            <div className="menu__background">
                <div className="menu__background__image">
                    <div className="menu__background__image__wrapper"></div>
                    <img src={background}></img>
                </div>
                <div className={classnames({ menu__background__info: true, expanded: opened })}>
                    {contentHeader && <div className="menu__background__top">
                        <div className="content menu__background__top__content"
                            dangerouslySetInnerHTML={{ __html: contentHeader }}>
                        </div>
                    </div>}
                    {contentBody && <div className="content menu__background__middle">
                        <div className="content menu__background__middle__content"
                            dangerouslySetInnerHTML={{ __html: contentBody }}>
                        </div>
                    </div>}
                    {contentFooter && <div className="content menu__background__bottom">
                        <div className="content menu__background__bottom__content"
                            dangerouslySetInnerHTML={{ __html: contentFooter }}>
                        </div>
                    </div>}
                </div>
            </div>
            <div className="menu__wrapper" style={{
                borderRadius: `${this.radius}px`
            }}>
                {menu.map((el, index) => {
                    const pos = index + 1;
                    return <Item el={el}
                        opened={opened}
                        radius={this.radius - 2 * this.borderSize}
                        angle={160 / (menu.length) * pos}
                        speed={speed}
                        key={index} />
                })}
            </div>
        </div >
    }
}