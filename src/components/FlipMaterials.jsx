import THREE from 'three';

export default class FlipMaterials extends THREE.MeshFaceMaterial {
    constructor(shading) {
        const solidMaterial = new THREE.MeshPhongMaterial({
            color: 0x0094ce,
            depthWrite: true,
            depthTest: true,
            side: THREE.DoubleSide,
            specular: 0x000099,
            shininess: 70,
            shading
        });

        super([solidMaterial]);
        this.defaultSet = [this.materials[0]];
    }
}
