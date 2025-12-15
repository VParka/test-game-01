import * as THREE from 'three';
import { World } from './modules/World.js';
import { Player } from './modules/Player.js';
import { NPC } from './modules/NPC.js';
import { DialogueManager } from './modules/DialogueManager.js';

class Game {
    constructor() {
        this.clock = new THREE.Clock();
        this.world = new World();
        this.player = new Player(this.world);
        this.dialogueManager = new DialogueManager();
        this.npcs = [];
        this.isDialogueActive = false;

        this.animate = this.animate.bind(this);
    }

    init() {
        console.log("Game Initializing...");

        this.setupNPCs();
        this.setupInteraction();

        // Lock controls when dialogue ends
        this.dialogueManager.onDialogueEnd = () => {
            this.isDialogueActive = false;
            this.player.controls.lock();
        };

        this.animate();
    }

    setupNPCs() {
        const sageDialogue = {
            start: 'greeting',
            nodes: {
                greeting: {
                    text: "Greetings, traveler. I sense a great journey ahead of you. What do you seek?",
                    options: [
                        { text: "I seek knowledge.", nextNode: 'knowledge' },
                        { text: "I'm just passing through.", nextNode: 'passing_through' },
                        { text: "Goodbye.", nextNode: 'end' }
                    ]
                },
                knowledge: {
                    text: "Knowledge is a path, not a destination. Look for the three ancient artifacts to unlock your true potential.",
                    options: [ { text: "Thank you for your wisdom.", nextNode: 'end' } ]
                },
                passing_through: {
                    text: "Be wary. The lands beyond are treacherous. May your travels be safe.",
                    options: [ { text: "I will be careful.", nextNode: 'end' } ]
                }
            }
        };

        const sage = new NPC('The Old Sage', new THREE.Vector3(0, 1, -10), sageDialogue);
        sage.addToScene(this.world.getScene());
        this.npcs.push(sage);
    }

    setupInteraction() {
        document.addEventListener('keydown', (event) => {
            if (event.code === 'KeyE' && !this.isDialogueActive) {
                for (const npc of this.npcs) {
                    if (npc.canInteractWith(this.player.playerObject.position)) {
                        this.isDialogueActive = true;
                        this.player.controls.unlock();
                        npc.interact(this.dialogueManager);
                        break; // Interact with the first NPC in range
                    }
                }
            }
        });
    }

    animate() {
        requestAnimationFrame(this.animate);
        const deltaTime = this.clock.getDelta();

        if (!this.isDialogueActive) {
            this.player.update(deltaTime);
        }

        this.npcs.forEach(npc => npc.update(deltaTime));

        this.world.render();
    }
}

const game = new Game();
game.init();
