import * as THREE from 'three';
import { PlayerControls } from './Controls.js';

class Player {
    constructor(world) {
        this.world = world;
        this.camera = world.getCamera();
        this.scene = world.getScene();
        this.controls = new PlayerControls(this.camera, document.body);

        // Player object
        const geometry = new THREE.CapsuleGeometry(0.5, 1, 4, 16);
        const material = new THREE.MeshStandardMaterial({ color: 0x00ff00, visible: false }); // Visible for debugging if needed
        this.playerObject = new THREE.Mesh(geometry, material);
        this.playerObject.position.set(0, 2, -6); // Start close to the NPC for testing
        this.playerObject.castShadow = true;
        this.scene.add(this.playerObject);
        this.scene.add(this.controls.getObject());

        // Physics
        this.velocity = new THREE.Vector3();
        this.direction = new THREE.Vector3();
        this.gravity = 9.8 * 2; // m/s^2, slightly stronger for game feel
        this.jumpForce = 10.0;
        this.speed = 5.0;
        this.sprintMultiplier = 1.5;

        // Ground check
        this.raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 1.1);
        this.collidables = world.getCollidables();
        this.onGround = false;

        // To handle camera position relative to player capsule
        this.camera.position.set(0, 1.8, 0); // Eye level
    }

    update(deltaTime) {
        const speed = this.speed * (this.controls.isKeyPressed('ShiftLeft') ? this.sprintMultiplier : 1);

        // Calculate forward/backward and left/right movement
        this.direction.z = Number(this.controls.isKeyPressed('KeyW')) - Number(this.controls.isKeyPressed('KeyS'));
        this.direction.x = Number(this.controls.isKeyPressed('KeyA')) - Number(this.controls.isKeyPressed('KeyD'));
        this.direction.normalize(); // Ensure consistent speed in all directions

        // Apply movement
        if (this.controls.isKeyPressed('KeyW') || this.controls.isKeyPressed('KeyS')) {
            this.velocity.z = -this.direction.z * speed;
        } else {
            this.velocity.z = 0;
        }
        if (this.controls.isKeyPressed('KeyA') || this.controls.isKeyPressed('KeyD')) {
            this.velocity.x = this.direction.x * speed;
        } else {
            this.velocity.x = 0;
        }

        // Apply movement vectors relative to camera direction
        const moveVector = new THREE.Vector3(this.velocity.x, 0, this.velocity.z);
        moveVector.applyQuaternion(this.camera.quaternion);

        this.playerObject.position.x += moveVector.x * deltaTime;
        this.playerObject.position.z += moveVector.z * deltaTime;


        // Gravity
        this.velocity.y -= this.gravity * deltaTime;
        this.playerObject.position.y += this.velocity.y * deltaTime;

        // Ground check
        this.raycaster.ray.origin.copy(this.playerObject.position);
        const intersections = this.raycaster.intersectObjects(this.collidables, false);
        this.onGround = intersections.length > 0;

        if (this.onGround) {
            this.velocity.y = 0;
            // Snap to ground
            this.playerObject.position.y = intersections[0].point.y + 1.0;
        }

        // Jumping
        if (this.controls.isKeyPressed('Space') && this.onGround) {
            this.velocity.y = this.jumpForce;
        }

        // Update camera position to follow player
        this.controls.getObject().position.copy(this.playerObject.position);
        this.controls.getObject().position.y += 0.8; // Adjust camera height
    }
}

export { Player };
