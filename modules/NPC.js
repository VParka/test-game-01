import * as THREE from 'three';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'; // To be used when loading real models

class NPC {
    constructor(name, position, dialogueTree) {
        this.name = name;
        this.dialogueTree = dialogueTree;
        this.interactionDistance = 5.0; // The distance within which the player can interact

        // Placeholder 3D object - replace with GLTF model
        const geometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 16);
        const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
        this.object = new THREE.Mesh(geometry, material);
        this.object.position.copy(position);
        this.object.castShadow = true;
        this.object.userData.isNPC = true; // Tag for easy identification
        this.object.userData.parent = this;

        // In a real game, you would load a model like this:
        /*
        const loader = new GLTFLoader();
        loader.load('path/to/model.glb', (gltf) => {
            this.object = gltf.scene;
            this.object.position.copy(position);
            this.object.traverse(child => {
                if (child.isMesh) {
                    child.castShadow = true;
                }
            });
            // Add any animations here
        });
        */
    }

    addToScene(scene) {
        scene.add(this.object);
    }

    canInteractWith(playerPosition) {
        return this.object.position.distanceTo(playerPosition) <= this.interactionDistance;
    }

    update(deltaTime) {
        // Simple idle animation (e.g., bobbing)
        // Note: Using a cumulative time for a smooth sine wave
        this.elapsedTime = (this.elapsedTime || 0) + deltaTime;
        this.object.position.y += Math.sin(this.elapsedTime * 2) * 0.001;
    }

    interact(dialogueManager) {
        console.log(`Interacting with ${this.name}`);
        dialogueManager.startDialogue(this, this.dialogueTree);
    }
}

export { NPC };
