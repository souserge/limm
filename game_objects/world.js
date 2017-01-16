class World {
    constructor(id, levels) {
        this.id = id;
        this.levels = levels || new Map();
    }

    addLevel(levelId, level) {
        this.levels.set(levelId, level);
    }

    getLevel(levelId) {
        return this.levels.get(levelId);
    }
}