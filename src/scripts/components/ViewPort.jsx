import React from 'react';
import Scene from './Scene.jsx';

import VertexSurface from './VertexSurface.jsx';
import ParametricSurface from './ParametricSurface.jsx';

export default class ViewPort extends React.Component {
  constructor(props, context) {
    super(props, context);
  }


  render() {
    if (this.vertexSurface) {
      this.vertexSurface.visible = this.props.type;
      this.vertexSurface.material.heat(this.props.heat);
    }

    if (this.parametricSurface) {
      this.parametricSurface.visible = !this.props.type;
      this.parametricSurface.material.heat(this.props.heat);
    }

    return (
      <section ref={ (dom) => !this.scene && this.run(dom) } id="surface-keeper"/>
    );
  }

  run(dom) {
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight - 68;
    const ratio = width / height;
    this.scene = new Scene(dom, {width, height, ratio});

    this.vertexSurface = new VertexSurface();
    this.parametricSurface = new ParametricSurface();
    this.vertexSurface.visible = true;
    this.parametricSurface.visible = false;

    this.scene.wrapper.add(this.vertexSurface, this.parametricSurface);
    this.scene.animate();
  }
}
