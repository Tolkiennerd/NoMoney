import { Context, createContext } from "preact";
import { Dispatch } from "preact/hooks";
import { FilingStatus } from "../scripts/math";

interface TaxesContextType {
    filingStatus: FilingStatus;
    federalTaxRate: number;
    setFederalTaxRate: Dispatch<number>;
    federalDeduction: number;
    setFederalDeduction: Dispatch<number>;
    stateTaxRate: number;
    setStateTaxRate: Dispatch<number>;
    stateDeduction: number;
    setStateDeduction: Dispatch<number>;
}
export const TaxesContext: Context<TaxesContextType> = createContext({
    filingStatus: FilingStatus.Single,
    federalTaxRate: 0,
    setFederalTaxRate: () => {},
    federalDeduction: 0,
    setFederalDeduction: () => {},
    stateTaxRate: 0,
    setStateTaxRate: () => {},
    stateDeduction: 0,
    setStateDeduction: () => {}
});
