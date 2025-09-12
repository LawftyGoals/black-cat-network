// banking-system.ts
import { gameInitialState } from "../state/game-state";
import { createNotification } from "../systems/notifications-system";
import { displayModalMessage } from "../ui";
import { Entity } from "../Entity";
import { resetGameFromTemplateState } from "../utils";

export let gameState = gameInitialState;

export function initBank() {
    if (gameInitialState.bank === null) {
        gameInitialState.bank = new Entity(
            "666", // id
            "bank", // type
            false, // inbonding
            "Golden Cauldron Rental & Usury", // name
            [], // knowns
            null, // relationship
            47, // age (e.g., ancient bank)
            false, // deceased
            "none", // sex (or another default)
            0, // value
            null, // color
            null, // species
            [], // traits
            [], // knownTraits
            "bank", // variant
            [], // effectingspells
            "Banker", // vocation
            "Capitalist" // approach
        );
    }
}

export function calculateWeeklyExpenses() {
    let expenseRates = new Map<string, number>([
        ["newspaper", 1],
        ["cat", 1],
        ["trap", 0],
        ["rent", 50],
    ]);
    // Retrieve expenses from gameState
    const { day, catInventory } = gameState;
    // Daily expenses
    const newspaper = expenseRates.get("newspaper");
    const catCount = Array.from(catInventory.values()).length;
    const trapCount = 1;
    const dailyExpenses =
        newspaper! +
        catCount * expenseRates.get("cat")! +
        trapCount * expenseRates.get("trap")!;
    // Weekly expenses
    const weeklyExpenses = expenseRates.get("rent")!;
    const theRentIsDue = day % 7 === 0; // Every 7 days

    // Update expenses in gameState
    gameState.expenses += dailyExpenses;
    if (theRentIsDue) {
        console.log(`The rent is due today!`);
        gameState.expenses += weeklyExpenses;
        console.log(`expenses after new rent = ${gameState.expenses}`);
    }

    // Return current accrued expenses for UI
    const expensesCountdown = 7 - (day % 7);

    // Return daily expenses and countdown to paying bills
    return {
        dailyExpenses,
        expensesCountdown,
    };
}

export function payBills(): boolean {
    const { gp, expenses } = gameState;

    if (gp >= expenses) {
        gameState.gp -= gameState.expenses;
        gameState.expenses = 0;
        createNotification(
            "You settle your debts.", // title
            "This week's rent and expenses are paid in full!", // content
            [], // knowns
            gameState.bank!, // from
            null, // reward
            null // spell
        );
        return true;
    } else {
        displayModalMessage(
            "You ran out of money, and the bank gets your home, stuff and even the cats. Game over."
        );
        setTimeout(() => {
            resetGameFromTemplateState();
        }, 5000);
        return false;
    }
}
