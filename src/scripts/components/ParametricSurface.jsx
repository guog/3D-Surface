import THREE from 'three';
import FlipMaterials from './FlipMaterials.jsx';
import Data from '../../assets/Data.jsx';

export default class ParametricSurface {
  constructor() {
    return ParametricSurface.buildGeometry();
  }

  static zScale() {
    return 200;
  }

  static height() {
    return Data[0] && Data[0].length || 0;
  }

  static width() {
    return Data.length;
  }

  static z(x, y) {
    return Data[x][this.height() - 1 - y] * this.zScale();  // reversed output
    // return Data[x][y] * this.zScale();                   // normal output
  }

  static meshFunction(u, v) {
    const xRange = Data.length - 1;
    const yRange = Data[0].length - 1;
    const x = Math.round(Math.round(xRange * u * 100) / 100);
    const y = Math.round(Math.round(yRange * v * 100) / 100);
    const z = ParametricSurface.z(x, y);
    return isNaN(z) ? new THREE.Vector3(0, 0, 0) : new THREE.Vector3(x, y, z);
  }

  static buildGeometry() {
    const surfaceGeometry = new THREE.ParametricGeometry(this.meshFunction, this.width(), this.height());

    FlipMaterials.generateHeat(surfaceGeometry);

    return new THREE.Mesh(surfaceGeometry, new FlipMaterials(THREE.SmoothShading));
  }
}
