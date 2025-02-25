import { Context, createContext } from 'preact';
import { Dispatch } from 'preact/hooks';

interface SalaryContextType {
	salary: number;
	setSalary: Dispatch<number>;
};
export const SalaryContext: Context<SalaryContextType> = createContext(null);
