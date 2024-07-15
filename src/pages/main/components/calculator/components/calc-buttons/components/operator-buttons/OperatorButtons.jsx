import { Button } from "../../../../../../../../components/components";
import { operatorButtons } from "../../data/data";
import { calculateResult } from "./helpers/helpers";
import './OperatorButtons.scss';

const OperatorButtons = ({
    formula,
    onSetOperator,
    onChangeDisplay,
    onCalculateFormula
}) => {
    const handleEquals = () => {
        const result = calculateResult(formula);
        onChangeDisplay({ 
            formula: `= ${result}`, 
            output: `${result}` 
        });
        onCalculateFormula(result);
    };

    return (
        <section className="calc-buttons__operators">
            {operatorButtons.map(btn => {
                return (
                    <Button 
                        id={btn.id}
                        key={btn.id}
                        className='button calc-buttons__operator'
                        onClick={onSetOperator}
                        value={btn.value}
                    >{btn.value}</Button>
                );
            })}
            <Button
                id='equals'
                className='button calc-buttons__operator'
                onClick={handleEquals}
                value={'='}
            >=</Button>
        </section>
    );
}
 
export { OperatorButtons };
