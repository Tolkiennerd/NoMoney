import './style.css';
import { useContext } from 'preact/hooks';
import { ExpenseEntry } from './ExpenseEntry';
import { ExpensesContext } from '../../contexts/Expense';
import { SalaryContext } from '../../contexts/Salary';
import { calculateSavings, estimateTaxes } from '../../scripts/math';
import { TaxesContext } from '../../contexts/Taxes';

export function Home() {
	const { expenses } = useContext(ExpensesContext);
	const { salary, setSalary } = useContext(SalaryContext);
	const { taxes, setTaxes } = useContext(TaxesContext);

	return (
		<div class="home">
			<section>
				<div class="expense salary">
					<div>
						<h1 style={{marginBottom: 0}}>Salary</h1>
					</div>
					<div style={{flex: 1}}></div>
					<div>
						<span class="dinero">
							$
							<input 
								type="text" 
								value={salary}
								onChange={(event: any) => {
									setSalary(Number(event.target.value))
								}}
							/>
						</span>
						<span>per</span>
						<span>year</span>
					</div>
				</div>
				<h1>Expenses</h1>
				{expenses.map((expense) => 
					<ExpenseEntry expense={expense}></ExpenseEntry>
				)}
				<div class="expense salary">
					<div>
						<h1>Taxes</h1>
					</div>
					<div style={{flex: 1}}></div>
					<div>
						<span class="dinero">
							$ {estimateTaxes(salary, taxes)}
						</span>
						<span>per</span>
						<span>year</span>
					</div>
				</div>
				<div class="expense salary">
					<div>
						<h1>Savings</h1>
					</div>
					<div style={{flex: 1}}></div>
					<div>
						<span class="dinero">
							$ {calculateSavings(salary, expenses, taxes)}
						</span>
						<span>per</span>
						<span>year</span>
					</div>
				</div>
			</section>
			{expenses.some(expense => expense.frequency === 'day') ?
				<section>
					<h1>Daily Spending</h1>
					<div></div>
				</section>
				: null
			}
			{expenses.some(expense => expense.frequency === 'week') ?
				<section>
					<h1>Weekly Spending</h1>
					<div></div>
				</section>
				: null
			}
			{expenses.some(expense => expense.frequency === 'month') ?
				<section>
					<h1>Monthly Spending</h1>
					<div></div>
				</section>
				: null
			}
			{expenses.some(expense => expense.frequency === 'year') ?
				<section>
					<h1>Yearly Spending</h1>
					<div></div>
				</section>
				: null
			}
		</div>
	);
}
