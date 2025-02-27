import { spaceDashes } from "../../scripts/strings";
import { HowMuchQuestionProps } from "./QuestionProps";
import { ExpenseQuestion } from "./ExpenseQuestion";

export function HowMuchQuestion(props: HowMuchQuestionProps) {
	const question = `How much do you spend on ${spaceDashes(props.id)} each`;
	return (
        <ExpenseQuestion {...props} question={question}></ExpenseQuestion>
    );
}
