import { Context, createContext } from "preact";
import { Dispatch } from "preact/hooks";

export interface Deduction {
    name: string;
    amount: number;
    frequency?: string;
    percentOfSalary?: number;
}
interface DeductionsContextType {
    deductions: Deduction[];
    setDeductions: Dispatch<Deduction[]>;
};
export const DeductionsContext: Context<DeductionsContextType> = createContext({
    deductions: [],
    setDeductions: () => {}
});
