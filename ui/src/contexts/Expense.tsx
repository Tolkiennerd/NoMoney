import { Context, createContext } from "preact";
import { Dispatch } from "preact/hooks";

export interface Expense {
	name: string;
	amount: number;
	frequency: string;
};
interface ExpensesContextType {
	expenses: Expense[];
	setExpenses: Dispatch<Expense[]>;
}
export const ExpensesContext: Context<ExpensesContextType> = createContext({
	expenses: [],
	setExpenses: () => {}
});
