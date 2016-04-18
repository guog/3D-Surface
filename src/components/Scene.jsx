import THREE from 'three';
import Orbiter from 'three-orbit-controls';

export default class Scene extends THREE.Scene {
    constructor(dom = document.body, options = {}) {
        super();

        this.setupRenderer(options);
        this.setupCamera(options);
        this.setupLight(options);
        this.setupOrbiter(options);

        this.add(new THREE.AxisHelper(500));
        /* We need some grids */


        dom.appendChild(this.renderer.domElement);
    }

    setupRenderer({antialias = true, width = 500, height = 500, ratio = window.devicePixelRatio, bgColor = 0xffffff}) {
        this.renderer = new THREE.WebGLRenderer({antialias});
        this.renderer.setViewport(0, 0, width, height);
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(ratio);
        this.renderer.setClearColor(bgColor, 1.0);
    }

    setupCamera({angle = 45, near = 0.1, far = 1000, scale = 100, ratio = window.devicePixelRatio}) {
        this.camera = new THREE.PerspectiveCamera(angle, ratio, near, far);
        this.camera.position.set(scale, scale, scale);
        this.camera.lookAt(this.position);
    }

    setupLight({color = 0xffffff}) {
        const lightUp = new THREE.PointLight(color, 1, 0);
        const lightDown = new THREE.PointLight(color, 1, 0);
        lightDown.position.set(50, -50, 25);
        lightUp.position.set(50, 150, 25);
        this.add(lightDown, lightUp);
    }

    setupOrbiter() {
        this.orbiter = new (Orbiter(THREE))(this.camera);
    }

    animate() {
        const that = this;
        (function loop() {
            that.renderer.render(that, that.camera);
            requestAnimationFrame(loop);
        })();
    }
}