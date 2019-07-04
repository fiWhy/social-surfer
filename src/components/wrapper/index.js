import React from 'react';

export default class extends React.Component {
    render() {
        return <div className="wrapper">{this.props.children}</div>;
    }
}