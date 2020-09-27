/*
3 missionaries, 3 canibals
variant on wolf, goat and cabbage problem

- one side of the river, 1 boat with capacity of 2
- the boat needs a driver
- we have 3 missionaries and 3 canibals
- the goal is to transport everyone to the other side

- if ever there are more canibals than missionaries on either side, 
then the canibals eat the missionaires
*/

enum StateType {
    GoodState,
    BadState,
    GoalState,
    InvalidState
}

// State of the puzzle, rerpesented by the originating riverbank
class State {
    constructor(private hasBoat: boolean = true,
        private missionaries: number = 3,
        private canibals: number = 3) { };

    compare(s: State): boolean {
        return s.canibals == this.canibals
            && s.hasBoat == this.hasBoat
            && s.missionaries == this.missionaries;
    }

    clone(): State {
        return new State(this.hasBoat, this.missionaries, this.canibals);
    }

    transport(numMissionaries: number, numCanibals: number): StateType {
        if (numCanibals + numMissionaries > 2 ||
            (numCanibals == 0 && numMissionaries == 0))
            return StateType.InvalidState;
        if (this.hasBoat && (numMissionaries > this.missionaries || numCanibals > this.canibals))
            return StateType.InvalidState;
        if (!this.hasBoat && (numMissionaries > 3 - this.missionaries || numCanibals > 3 - this.canibals))
            return StateType.InvalidState;

        if (this.hasBoat) {
            this.missionaries -= numMissionaries;
            this.canibals -= numCanibals;
        } else {
            this.missionaries += numMissionaries;
            this.canibals += numCanibals;
        }
        this.hasBoat = !this.hasBoat;

        if (!this.hasBoat && this.missionaries == 0 && this.canibals == 0)
            return StateType.GoalState;

        if (this.missionaries != 0 && this.missionaries < this.canibals)
            return StateType.BadState;
        if (3 - this.missionaries != 0 && 3 - this.missionaries < 3 - this.canibals)
            return StateType.BadState;

        return StateType.GoodState;
    }

    private static bankStateString(missionaries: number, canibals: number): string {
        const m = "😇";
        const c = "🦴";
        let s = "";
        for (let i = 0; i < missionaries; i++) {
            s += m;
        }
        for (let i = 0; i < 3 - missionaries; i++) {
            s += "🌳";
        }
        s += " ";
        for (let i = 0; i < canibals; i++) {
            s += c;
        }
        for (let i = 0; i < 3 - canibals; i++) {
            s += "🌳";
        }

        return s;
    }

    private static waterStateString(boat: boolean): string {
        let s = "";
        const w = "🌊";
        const b = "⛵";
        if (boat) {
            s += b;
        } else {
            s += w;
        }
        s += w + w + w;
        if (!boat) {
            s += b;
        } else {
            s += w;
        }
        return s;
    }

    toString(): string {
        let s = "";
        s += State.bankStateString(this.missionaries, this.canibals);
        s += " 🌾 ";
        s += State.waterStateString(this.hasBoat);
        s += " 🌾 ";
        s += State.bankStateString(3 - this.missionaries, 3 - this.canibals);
        return s;
    }
}

function tryState(stack: Array<State>, state: State, numMissionaries: number, numCanibals: number) {
    let localState = state.clone();
    switch (localState.transport(numMissionaries, numCanibals)) {
        case StateType.GoodState:
            // check if visited
            if (stack.find((s: State) => {
                return s.compare(localState);
            }) == undefined) {
                stack.push(localState);
                dfs(stack, localState);
            }
            break;
        case StateType.GoalState:
            for (let i = 0; i < stack.length; i++) {
                console.log(stack[i].toString());
            }
            console.log(localState.toString());
            console.log("💤💤💤💤💤💤💤💤💤💤💤💤💤💤💤💤");
            break;
    }
}

function dfs(stack: Array<State>, state: State) {
    let localState = state.clone();
    tryState(stack, localState, 1, 0);
    tryState(stack, localState, 2, 0);
    tryState(stack, localState, 0, 1);
    tryState(stack, localState, 0, 2);
    tryState(stack, localState, 1, 1);
    stack.pop();
}

export function solveMissionaryProblem() {
    let stack = new Array<State>();
    let state = new State();
    stack.push(state);
    dfs(stack, state);
}