import { useContext, useEffect, useState } from 'preact/hooks';
import { Question } from './Question';
import { focusChildInput, setElementStyle } from '../../scripts/elements';
import './style.css'
import { QuestionIndexContext } from '../../contexts/QuestionIndex';
import { useLocation } from 'preact-iso';
import { HowMuchQuestion } from './HowMuchQuestion';
import { ExpenseQuestion } from './ExpenseQuestion';
import { SalaryContext } from '../../contexts/Salary';
import { TaxesQuestion } from './TaxesQuestion';

export function GetStarted() {
	const [questionIndex, setQuestionIndex] = useState(1);
	const { salary, setSalary } = useContext(SalaryContext);
	const location = useLocation();
	useEffect(() => {
		setTimeout(clearPondMessage, 5000);
	}, []);

	const clearPondMessage = () => {
		setElementStyle('pond', 'display', 'none');
		setElementStyle('salary', 'display', 'block');
		focusChildInput('salary', 2);
	};
	const onCornerPondClick = () => {
		setElementStyle('drowning-child', 'display', 'inline');
	};
    const onCloseClick = () => location.route('/');

	return (
		<div class="get-started">
			<QuestionIndexContext.Provider 
                value={{
                    questionIndex: questionIndex, 
                    setQuestionIndex: setQuestionIndex
                }}
            >
                <div onClick={onCloseClick} class="close">X</div>
				<div id="pond">
                    <span>On your way to work, you</span>
                    <span> pass a small pond. 💧</span>
                </div>
				<Question 
					id="salary"
					question="What's your annual salary?"
					back=""
					next="housing"
					value={salary}
					setAmount={setSalary}
				></Question>
				<HowMuchQuestion 
					id="housing"
					back="salary"
					next="food"
					frequency="month"
				></HowMuchQuestion>
				<HowMuchQuestion 
					id="food"
					back="housing"
					next="transportation"
					frequency="week"
				></HowMuchQuestion>
				<HowMuchQuestion 
					id="transportation"
					back="food"
					next="entertainment"
					frequency="week"
				></HowMuchQuestion>
				<HowMuchQuestion 
					id="entertainment"
					back="transportation"
					next="household-items"
					frequency="week"
				></HowMuchQuestion>
				<HowMuchQuestion 
					id="household-items"
					back="entertainment"
					next="clothes"
					frequency="week"
				></HowMuchQuestion>
				<HowMuchQuestion 
					id="clothes"
					back="household-items"
					next="insurance"
					frequency="month"
				></HowMuchQuestion>
				<HowMuchQuestion 
					id="insurance"
					back="clothes"
					next="technology"
					frequency="month"
				></HowMuchQuestion>
				<HowMuchQuestion 
					id="technology"
					back="insurance"
					next="extra"
					frequency="month"
				></HowMuchQuestion>
				<ExpenseQuestion 
					id="extra"
					question="How much do you want to have available for extra spending"
					back="technology"
					next="status"
					frequency="year"
				></ExpenseQuestion>
				<TaxesQuestion 
					id="status"
					back="extra"
					next="state"
				></TaxesQuestion>
				<TaxesQuestion 
					id="state"
					back="status"
					next=""
				></TaxesQuestion>
				<div id="corner-pond">
					<span onClick={onCornerPondClick}>💧</span>
					<span id="drowning-child">
                        In the pond, a child is drowning.
                    </span>
				</div>
			</QuestionIndexContext.Provider>
		</div>
	);
}
