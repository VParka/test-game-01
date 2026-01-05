// src/Game.js

import { SceneManager } from './core/SceneManager.js';
import { InputManager } from './core/InputManager.js';
import { PlayerController } from './player/PlayerController.js';
import { Terrain } from './world/Terrain.js';
import { SpaceBackground } from './world/SpaceBackground.js';
import { NPCManager } from './npc/NPCManager.js';
import { Gun } from './player/Gun.js';
import * as THREE from 'three';

export class Game {
    constructor(canvas) {
        this.sceneManager = new SceneManager(canvas);
        this.inputManager = new InputManager();
        this.npcManager = new NPCManager();
        this.playerController = new PlayerController(this.sceneManager.camera, this.inputManager);
        this.terrain = new Terrain();
        this.spaceBackground = new SpaceBackground();
        this.gun = new Gun(this.sceneManager.camera, this.npcManager);
        this.clock = new THREE.Clock();

        this.sceneManager.scene.add(this.playerController.object);
        this.sceneManager.scene.add(this.terrain.object);
        this.sceneManager.scene.add(this.spaceBackground.object);
        this.sceneManager.scene.add(this.npcManager.npcContainer);

        const collidables = [this.terrain.object, ...this.npcManager.getAllNPCMeshes()];
        this.playerController.setCollidableObjects(collidables);
    }

    start() {
        this.animate();
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        const deltaTime = this.clock.getDelta();

        if (this.sceneManager.controls.isLocked) {
            this.playerController.update(deltaTime);
            this.gun.update(deltaTime, this.inputManager.isFiring());
        }

        this.spaceBackground.update(deltaTime);
        this.npcManager.update(deltaTime);

        this.sceneManager.render();
    }
}
