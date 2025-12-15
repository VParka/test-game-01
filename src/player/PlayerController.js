// src/player/PlayerController.js

import * as THREE from 'three';
import { InputManager } from '../core/InputManager.js';

export class PlayerController {
    constructor(camera, inputManager) {
        this.camera = camera;
        this.inputManager = inputManager;

        this.object = new THREE.Object3D();
        this.object.position.set(0, 10, 5); // Start higher to see gravity work
        this.object.add(this.camera);

        // Movement
        this.moveDirection = new THREE.Vector3();
        this.speed = 5.0;
        this.sprintSpeed = 10.0;

        // Jumping & Gravity
        this.velocity = new THREE.Vector3();
        this.gravity = -9.8 * 2;
        this.jumpHeight = 1.5;
        this.onGround = false;
        this.groundRaycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 1.1);
        this.collidableObjects = [];
    }

    setCollidableObjects(objects) {
        this.collidableObjects = objects;
    }

    update(deltaTime) {
        // --- Horizontal Movement ---
        const currentSpeed = this.inputManager.isKeyPressed('ShiftLeft') ? this.sprintSpeed : this.speed;
        const forward = this.inputManager.isKeyPressed('KeyW') ? 1 : 0;
        const backward = this.inputManager.isKeyPressed('KeyS') ? 1 : 0;
        const right = this.inputManager.isKeyPressed('KeyA') ? 1 : 0;
        const left = this.inputManager.isKeyPressed('KeyD') ? 1 : 0;

        this.moveDirection.z = forward - backward;
        this.moveDirection.x = right - left;
        this.moveDirection.normalize();

        const cameraQuaternion = new THREE.Quaternion();
        this.camera.getWorldQuaternion(cameraQuaternion);
        const moveVector = new THREE.Vector3().copy(this.moveDirection).applyQuaternion(cameraQuaternion);

        this.object.position.x += moveVector.x * currentSpeed * deltaTime;
        this.object.position.z += moveVector.z * currentSpeed * deltaTime;

        // --- Vertical Movement (Gravity & Jump) ---
        this.groundRaycaster.ray.origin.copy(this.object.position);
        const intersections = this.groundRaycaster.intersectObjects(this.collidableObjects, false);
        this.onGround = intersections.length > 0;

        if (!this.onGround) {
            this.velocity.y += this.gravity * deltaTime;
        } else {
            this.velocity.y = 0;
            this.object.position.y = intersections[0].point.y + 1.0;
        }

        if (this.inputManager.isKeyPressed('Space') && this.onGround) {
            this.velocity.y = Math.sqrt(this.jumpHeight * -2 * this.gravity);
        }

        this.object.position.y += this.velocity.y * deltaTime;
    }
}
