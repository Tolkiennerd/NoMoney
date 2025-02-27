import { useContext, useEffect, useState } from 'preact/hooks';
import { ExpensesContext } from '../contexts/Expense';

interface FrequencyProps {
    defaultFrequency: string;
    expenseName: string;
    amount: number;
};
export function Frequency({defaultFrequency, expenseName, amount}: FrequencyProps) {
	const { expenses, setExpenses } = useContext(ExpensesContext);
    const [frequency, setFrequency] = useState(defaultFrequency)
    const [showDropdown, setShowDropdown] = useState(false);
    const [arrowClass, setArrowClass] = useState('down');
    useEffect(() => {
        window.addEventListener('click', (event: any) => {
            const insideDropdown = (
                event.target?.classList?.contains('frequency') ||
                event.target?.parentElement?.classList?.contains('frequency') ||
                event.target?.parentElement?.parentElement?.classList?.contains('frequency')
            );
            if (!insideDropdown && !showDropdown) {
                setShowDropdown(false);
                setArrowClass('down');
            }
        });
    }, []);

    const selectOption = (frequency: string) => {
        setFrequency(frequency);
        if (!expenseName) {
            return;
        }
        const expenseIndex = expenses.findIndex(e => e.name === expenseName);
        const expensesCopy = expenses.slice();
        expensesCopy[expenseIndex] = {
            name: expenseName,
            amount: amount,
            frequency: frequency
        };
        setExpenses([...expensesCopy]);
    };
    const onClickFrequency = () => {
        const newClass = (arrowClass === 'up') ? 'down' : 'up';
        setArrowClass(newClass);
        setShowDropdown(!showDropdown)
    }

    return (
        <span class="frequency" onClick={onClickFrequency}>
            <div>
                <i className={'arrow ' + arrowClass}></i>
                <span>{frequency}</span>
            </div>
            {showDropdown ? 
                <div class="dropdown">
                    <div onClick={() => selectOption('year')}>year</div>
                    <div onClick={() => selectOption('month')}>month</div>
                    <div onClick={() => selectOption('two weeks')}>two weeks</div>
                    <div onClick={() => selectOption('week')}>week</div>
                    <div onClick={() => selectOption('day')}>day</div>
                </div>
                : null
            }
        </span>
    );
}
