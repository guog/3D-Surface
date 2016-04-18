import THREE from 'three';
import FlipMaterials from './FlipMaterials.jsx';
import Data from '../data.jsx';

export default class VertexSurface {
    constructor() {
        return VertexSurface.buildGeometry();
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

    static buildGeometry() {
        const surfaceGeometry = new THREE.Geometry();

        surfaceGeometry.vertices = this.makeVertices();
        surfaceGeometry.faces = this.makeFaces();
        surfaceGeometry.faceVertexUvs[0] = this.toFaceVertexUVs(surfaceGeometry.faces);

        FlipMaterials.generateHeat(surfaceGeometry);

        return new THREE.Mesh(surfaceGeometry, new FlipMaterials(THREE.FlatShading));
    }

    static makeVertices() {
        const vertices = [];
        for (let x = 0; x < this.width(); x++) {
            for (let y = 0; y < this.height(); y++) {
                vertices.push(new THREE.Vector3(x, y, this.z(x, y)));
            }
        }
        return vertices;
    }

    static makeFaces() {
        const faces = [];

        for (let x = 0; x < this.width() - 1; x++) {
            for (let y = 0; y < this.height() - 1; y++) {
                const edge = x * this.height() + y;
                const a = edge;
                const b = edge + 1;
                const c = edge + this.height() + 1;
                const d = edge + this.height();
                Array.prototype.push.apply(faces, this.toFace4(a, b, c, d, 0));
            }
        }

        return faces;
    }

    static toFace4(a, b, c, d, materialIndex) {
        return [
            new THREE.Face3(a, b, c, null, null, materialIndex),
            new THREE.Face3(c, d, a, null, null, materialIndex)
        ];
    }

    static toFaceVertexUVs(faces) {
        const faceVertexUVs = [];

        const cell = [
            new THREE.Vector2(0, 1),
            new THREE.Vector2(1, 1),
            new THREE.Vector2(1, 0),
            new THREE.Vector2(0, 0)
        ];

        const UVs = [
            [cell[0], cell[1], cell[2]],
            [cell[2], cell[3], cell[0]]
        ];

        let i = Math.round(faces.length / 2);
        while (i--) {
            Array.prototype.push.apply(faceVertexUVs, UVs);
        }
        return faceVertexUVs;
    }
}
