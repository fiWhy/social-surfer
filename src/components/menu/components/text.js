import React from 'react';
export default class extends React.Component {

    render() {
        const { content, expand } = this.props;
        return (
            <div className={expand ? 'expand' : ''}><span>{content}</span></div>
        )
    }
}