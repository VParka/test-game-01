// src/npc/NPCManager.js

import * as THREE from 'three';
import { NPC } from './NPC.js';

export class NPCManager {
    constructor() {
        this.npcs = new Map();
        this.npcContainer = new THREE.Object3D();
        this.npcContainer.name = 'NPCs';
        this.createNPCs();
    }

    createNPCs() {
        const npcData = [
            { name: 'Alpha', position: new THREE.Vector3(0, 1, -10) },
            { name: 'Bravo', position: new THREE.Vector3(-10, 1, 0) },
            { name: 'Charlie', position: new THREE.Vector3(10, 1, 0) },
        ];

        for (const data of npcData) {
            const npc = new NPC(data.name, 100, data.position);
            this.npcs.set(npc.id, npc);
            this.npcContainer.add(npc.object);
        }
    }

    getNPCById(id) {
        return this.npcs.get(id);
    }

    getAllNPCMeshes() {
        return Array.from(this.npcs.values())
            .filter(npc => npc.hp > 0)
            .map(npc => npc.object);
    }

    update(deltaTime) {
        this.npcs.forEach(npc => npc.update(deltaTime));
    }
}
