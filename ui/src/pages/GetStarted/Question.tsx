import { useLocation } from "preact-iso";
import { useContext } from "preact/hooks";
import { focusChildInput, getChildInput, setElementStyle } from "../../scripts/elements";
import { QuestionIndexContext } from "../../contexts/QuestionIndex";
import { QuestionProps } from "./QuestionProps";
import { TaxesContext } from "../../contexts/Taxes";

export function Question(props: QuestionProps) {
	const location = useLocation();
	const { questionIndex, setQuestionIndex } = useContext(QuestionIndexContext);
	const { taxes } = useContext(TaxesContext);
	const nextText = (props.next === '') ? 'Submit' : '>';

	const onTextboxKeypress = (event: KeyboardEvent) => {
		if (event.code !== 'Enter') {
			return;
		}
		if (!props.next) {
			location.route('/');
			return;
		}
		onDirectionClick(props.next);
		setQuestionIndex(questionIndex + 1);
	};
	const onBackClick = () => {
		onDirectionClick(props.back);
		setQuestionIndex(questionIndex - 1);
	};
	const onNextClick = () => {
		onDirectionClick(props.next);
		setQuestionIndex(questionIndex + 1);
	};
	const onDirectionClick = (direction: string) => {
		if (props.setValue) {
			props.setValue();
		}

		if (props.setAmount) {
			const inputElement = getChildInput(props.id, 2);
			const amount = Number(inputElement.value);
			props.setAmount(amount);
		}

		if (!props.next) {
			if (taxes.state !== undefined) {
				location.route('/');
			}
			return;
		}

        setElementStyle(props.id, 'display', 'none');
		if (!direction) {
			return;
		}

		setElementStyle(direction, 'display', 'block');
		focusChildInput(direction, 2);

		const pondStyle = (direction === 'entertainment') ? 'block' : 'none';
		setElementStyle('corner-pond', 'display', pondStyle);
	};

	return (
		<div class="question" id={props.id}>
			<p>{props.question}</p>
			{props.input ? null : <span>$</span>}
			{props.input ?
				props.input :
				<input
					type="text" 
					class="inputControl"
					autofocus 
					value={props.value}
					onKeyPress={event => onTextboxKeypress(event)}
				></input>
			}
			<div class="pagination">
				{props.back ? <span onClick={onBackClick}>{'<'}</span> : null}
				<div>{questionIndex}/15</div>
				<span onClick={onNextClick}>{nextText}</span>
			</div>
		</div>
	);
}
