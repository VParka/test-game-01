
class DialogueManager {
    constructor() {
        this.container = document.getElementById('dialogue-container');
        this.npcNameEl = document.getElementById('npc-name');
        this.textEl = document.getElementById('dialogue-text');
        this.optionsEl = document.getElementById('dialogue-options');

        this.currentNode = null;
        this.dialogueTree = null;
        this.onDialogueEnd = null;
    }

    startDialogue(npc, dialogueTree) {
        this.container.style.display = 'block';
        this.npcNameEl.textContent = npc.name;
        this.dialogueTree = dialogueTree;
        this.currentNode = this.dialogueTree.nodes[dialogueTree.start];
        this.updateUI();
    }

    endDialogue() {
        this.container.style.display = 'none';
        if (this.onDialogueEnd) {
            this.onDialogueEnd();
        }
    }

    selectOption(index) {
        const nextNodeKey = this.currentNode.options[index].nextNode;
        if (nextNodeKey === 'end') {
            this.endDialogue();
        } else {
            this.currentNode = this.dialogueTree.nodes[nextNodeKey];
            this.updateUI();
        }
    }

    updateUI() {
        this.textEl.textContent = this.currentNode.text;
        this.optionsEl.innerHTML = '';

        if (this.currentNode.options) {
            this.currentNode.options.forEach((option, index) => {
                const button = document.createElement('div');
                button.classList.add('dialogue-option');
                button.textContent = option.text;
                button.onclick = () => this.selectOption(index);
                this.optionsEl.appendChild(button);
            });
        }
    }
}

export { DialogueManager };
