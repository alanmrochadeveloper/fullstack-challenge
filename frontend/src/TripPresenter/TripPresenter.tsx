import React from "react";
import FormRow from "../FormRow/FormRow";
import TitleRow from "../TitleRow/TitleRow";
import TripRows from "../TripRows/TripRows";

const TripPresenter = (props: any) => {
    const { api, logoSVG, worldFlag } = props;
    const [trips, setTrips] = React.useState<[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    React.useEffect(() => {
        const _getTrips = async () => {
            setIsLoading(true);
            const result = await fetch(`${api}`);
            const json = await result.json();
            setTrips(json);
            setIsLoading(false);
        }
        _getTrips();
    }, [api]);

    const refreshTrips = async () => {
        const _getTrips = async () => {
            setIsLoading(true);
            const result = await fetch(`${api}`);
            const json = await result.json();
            setTrips(json);
            setIsLoading(false);
        }
        _getTrips();
    }
    return (
        <>
            <div className="flex flex-wrap content-center">
                <TitleRow logoSVG={logoSVG} />
                <FormRow worldFlag={worldFlag} api={api} refreshTrips={refreshTrips} trips={trips} />
                <TripRows trips={trips} isLoading={isLoading} api={api} refreshTrips={refreshTrips} />
            </div>
        </>
    )
}

export default TripPresenter
