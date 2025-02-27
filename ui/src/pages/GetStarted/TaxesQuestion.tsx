import { useContext, useState } from "preact/hooks";
import { TaxesQuestionProps } from "./QuestionProps";
import { Question } from "./Question";
import { FilingStatus, State, TaxesContext } from "../../contexts/Taxes";
import { FormControl, InputLabel, MenuItem, Select, Stack, Switch, Typography } from "@mui/material";

export function TaxesQuestion(props: TaxesQuestionProps) {
    const { taxes, setTaxes } = useContext(TaxesContext);
    const [filingStatus, setFilingStatus] = useState(FilingStatus.Single);
    const [state, setState] = useState(undefined);

    const statusInput = (
        <Stack
            className="inputControl status"
            direction="row" 
            spacing={1} 
            sx={{ alignItems: 'center' }}
        >
            <Typography>No</Typography>
            <Switch color="error" onChange={(event, checked) => {
                const status = checked ?
                    FilingStatus.Married : 
                    FilingStatus.Single;
                setFilingStatus(status);
            }}/>
            <Typography>Yes</Typography>
        </Stack>
    );
    const states = Object.entries(State).filter(([key, value]) => !isNaN(+key));
    const stateInput = (
        <FormControl
            color="error" 
            fullWidth 
            className="inputControl state"
        >
            <InputLabel>State</InputLabel>
            <Select
                label="State"
                onChange={(event, child: any) => {
                    const state = child.valueOf().props.value as State;
                    setState(state);
                }}
            >
                {states.map(([key, value]) => 
                    <MenuItem key={key} value={Number(key)}>{value}</MenuItem>
                )}
            </Select>
        </FormControl>
    )
    const map = {
        status: {
            question: 'Are you married?',
            input: statusInput,
            value: taxes?.filingStatus,
            setValue: () => setTaxes({...taxes, filingStatus: filingStatus})
        },
        state: {
            question: 'What state do you live in?',
            input: stateInput,
            value: taxes?.state,
            setValue: () => setTaxes({...taxes, state: state})
        }
    };
    const tax = map[props.id];
    
    return (
        <Question
            {...props} 
            question={tax.question}
            input={tax.input}
            value={tax.value}
            setValue={tax.setValue}
        ></Question>
    );
}
