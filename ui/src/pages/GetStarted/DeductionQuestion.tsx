import { useContext } from "preact/hooks";
import { getChildInput } from "../../scripts/elements";
import { QuestionIndexContext } from "../../contexts/QuestionIndex";
import { formatName } from "../../scripts/strings";
import { DeductionQuestionProps } from "./QuestionProps";
import { Question } from "./Question";
import { Frequency } from "../../components/Frequency";
import { Deduction, DeductionsContext } from "../../contexts/Deductions";

export function DeductionQuestion(props: DeductionQuestionProps) {
    const { deductions, setDeductions } = useContext(DeductionsContext);
    const { questionIndex } = useContext(QuestionIndexContext);

    const getDeduction = () => {
        const name = formatName(props.id);
        const deduction = deductions.find(deduction => deduction.name === name);
        return deduction?.amount ?? '';
    };
    const setDeduction = () => {
        const inputElement = getChildInput(props.id, 2);
        const amount = Number(inputElement.value);

        const formattedName = formatName(props.id);
        const selectedFrequency = document
            .getElementsByClassName('frequency')[questionIndex - 2]
            ?.childNodes[0]
            ?.childNodes[1]
            ?.textContent;
        const deduction: Deduction = {
            name: formattedName,
            amount: amount,
            frequency: selectedFrequency
        };
        const deductionsCopy = deductions.slice();
        const existingDeductionIndex = deductionsCopy.findIndex(deduction => {
            return deduction.name === formattedName;
        });
        if (existingDeductionIndex === -1) {
            setDeductions([...deductionsCopy, deduction]);
        }
        else {
            deductionsCopy[existingDeductionIndex] = deduction;
            setDeductions([...deductionsCopy]);
        }
    };

    const deductionName = formatName(props.id);
    const expense = deductions.filter(d => d.name === deductionName)[0];
    const question = (
        <span>
            <span class="how-much">
                {props.question}
            </span>
            <Frequency 
                defaultFrequency={props.frequency}
                expenseName={expense?.name ?? ''}
                amount={expense?.amount ?? 0}
            ></Frequency>
            <span>?</span>
        </span>
    );
    return (
        <Question
            {...props} 
            question={question} 
            value={getDeduction()}
            setValue={setDeduction}
        ></Question>
    );
}
