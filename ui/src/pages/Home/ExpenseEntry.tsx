import { useContext } from "preact/hooks";
import { Frequency } from "../../components/Frequency";
import { Expense, ExpensesContext } from "../../contexts/Expense";
import { formatName } from "../../scripts/strings";

export function ExpenseEntry({expense}: {expense: Expense}) {
	const { expenses, setExpenses } = useContext(ExpensesContext);

	const onExpenseClick = () => {
		if (expense.name === 'Entertainment') {
			alert("💧 If you save the child, you'll be late for work and ruin your shoes.");
		}
	}
	const onExpenseChange = (event: any) => {
		expense.amount = Number(event.target.value);
		const expensesCopy = expenses.slice();
		const existingExpenseIndex = expensesCopy.findIndex(index => {
			return index.name === formatName(expense.name);
		});
		if (existingExpenseIndex === -1) {
			return;
		}
		
		expensesCopy[existingExpenseIndex] = expense;
		setExpenses([...expensesCopy]);
	};

	return (
		<div class="expense">
			<div 
				onClick={onExpenseClick} 
				style={expense.name === 'Entertainment' ? {cursor: 'pointer'} : {}}
			>
				{expense.name}
			</div>
			<div style={{flex: 1}}></div>
			<div>
				<span class="dinero">
					$
					<input 
						type="text" 
						value={expense.amount}
						onChange={(event) => onExpenseChange(event)}
					/>
				</span>
				<span>per</span>
				<Frequency
					defaultFrequency={expense.frequency} 
					expenseName={expense.name} 
					amount={expense.amount}
				></Frequency>
			</div>
		</div>
	);
}
