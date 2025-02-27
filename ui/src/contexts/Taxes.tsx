import { Context, createContext } from "preact";
import { Dispatch } from "preact/hooks";


export const defaultFederalTaxBrackets = {
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
export enum State
{
    AL,
    AK,
    AZ,
    AR,
    CA,
    CO,
    CT,
    DC,
    DE,
    FL,
    GA,
    HI,
    ID,
    IL,
    IN,
    IA,
    KS,
    KT,
    LA,
    ME,
    MD,
    MA,
    MI,
    MN,
    MS,
    MO,
    MT,
    NE,
    NV,
    NH,
    NJ,
    NM,
    NC,
    ND,
    NY,
    OH,
    OK,
    OR,
    PA,
    RI,
    SC,
    SD,
    TN,
    TX,
    UT,
    VT,
    VA,
    WA,
    WV,
    WI,
    WY
};
export const defaultStateTaxRates: {[key in State]: number} = {
    [State.AL]: 0.04,
    [State.AK]: 0,
    [State.AZ]: 0.025,
    [State.AR]: 0.03,
    [State.CA]: 0.07,
    [State.CO]: 0.0425,
    [State.CT]: 0.05,
    [State.DE]: 0.05,
    [State.DC]: 0.07,
    [State.FL]: 0,
    [State.GA]: 0.0549,
    [State.HI]: 0.06,
    [State.ID]: 0.058,
    [State.IL]: 0.0495,
    [State.IN]: 0.0305,
    [State.IA]: 0.05,
    [State.KS]: 0.04,
    [State.KT]: 0.04,
    [State.LA]: 0.03,
    [State.ME]: 0.058,
    [State.MD]: 0.04,
    [State.MA]: 0.05,
    [State.MI]: 0.0425,
    [State.MN]: 0.07,
    [State.MS]: 0.047,
    [State.MO]: 0.035,
    [State.MT]: 0.059,
    [State.NE]: 0.04,
    [State.NV]: 0,
    [State.NH]: 0,
    [State.NJ]: 0.06,
    [State.NM]: 0.035,
    [State.NY]: 0.075,
    [State.NC]: 0.045,
    [State.ND]: 0.02,
    [State.OH]: 0.03,
    [State.OK]: 0.04,
    [State.OR]: 0.07,
    [State.PA]: 0.0307,
    [State.RI]: 0.05,
    [State.SC]: 0.04,
    [State.SD]: 0,
    [State.TN]: 0,
    [State.TX]: 0,
    [State.UT]: 0.0465,
    [State.VT]: 0.06,
    [State.VA]: 0.04,
    [State.WA]: 0,
    [State.WV]: 0.04,
    [State.WI]: 0.05,
    [State.WY]: 0
};
export enum FilingStatus {
    Single,
    Married
};
export interface Taxes {
    filingStatus: FilingStatus;
    state: State,
    stateTaxRate?: number;
    stateDeduction?: number;
    federalDeduction?: number;
}
interface TaxesContextType {
    taxes: Taxes;
    setTaxes: Dispatch<Taxes>;
}
export const TaxesContext: Context<TaxesContextType> = createContext({
    taxes: {
        filingStatus: undefined,
        state: undefined
    } as Taxes,
    setTaxes: () => {}
});
