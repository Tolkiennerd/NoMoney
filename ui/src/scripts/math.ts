import { Expense } from "../contexts/Expense";

export const calculateSavings = (salary: number, expenses: Expense[]): number => {
    let totalExpenses = 0;
    expenses.forEach(expense => {
        let multiplier = 1;
        if (expense.frequency === 'month') {
            multiplier = 12;
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
    return salary - totalExpenses;
};

export enum FilingStatus {
    Single,
    Married
};
export const estimateTaxes = (salary: number, state: string, filingStatus: FilingStatus) => {
    // TODO: Consider using an API for this, like API ninjas:
    // https://api-ninjas.com/api/incometaxcalculator.
    const federalTaxBrackets = {
        single : {
            0: 0.1,
            11601: .12,
            47151: 0.22,
            100526: 0.24,
            191951: 0.32,
            243726: 0.35,
            609726: 0.37,
        },
        married : {
            0: 0.1,
            23200: 0.12,
            94300: 0.22,
            201050: 0.24,
            383900: 0.32,
            487451: 0.35,
            731201: 0.37
        }
    };
    // TODO: Update these estimates, or use an API like suggested above.
    const stateTaxRates = {
        'AL': 0.04,
        'AK': 0,
        'AZ': 0.025,
        'AR': 0.03,
        'CA': 0.07,
        'CO': 0.0425,
        'CT': 0.05,
        'DE': 0.05,
        'DC': 0.07,
        'FL': 0,
        'GA': 0.0549,
        'HI': 0.06,
        'ID': 0.058,
        'IL': 0.0495,
        'IN': 0.0305,
        'IO': 0.05,
        'KS': 0.04,
        'KT': 0.04,
        'LA': 0.03,
        'ME': 0.058,
        'MD': 0.04,
        'MA': 0.05,
        'MI': 0.0425,
        'MN': 0.07,
        'MS': 0.047,
        'MO': 0.035,
        'MT': 0.059,
        'NE': 0.04,
        'NV': 0,
        'NH': 0,
        'NJ': 0.06,
        'NM': 0.035,
        'NY': 0.075,
        'NC': 0.045,
        'ND': 0.02,
        'OH': 0.03,
        'OK': 0.04,
        'OR': 0.07,
        'PA': 0.0307,
        'RH': 0.05,
        'SC': 0.04,
        'SD': 0,
        'TN': 0,
        'TX': 0,
        'UT': 0.0465,
        'VT': 0.06,
        'VA': 0.04,
        'WA': 0,
        'WV': 0.04,
        'WI': 0.05,
        'WY': 0
    };

    // Federal tax.
    var federalTax = 0;
    var taxRate = 0.1;
    var remainingTaxableIncome = salary;
    const filingStatusKey = filingStatus === FilingStatus.Married ? 
        'married' : 
        'single';
    const taxBracketRates = federalTaxBrackets[filingStatusKey];
    const taxBrackets = Object.keys(taxBracketRates)
        .map(r => Number(r))
        .filter(r => r <= salary);
    taxBrackets.forEach((taxBracket) => {
        if (taxBracket === 0) {
            return;
        }

        const taxedAmount = Math.min(remainingTaxableIncome, taxBracket);
        const tax = taxedAmount * taxRate;
        remainingTaxableIncome -= tax;
        
        taxRate = taxBracketRates[taxBracket];
    });

    // State tax.
    const stateTaxRate = stateTaxRates[state];
    const stateTax = salary * stateTaxRate;

    return federalTax + stateTax;
};
