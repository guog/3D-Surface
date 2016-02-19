import THREE from 'three';

export default class Grid {
  constructor(size = 10, color = 0x000000, step = 5) {
    this.size = size;
    this.step = step;
    this.material = new THREE.LineBasicMaterial({color});
  }

  planes() {
    this.lines = new THREE.Object3D();
    let i = this.size;
    while (i--) {
      if (i % this.step === 0) {
        this.xPlane(i);
        this.yPlane(i);
        this.zPlane(i);
      }
    }
    return this.lines;
  }

  xPlane(i) {
    this.lines.add(
      new THREE.Line(this.xyLine(i), this.material),
      new THREE.Line(this.yxLine(i), this.material)
    );
  }

  yPlane(i) {
    this.lines.add(
      new THREE.Line(this.yzLine(i), this.material),
      new THREE.Line(this.zyLine(i), this.material)
    );
  }

  zPlane(i) {
    this.lines.add(
      new THREE.Line(this.zxLine(i), this.material),
      new THREE.Line(this.xzLine(i), this.material)
    );
  }

  line(start, end) {
    const geometry = new THREE.Geometry();
    geometry.vertices.push(start, end);
    return geometry;
  }

  xyLine(level) {
    return this.line(
      new THREE.Vector3(level, 0, 0),
      new THREE.Vector3(level, this.size, 0)
    );
  }

  yxLine(level) {
    return this.line(
      new THREE.Vector3(0, level, 0),
      new THREE.Vector3(this.size, level, 0)
    );
  }

  yzLine(level) {
    return this.line(
      new THREE.Vector3(0, level, 0),
      new THREE.Vector3(0, level, this.size)
    );
  }

  zyLine(level) {
    return this.line(
      new THREE.Vector3(0, 0, level),
      new THREE.Vector3(0, this.size, level)
    );
  }

  zxLine(level) {
    return this.line(
      new THREE.Vector3(0, 0, level),
      new THREE.Vector3(this.size, 0, level)
    );
  }

  xzLine(level) {
    return this.line(
      new THREE.Vector3(level, 0, 0),
      new THREE.Vector3(level, 0, this.size)
    );
  }
}
