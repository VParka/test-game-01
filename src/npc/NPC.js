// src/npc/NPC.js

import * as THREE from 'three';

export class NPC {
    constructor(name, maxHp, position) {
        this.id = THREE.MathUtils.generateUUID();
        this.name = name;
        this.maxHp = maxHp;
        this.hp = maxHp;

        this.originalColor = new THREE.Color(0xff0000);
        this.hitColor = new THREE.Color(0xffffff);
        this.hitCooldown = 0.2;
        this.timeSinceLastHit = 0;

        const geometry = new THREE.BoxGeometry(1, 2, 1);
        const material = new THREE.MeshStandardMaterial({ color: this.originalColor });
        this.object = new THREE.Mesh(geometry, material);
        this.object.position.copy(position);
        this.object.name = `NPC_${name}`;
        this.object.userData.parentId = this.id;
    }

    takeDamage(amount) {
        if (this.hp > 0) {
            this.hp = Math.max(0, this.hp - amount);
            console.log(`${this.name} took ${amount} damage, HP is now ${this.hp}`);
            this.showHitFeedback();
            if (this.hp === 0) {
                this.onDeath();
            }
        }
    }

    showHitFeedback() {
        this.timeSinceLastHit = 0;
        this.object.material.color.set(this.hitColor);
    }

    update(deltaTime) {
        if (this.timeSinceLastHit < this.hitCooldown) {
            this.timeSinceLastHit += deltaTime;
            if (this.timeSinceLastHit >= this.hitCooldown) {
                this.object.material.color.set(this.originalColor);
            }
        }
    }

    onDeath() {
        console.log(`${this.name} has been defeated.`);
        this.object.material.transparent = true;
        this.object.material.opacity = 0.5;
    }
}
