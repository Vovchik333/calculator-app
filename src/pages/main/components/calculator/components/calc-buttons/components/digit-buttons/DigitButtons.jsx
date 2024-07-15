import { Button } from "../../../../../../../../components/components";
import { digitButtons } from "../../data/data";
import './DigitButtons.scss';

const DigitButtons = ({
    onSetNumber
}) => {
    return (
        <section className="calc-buttons__digits">
            {digitButtons.map(btn => {
                return (
                    <Button 
                        id={btn.id}
                        key={btn.id}
                        className={'button calc-buttons__digit'}
                        value={btn.value}
                        onClick={onSetNumber}
                    >{btn.value}</Button>
                );
            })}
            <Button 
                id='zero'
                className="button calc-buttons__digit calc-buttons__zero-button"
                value={'0'}
                onClick={onSetNumber}
            >0</Button>
            <Button 
                id='decimal'
                className='button calc-buttons__digit'
                value={'.'}
                onClick={onSetNumber}
            >.</Button>
        </section>
    );
};

export { DigitButtons };
