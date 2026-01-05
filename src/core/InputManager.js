// src/core/InputManager.js

export class InputManager {
    constructor() {
        this.keys = new Set();
        this.mouseButtons = new Set();
        this.mouseMovement = { x: 0, y: 0 };
        this.isPointerLocked = false;

        document.addEventListener('keydown', this.onKeyDown.bind(this));
        document.addEventListener('keyup', this.onKeyUp.bind(this));
        document.addEventListener('mousedown', this.onMouseDown.bind(this));
        document.addEventListener('mouseup', this.onMouseUp.bind(this));
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
        document.addEventListener('pointerlockchange', this.onPointerLockChange.bind(this));
    }

    onKeyDown(event) { this.keys.add(event.code); }
    onKeyUp(event) { this.keys.delete(event.code); }
    onMouseDown(event) { this.mouseButtons.add(event.button); }
    onMouseUp(event) { this.mouseButtons.delete(event.button); }

    onMouseMove(event) {
        if (this.isPointerLocked) {
            this.mouseMovement.x = event.movementX;
            this.mouseMovement.y = event.movementY;
        } else {
            this.mouseMovement.x = 0;
            this.mouseMovement.y = 0;
        }
    }

    onPointerLockChange() {
        this.isPointerLocked = document.pointerLockElement !== null;
    }

    isKeyPressed(code) {
        return this.keys.has(code);
    }

    // Left mouse button is 0
    isFiring() {
        return this.isPointerLocked && this.mouseButtons.has(0);
    }
}
