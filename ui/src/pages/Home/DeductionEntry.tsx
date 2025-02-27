import { useContext } from "preact/hooks";
import { Frequency } from "../../components/Frequency";
import { Deduction, DeductionsContext } from "../../contexts/Deductions";
import { formatName } from "../../scripts/strings";

export function DeductionEntry({deduction}: {deduction: Deduction}) {
	const { deductions, setDeductions } = useContext(DeductionsContext);

	const onDeductionChange = (event: any) => {
		deduction.amount = Number(event.target.value);
		const deductionsCopy = deductions.slice();
		const existingDeductionIndex = deductionsCopy.findIndex(index => {
			return index.name === formatName(deduction.name);
		});
		if (existingDeductionIndex === -1) {
			return;
		}
		
		deductionsCopy[existingDeductionIndex] = deduction;
		setDeductions([...deductionsCopy]);
	};

	return (
		<div class="expense">
			<div>{deduction.name}</div>
			<div style={{flex: 1}}></div>
			<div>
				<span class="dinero">
					$
					<input 
						type="text" 
						value={deduction.amount}
						onChange={(event) => onDeductionChange(event)}
					/>
				</span>
				<span>per</span>
				<Frequency
					defaultFrequency={deduction.frequency} 
					expenseName={deduction.name} 
					amount={deduction.amount}
				></Frequency>
			</div>
		</div>
	);
}
