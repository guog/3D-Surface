import React from 'react';
import Scene from './Scene.jsx';

export default class ViewPort extends React.Component {
    render() {
        return (
            <section ref={ (dom) => !this.scene && this.run(dom) } id="surface-keeper"/>
        );
    }

    run(dom) {
        const width = document.documentElement.clientWidth;
        const height = document.documentElement.clientHeight - 68;
        const ratio = width / height;
        this.scene = new Scene(dom, {width, height, ratio});
        this.scene.animate();
    }
}
