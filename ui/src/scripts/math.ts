import { Deduction } from "../contexts/Deductions";
import { Expense } from "../contexts/Expense";
import { defaultFederalTaxBrackets, defaultStateTaxRates, FilingStatus, Taxes } from "../contexts/Taxes";

export const getTotalExpenses = (expenses: Expense[]): number => {
    let totalExpenses = 0;
    expenses.forEach(expense => {
        let multiplier = 1;
        if (expense.frequency === 'month') {
            multiplier = 12;
        }
        else if (expense.frequency === 'two weeks') {
            multiplier = 26;
        }
        else if (expense.frequency === 'week') {
            multiplier = 52;
        }
        else if (expense.frequency === 'day') {
            multiplier = 365;
        }
        const yearlyAmount = expense.amount * multiplier;
        totalExpenses += yearlyAmount;
    });
    return totalExpenses;
}

export const getTotalDeductions = (deductions: Deduction[]): number => {
    let totalDeductions = 0;
    deductions.forEach(deduction => {
        let multiplier = 1;
        if (deduction.frequency === 'month') {
            multiplier = 12;
        }
        else if (deduction.frequency === 'two weeks') {
            multiplier = 26;
        }
        else if (deduction.frequency === 'week') {
            multiplier = 52;
        }
        else if (deduction.frequency === 'day') {
            multiplier = 365;
        }
        const yearlyAmount = deduction.amount * multiplier;
        totalDeductions += yearlyAmount;
    });
    return totalDeductions;
}

export const calculateSavings = (
    salary: number, 
    expenses: Expense[],
    deductions: Deduction[],
    taxes: Taxes): number => {
    const totalExpenses = getTotalExpenses(expenses);
    const totalDeductions = getTotalDeductions(deductions);
    const totalTaxes = estimateTaxes(salary, taxes);
    return salary - totalExpenses - totalDeductions - totalTaxes;
};

export const estimateTaxes = (salary: number, taxes: Taxes): number => {
    if (!taxes || taxes.filingStatus === undefined || taxes.state == undefined) {
        return 0;
    }

    // TODO: Consider using an API for this, like API ninjas:
    // https://api-ninjas.com/api/incometaxcalculator.
    var federalTax = 0;
    var taxRate = 0.1;
    var remainingTaxableIncome = salary;
    const filingStatusKey = taxes.filingStatus === FilingStatus.Married ? 
        'married' : 
        'single';
    const taxBracketRates = defaultFederalTaxBrackets[filingStatusKey];
    const taxBrackets = Object.keys(taxBracketRates)
        .map(r => Number(r))
        .filter(r => r <= salary);
    taxBrackets.forEach((taxBracket) => {
        if (taxBracket === 0) {
            return;
        }

        const taxedAmount = Math.min(remainingTaxableIncome, taxBracket);
        const tax = taxedAmount * taxRate;
        federalTax += tax;
        remainingTaxableIncome -= taxedAmount;
        taxRate = taxBracketRates[taxBracket];
    });
    federalTax -= taxes.federalDeduction ?? 0;

    const stateTaxRate = taxes.stateTaxRate ?
        taxes.stateTaxRate :
        defaultStateTaxRates[taxes?.state ?? 0];
    const stateTax = (salary * stateTaxRate) - (taxes.stateDeduction ?? 0);

    return Math.round(federalTax + stateTax);
};
