import React from 'react';
import { connect } from 'react-redux';
var info = [
    {
        title: 'witcher',
        image: 'random'
    },
    {
        title: 'cyberpunk',
        image: 'ciri'
    }
];

function Card(title, image) {
    this.title = title;
    this.image = image;
}

Card.prototype.save = function () {
    console.log('Ask BE to save');
}

Card.prototype.download = function () {
    console.log('Redirect to download link');
}

class Slider extends React.Component {
    render() {
        const { data } = this.props;
        return <>{info.map(function (i) {
            return new Card(i.title, i.image);
        }).map(function (card) {
            return <div>
                <div onClick={() => card.save()}>{card.title}</div>
                <div>{card.image}</div>
            </div>
        })}</>
    }
}

const state = (state) => ({
    data: state.greeting
})

export default connect(state)(Slider);