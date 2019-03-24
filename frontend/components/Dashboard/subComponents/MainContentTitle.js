import React, { Component } from 'react';

class MainContentTitle extends Component {
    render() {
        return (
            <div>
                <h2>
                    {this.props.title}
                </h2>
            </div>
        );
    }
}

export default MainContentTitle;