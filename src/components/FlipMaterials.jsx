import THREE from 'three';

export default class FlipMaterials extends THREE.MeshFaceMaterial {
    constructor(shading) {
        const heatMaterial = new THREE.MeshPhongMaterial({
            vertexColors: THREE.VertexColors,
            depthWrite: true,
            depthTest: true,
            side: THREE.DoubleSide,
            specular: 0x000099,
            shininess: 70,
            shading
        });

        const solidMaterial = new THREE.MeshPhongMaterial({
            color: 0x0094ce,
            depthWrite: true,
            depthTest: true,
            side: THREE.DoubleSide,
            specular: 0x000099,
            shininess: 70,
            shading
        });

        super([solidMaterial, heatMaterial]);
        this.defaultSet = [this.materials[0], this.materials[1]];
    }

    heat(isHeat) {
        if (isHeat) {
            this.materials[0] = this.defaultSet[1];
            this.materials[1] = this.defaultSet[0];
        } else {
            this.materials[0] = this.defaultSet[0];
            this.materials[1] = this.defaultSet[1];
        }
    }

    static generateHeat(geometry) {
        geometry.computeBoundingBox();

        const faceSymbols = ['a', 'b', 'c'];
        const zMin = geometry.boundingBox.min.z;
        const zMax = geometry.boundingBox.max.z;
        const zRange = zMax - zMin;

        geometry.vertices.forEach((vertex, i) => {
            const color = new THREE.Color(0x0000ff);
            color.setHSL(0.7 * (zMax - vertex.z) / zRange, 1, 0.5);
            geometry.colors[i] = color;
        });

        geometry.faces.forEach((face) => {
            faceSymbols.forEach((symbol, i)=> {
                face.vertexColors[i] = geometry.colors[face[symbol]];
            });
        });
    }
}
