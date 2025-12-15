// src/world/Terrain.js

import * as THREE from 'three';

export class Terrain {
    constructor() {
        const geometry = new THREE.PlaneGeometry(500, 500);
        const material = new THREE.MeshStandardMaterial({ color: 0x888888 });

        this.object = new THREE.Mesh(geometry, material);
        this.object.rotation.x = -Math.PI / 2;
        this.object.receiveShadow = true;
        this.object.name = 'Terrain';
    }
}
