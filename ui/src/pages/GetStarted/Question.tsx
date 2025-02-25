import { useLocation } from "preact-iso";
import { useContext } from "preact/hooks";
import { focusChildInput, getChildInput, setElementStyle } from "../../scripts/elements";
import { Expense, ExpensesContext } from "../../contexts/Expense";
import { SalaryContext } from "../../contexts/Salary";
import { QuestionIndexContext } from "../../contexts/QuestionIndex";
import { JSX } from "preact/jsx-runtime";
import { Frequency } from "../../components/Frequency";
import { formatName, spaceDashes } from "../../scripts/strings";

interface QuestionProps extends HowMuchQuestionProps {
    question: string | JSX.Element;
}
export function Question({id, question, back, next, frequency}: QuestionProps) {
	const location = useLocation();
	const { expenses, setExpenses } = useContext(ExpensesContext);
	const { salary, setSalary } = useContext(SalaryContext);
	const { questionIndex, setQuestionIndex } = useContext(QuestionIndexContext);

	const getValue = () => {
		if (id === 'salary') {
			return salary ?? '';
		}
		const name = formatName(id);
		const expense = expenses.find(expense => expense.name === name);
		return expense?.amount ?? '';
	};
	const onTextboxKeypress = (event: KeyboardEvent) => {
		if (event.code !== 'Enter') {
			return;
		}
		if (!next) {
			location.route('/');
			return;
		}
		// TODO: Figure out why this extra logic is needed. This should happen
		// in onDirectionClick().
		setQuestionIndex(questionIndex + 1);
		onDirectionClick(next);
	};
	const onBackClick = () => {
		onDirectionClick(back);
		setQuestionIndex(questionIndex - 1);
	};
	const nextText = (next === '') ? 'Submit' : '>';
	const onNextClick = () => {
		onDirectionClick(next);
		if (!next) {
			location.route('/');
			return;
		}
		setQuestionIndex(questionIndex + 1);
	};
	const onDirectionClick = (direction: string) => {
        setElementStyle(id, 'display', 'none');
		const inputElement = getChildInput(id, 2);
		const amount = Number(inputElement.value);

		if (direction) {
			setElementStyle(direction, 'display', 'block');
			focusChildInput(direction, 2);
	
			const displayStyle = (direction === 'entertainment') ? 'block' : 'none';
			setElementStyle('corner-pond', 'display', displayStyle);
		}

		if (id === 'salary') {
			setSalary(amount);
			return;
		}
		
		const selectedFrequency = document
			.getElementsByClassName('frequency')[questionIndex - 2]
			.childNodes[0]
			.childNodes[1]
			.textContent;
		const formattedName = formatName(id);
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

	return (
		<div class="question" id={id}>
			<p>{question}</p>
			<span>$</span>
			<input
				type="text" 
				autofocus 
				value={getValue()}
				onKeyPress={event => onTextboxKeypress(event)}
			></input>
			<div>
				{back ? <span onClick={onBackClick}>{'<'}</span> : null}
				<div>{questionIndex}/10</div>
				<span onClick={onNextClick}>{nextText}</span>
			</div>
		</div>
	);
}

interface HowMuchQuestionProps {
    id: string;
	back: string;
    next: string;
    frequency: string;
}
export function HowMuchQuestion(props: HowMuchQuestionProps) {
	const {expenses} = useContext(ExpensesContext);
	const expenseName = formatName(props.id);
	const expense = expenses.filter(e => e.name === expenseName)[0];
	const question = (
		<span>
			<span class="how-much">
				How much do you spend on {spaceDashes(props.id)} each
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
        <Question {...props} question={question}></Question>
    );
}
