// src/core/SceneManager.js

import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

export class SceneManager {
    constructor(canvas) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
        this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000005); // Deep space color

        // Fog
        this.scene.fog = new THREE.FogExp2(0x000005, 0.001);

        // Pointer Lock Controls
        this.controls = new PointerLockControls(this.camera, this.renderer.domElement);
        this.setupPointerLock();

        // Atmospheric Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5); // Softer ambient light
        this.scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2); // Dimmer directional light
        directionalLight.position.set(10, 20, 15);
        this.scene.add(directionalLight);

        this.scene.add(this.camera);

        window.addEventListener('resize', this.onWindowResize.bind(this));
    }

    setupPointerLock() {
        const canvas = this.renderer.domElement;
        canvas.addEventListener('click', () => {
            this.controls.lock();
        });

        this.controls.addEventListener('lock', () => console.log('Pointer locked'));
        this.controls.addEventListener('unlock', () => console.log('Pointer unlocked'));
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}
