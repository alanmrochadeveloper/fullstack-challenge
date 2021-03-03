import React from 'react';
import './Form.css';
import MetaInput from './MetaInput/MetaInput';
interface ICountry {
    name: string;
    translations: { br: string };
    flag: string;
    selected?: boolean;
}


const Form = ({ worldFlag, api, refreshTrips, trips }: any) => {
    const _worldFlag = worldFlag;
    const defaultCountryName = 'Selecione...';
    const [active, setActive] = React.useState<boolean>(true);
    const apiCountries = 'https://restcountries.eu/rest/v2/all';
    const [countries, setCountries] = React.useState<null | undefined | ICountry[]>([]);
    const [selectedCountry, setSelectedCountry] = React.useState<null | undefined | ICountry>({ name: 'none', translations: { br: defaultCountryName }, flag: _worldFlag, selected: false });
    const [localField, setLocalField] = React.useState<string>('');//Local
    const [goalField, setGoalField] = React.useState<string>('');//meta mês/ano
    const [errorMessage, setErrorMessage] = React.useState<string>('');
    const submitBtnText = 'Adicionar';
    React.useEffect(() => {
        const _getCountries = async () => {
            const response = await fetch(apiCountries);
            const json = await response.json();
            const _countries: ICountry[] = [];

            json?.map((country: ICountry) => {
                const _country = { name: country.name, translations: country.translations, flag: country.flag, selected: false }
                return _countries.push(_country);
            });
            setCountries(_countries);
        }
        _getCountries();
    }, [])

    function toggleDropDown(): void {
        setActive(!active);
    }
    const resetFields = () => {
        setSelectedCountry({ name: defaultCountryName, flag: _worldFlag, translations: { br: defaultCountryName }, selected: false });
        countries?.map((country) => {
            country.selected = false;
            return true;
        })
        setLocalField('');
        setGoalField('');
    }
    function handleClickSelectCountry(_country: ICountry): void {
        // const { name, translations, flag, selected } = _country;
        countries?.map((country) => {
            if (country.translations.br === _country.translations.br) country.selected = true;
            else country.selected = false;
            return true;
        })
        setSelectedCountry(_country)
        toggleDropDown();
    }

    const allFieldsValidated = (): boolean => {
        let isDuplicated = false;
        if (selectedCountry?.translations.br !== defaultCountryName && localField !== '' && goalField !== '' && !goalField.includes('_') && goalField.length > 1) {
            if (trips.length > 0) {
                trips.map((trip: any) => {
                    if (selectedCountry?.translations.br === trip.country) {
                        if (localField === trip.location) {
                            setErrorMessage(`Local no País ${selectedCountry?.translations.br} não pode ser repetido!`);
                            isDuplicated = true;
                        }
                    }
                });
            }
            return !isDuplicated? true: false;
        }
        else{
            return false;
        }
    }
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        // console.log('validation =  '+ allFieldsValidated())
        console.log('local field = ' + localField);
        if (allFieldsValidated()) {
            setErrorMessage('');
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ country: selectedCountry?.translations.br, location: localField, goal: goalField, countryUrl: selectedCountry?.flag })
            }
            const response = await fetch(api, requestOptions);
            if (response.status === 201) {
                await refreshTrips();
                resetFields();
            } // call it after async api request 
        }
        else {
            console.log('not validated');
        }

    }

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)} className="lg:flex">
                <div className="w-full lg:flex lg:mx-10">
                    <div className="w-full">
                        <label id="listbox-label" className="mx-10 text font-medium text-white w-full">
                            País
                    </label>
                        <div className="mt-1 relative mx-10 lg:mx-5">
                            <button id="btnToggle" onClick={() => toggleDropDown()} type="button" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label" className="w-full relative bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <span className="flex items-center">
                                    <img src={selectedCountry?.flag} className="flex-shrink-0 h-6 w-6 rounded-full" alt="flag" />
                                    <span className={`ml-3 block truncate text-gray-700`}>
                                        {selectedCountry?.translations.br}
                                    </span>
                                </span>
                                <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            </button>
                            <div className={`z-10 absolute mt-1 w-full rounded-md bg-white shadow-lg` + (active ? ` hidden` : ``)}>
                                <ul tabIndex={-1} role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-item-Brasil" className="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                    {countries?.map((country: ICountry) => {
                                        return (
                                            <li key={country.name} onClick={() => handleClickSelectCountry(country)} id={`listbox-item-${country.translations.br}`} role="option" className={`hover:text-white text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-gray-600`} aria-selected={selectedCountry?.translations.br === country.translations.br ? true : false}>
                                                <div className="flex items-center">
                                                    <img src={country.flag} alt={country.translations.br} title={country.translations.br} className="flex-shrink-0 h-6 w-6 rounded-full" />
                                                    <span className={`ml-3 block font-normal truncate  ${country.selected ? ' font-bold ' : ''}`}>
                                                        {country.translations.br}
                                                    </span>
                                                </div>
                                                {country.selected &&
                                                    <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                                                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                            <path fillRule={"evenodd"} d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule={"evenodd"} />
                                                        </svg>
                                                    </span>}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex">
                        <div className="w-full mx-10 lg:mx-5">
                            <label htmlFor="local" className="local mb-1 text font-medium text-white">Local</label>
                            <input type="text" className="w-full relative p-2 rounded-md text-gray-700" id="local" placeholder="Digite um local..." value={localField} onChange={({ target }) => setLocalField(target.value)} />
                            <small className={`${errorMessage? 'text-red-800':''}`}>{errorMessage !== ''? errorMessage: ''}</small>
                        </div>
                    </div>
                    <div className="w-full flex">
                        <div className="w-full mx-10 lg:mx-5">
                            <label htmlFor="Meta" className="w-full mb-1 text font-medium text-white">Meta</label>
                            <MetaInput goalField={goalField} setGoalField={setGoalField} />
                        </div>
                    </div>
                    <div className="w-full flex lg:w-2/3">
                        <button className="addBtn w-full mx-10 lg:mx-5 bg-green-800 text-white font-medium h-10 mt-7 rounded-md hover:bg-green-700" type="submit" >{submitBtnText}</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Form
