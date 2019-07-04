import React from 'react';
import Text from './text';
import { animate, easeInOut, posX, posY, easeInOutTimeFraction } from '../../../lib/animations';

export class Item extends React.Component {
    constructor(props) {
        super(props);
        this.posX = posX(props.radius);
        this.posY = posY(props.radius);
        this.frame = null;
        this.state = {
            x: this.posX(0),
            y: this.posY(0),
            angle: 0,
            progress: 0,
            expand: false
        }

        this.open = (before = Promise.resolve(), after) => {
            const { progress: currentProgress } = this.state;
            const { angle: propsAngle } = this.props;
            this.frame = animate(easeInOut)(1000, currentProgress ? 1 - currentProgress : 0)((progress, frame) => {
                this.frame = frame;
                const angle = progress * propsAngle;
                this.setState({
                    x: this.posX(angle),
                    y: this.posY(angle),
                    angle,
                    progress
                }, () => {
                    if (progress === 1 && after) {
                        after();
                    }
                });


            });
        }

        this.close = (before = Promise.resolve(), after) => {
            const { angle: currentAngle, progress: currentProgress } = this.state;
            cancelAnimationFrame(this.frame);
            before.then(() => {
                this.frame = animate(easeInOut)(1000, 1 - currentProgress)((progress, frame) => {
                    this.frame = frame;
                    const angle = progress * (currentAngle);
                    this.setState({
                        x: this.posX(currentAngle - currentAngle * progress),
                        y: this.posY(currentAngle - currentAngle * progress),
                        angle,
                        progress
                    }, () => {
                        if (progress === 1 && after) {
                            after();
                        }
                    });
                });
            });
        }
    }

    componentDidMount() {
        const { opened } = this.props;
        if (opened) {
            this.open(undefined, () => this.setState({ expand: true }));
        }
    }

    componentWillReceiveProps({ opened }) {
        if (opened !== this.props.opened) {
            opened ?
                this.open(undefined, () => this.setState({ expand: true })) :
                this.close(new Promise((res) => {
                    this.setState({ expand: false }, res);
                }));
        }
    }

    render() {
        const { el, opened } = this.props;
        const { x, y, expand } = this.state;
        return (
            <div className="menu__item"
                style={{
                    transform: `translate(calc(${x}px - 42%), calc(${y}px - 42%))`
                }}
                key={el.id}>
                <div className="menu__item__header">
                    <Text expand={expand && opened} content={el.title} />
                </div>
                <div className="menu__item__body">
                    <div style={{
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${el.image})`
                    }}></div>
                </div>
            </div>
        )
    }
}