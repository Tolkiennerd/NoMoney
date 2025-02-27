import { useContext } from "preact/hooks";
import { getChildInput } from "../../scripts/elements";
import { Expense, ExpensesContext } from "../../contexts/Expense";
import { QuestionIndexContext } from "../../contexts/QuestionIndex";
import { formatName } from "../../scripts/strings";
import { ExpenseQuestionProps } from "./QuestionProps";
import { Question } from "./Question";
import { Frequency } from "../../components/Frequency";

export function ExpenseQuestion(props: ExpenseQuestionProps) {
    const { expenses, setExpenses } = useContext(ExpensesContext);
    const { questionIndex } = useContext(QuestionIndexContext);

    const getExpense = () => {
        const name = formatName(props.id);
        const expense = expenses.find(expense => expense.name === name);
        return expense?.amount ?? '';
    };
    const setExpense = () => {
        const inputElement = getChildInput(props.id, 2);
        const amount = Number(inputElement.value);

        const formattedName = formatName(props.id);
        const selectedFrequency = document
            .getElementsByClassName('frequency')[questionIndex - 2]
            .childNodes[0]
            .childNodes[1]
            .textContent;
        const expense: Expense = {
            name: formattedName,
            amount: amount,
            frequency: selectedFrequency
        };
        const expensesCopy = expenses.slice();
        const existingExpenseIndex = expensesCopy.findIndex(expense => {
            return expense.name === formattedName;
        });
        if (existingExpenseIndex === -1) {
            setExpenses([...expensesCopy, expense]);
        }
        else {
            expensesCopy[existingExpenseIndex] = expense;
            setExpenses([...expensesCopy]);
        }
    };

    const expenseName = formatName(props.id);
    const expense = expenses.filter(e => e.name === expenseName)[0];
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
            value={getExpense()}
            setValue={setExpense}
        ></Question>
    );
}
