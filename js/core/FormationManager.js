import { Formation } from "./Formation.js";
import { LineFormation } from "./LineFormation.js";
import { VFormation } from "./VFormation.js";
import { CircleFormation } from "./CircleFormation.js";
import { ZigzagFormation } from "./ZigzagFormation.js";
import { ColumnFormation } from "./ColumnFormation.js";
import { SwarmFormation } from "./SwarmFormation.js";

export class FormationManager {
    constructor() {
        this.formations = [];
    }

    createFormation() {
        const formation = new Formation();

        this.formations.push(formation);

        return formation;
    }

    createLineFormation() {
        const formation = new LineFormation();

        this.formations.push(formation);

        return formation;
    }

    createVFormation() {
        const formation = new VFormation();

        this.formations.push(formation);

        return formation;
    }

    createCircleFormation() {
        const formation = new CircleFormation();

        this.formations.push(formation);

        return formation;
    }

    createZigzagFormation() {
        const formation = new ZigzagFormation();

        this.formations.push(formation);

        return formation;
    }

    createColumnFormation() {
        const formation = new ColumnFormation();

        this.formations.push(formation);

        return formation;
    }

    createSwarmFormation() {
        const formation = new SwarmFormation();

        this.formations.push(formation);

        return formation;
    }

    update(deltaTime) {
        for (const formation of this.formations) {
            if (!formation.active) {
                continue;
            }

            formation.update(deltaTime);
        }
    }

    reset() {
        this.formations = [];
    }

    hasActiveFormations() {
        for (const formation of this.formations) {
            if (formation.active) {
                return true;
            }
        }

        return false;
    }
}