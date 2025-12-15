import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

class PlayerControls extends PointerLockControls {
    constructor(camera, domElement) {
        super(camera, domElement);
        this.domElement = domElement;
        this.keys = new Set();
        this.initEventListeners();
    }

    initEventListeners() {
        document.addEventListener('keydown', (event) => this.keys.add(event.code));
        document.addEventListener('keyup', (event) => this.keys.delete(event.code));

        // Lock pointer on click
        this.domElement.addEventListener('click', () => {
            this.lock();
        });
    }

    isKeyPressed(keyCode) {
        return this.keys.has(keyCode);
    }
}

export { PlayerControls };
