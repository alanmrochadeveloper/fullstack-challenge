import React from 'react';
import InputMask from 'react-input-mask';

const MetaInput = ({ goalField, setGoalField }: any) => {
    const verifyYear = (value: any): void => {
        const year = Number(value.substr(3, value.length));
        const currentYear = new Date().getFullYear();
        let month = value.substr(0, 2);
        if (month.includes('_')) month = new Date().getMonth() + 1;
        if (value[3] !== '_' && value[4] !== '_' && value[5] !== '_' && value[value.length - 1] !== '_') {
            if (year <= currentYear) {
                setGoalField(`${month}/${currentYear}`);
            }
        }
    }
    const verifyMonth = (value: any): void => {
        if (value[0] !== '_' && value[1] !== '_') {
            const month = Number(value.substr(0, 2));
            let currentMonth = String(new Date().getMonth() + 1);
            const year = Number(value.substr(3, value.length - 1));
            if (month < Number(currentMonth)) {
                if (String(currentMonth).length < 2) {
                    currentMonth = ('0' + currentMonth);
                }
                value = `${currentMonth}/${year}`;
                setGoalField(value);
            }
        }
    }
    const handleChange = (e: any) => {
        const value = e.target.value;
        if (value[0] <= 1) {
            setGoalField(value);
            if (value[0] === '0' || value[1] === '_') {
                if (value[1] !== '0') setGoalField(value);
                else setGoalField('01');
                verifyYear(value);
            }
            else if (value[0] === '1' || value[1] === '_') {
                if (value[1] <= 2) {
                    setGoalField(value);
                }
                else setGoalField('12')
                verifyYear(value);
            }
        }
        else if (value[0] === '_' && value[1] === '_') {
            setGoalField('');
        }
        else if (value[0] !== '_' && value[1] === '_') {
            setGoalField('1');
        }
        verifyMonth(value);

    }
    const handleBlur = () => {
        const currentYear = new Date().getFullYear();
        let currentMonth = String(new Date().getMonth() + 1);
        if (currentMonth.length < 2) {
            currentMonth = '0' + currentMonth;
        }
        if (!goalField[0]) {
            setGoalField('');
        }
        if (goalField.includes('_') === true) {
            setGoalField(`${currentMonth}/${currentYear}`);
        }

    }

    return (
        <InputMask className="w-full p-2 rounded-md text text-gray-600" id="Meta" placeholder="Mês/Ano" mask="99/9999" value={goalField} onChange={(e) => handleChange(e)} onBlur={() => handleBlur()} />
    )
}

export default MetaInput


