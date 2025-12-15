// src/player/Gun.js

import * as THREE from 'three';
import { NPCManager } from '../npc/NPCManager.js';

export class Gun {
    constructor(camera, npcManager) {
        this.camera = camera;
        this.npcManager = npcManager;
        this.raycaster = new THREE.Raycaster();
        this.fireCooldown = 0.5;
        this.timeSinceLastFire = 0;
    }

    update(deltaTime, isFiring) {
        this.timeSinceLastFire += deltaTime;

        if (isFiring && this.timeSinceLastFire >= this.fireCooldown) {
            this.fire();
            this.timeSinceLastFire = 0;
        }
    }

    fire() {
        console.log("Bang!");
        this.applyRecoil();

        this.raycaster.setFromCamera(new THREE.Vector2(0, 0), this.camera);
        const npcMeshes = this.npcManager.getAllNPCMeshes();
        const intersects = this.raycaster.intersectObjects(npcMeshes);

        if (intersects.length > 0) {
            const hitObject = intersects[0].object;
            const npcId = hitObject.userData.parentId;
            if (npcId) {
                const npc = this.npcManager.getNPCById(npcId);
                if (npc) {
                    npc.takeDamage(25);
                }
            }
        }
    }

    applyRecoil() {
        this.camera.rotation.x -= 0.01;
        setTimeout(() => {
            this.camera.rotation.x += 0.01;
        }, 50);
    }
}
