// src/world/SpaceBackground.js

import * as THREE from 'three';

export class SpaceBackground {
    constructor(starCount = 10000) {
        const vertices = [];
        for (let i = 0; i < starCount; i++) {
            const x = THREE.MathUtils.randFloatSpread(2000);
            const y = THREE.MathUtils.randFloatSpread(2000);
            const z = THREE.MathUtils.randFloatSpread(2000);
            vertices.push(x, y, z);
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

        const material = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 1.5,
            sizeAttenuation: true,
            transparent: true,
            opacity: 0.8
        });

        this.object = new THREE.Points(geometry, material);
        this.object.name = 'Starfield';
    }

    update(deltaTime) {
        this.object.rotation.y += deltaTime * 0.01;
    }
}
