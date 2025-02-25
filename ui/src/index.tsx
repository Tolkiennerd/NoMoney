import { LocationProvider, Router, Route, hydrate, prerender as ssr } from 'preact-iso';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { NotFound } from './pages/_404';
import './style.css';
import { GetStarted } from './pages/GetStarted';
import { useState } from 'preact/hooks';
import { SalaryContext } from './contexts/Salary';
import { ExpensesContext } from './contexts/Expense';

export function App() {
	const [salary, setSalary] = useState(null);
	const [expenses, setExpenses] = useState([]);

	return (
		<LocationProvider>
			<Header />
			<main>
				<SalaryContext.Provider
					value={{salary: salary, setSalary: setSalary}}
				>
				<ExpensesContext.Provider 
					value={{expenses: expenses, setExpenses: setExpenses}}
				>
					<Router>
						<Route path="/" component={Home} />
						<Route path="/get-started" component={GetStarted} />
						<Route default component={NotFound} />
					</Router>
				</ExpensesContext.Provider>
				</SalaryContext.Provider>
			</main>
		</LocationProvider>
	);
}

if (typeof window !== 'undefined') {
	hydrate(<App />, document.getElementById('app'));
}

export async function prerender(data) {
	return await ssr(<App {...data} />);
}
