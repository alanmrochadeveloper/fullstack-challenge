import React from "react";
import InputMask from "react-input-mask";

const TripRows = (props: { trips: any; isLoading: boolean; api: string; refreshTrips: () => void }) => {
  const { trips, isLoading, api, refreshTrips } = props;
  const [isEditMode, setIsEditMode] = React.useState<boolean>(false);
  const [editId, setEditId] = React.useState<Number>(0);
  React.useEffect(() => {
    // console.log('info =  '+trips[0].country);
  }, []);

  const handleClickDelete = async (id: Number): Promise<void> => {
    const deleteApi = `${api}/${id}`;
    const confirmDelete = window.confirm("Deseja realmente deletar?");
    if (confirmDelete) {
      await fetch(deleteApi, { method: 'DELETE' });
      refreshTrips();
    }

  }

  const handleClickEdit = (id: Number) => {
    setIsEditMode(true);
    setEditId(id);
    const editLocation1 = document.getElementById(`editLocation${1}`);
    const editLocation = document.getElementById(`editLocation${id}`);
    (editLocation1 as HTMLInputElement).focus();
    (editLocation as HTMLInputElement).focus();
  }
  const handleClickConfirm = async (id: Number): Promise<void> => {

    const inputLocationElement = document.getElementById(`editLocation${id}`);
    const inputGoalElement = document.getElementById(`editGoal${id}`);
    const _location = (inputLocationElement as HTMLInputElement)?.value;
    const _goal = (inputGoalElement as HTMLInputElement)?.value;
    const editApi = `${api}/${id}`;
    const requestOptions = {
      method: 'PATCH',
      headers: { "Content-type": "application/json" }, body: JSON.stringify({ location: _location, goal: _goal }),
    }
    const response = await fetch(editApi, requestOptions);
    if (response.status === 200) {
      refreshTrips();
    }
    setIsEditMode(false);
    setEditId(0);
  }
  return (
    <>
      <div className={`w-full flex flex-wrap contenxt-center ${trips.length < 1 ? 'min-h-screen' : ''}`}>
        {!isLoading ? (
          <>
            <div className="text font-medium" hidden={trips.length !== 0 && !isLoading ? true : false}>
              Adicione novas metas de viagem!
            </div>
            {trips.map((trip: any) => {
              return (
                <div key={trip.id} id={trip.id} className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/5 xl:w-1/7 p-4 `}>
                  <div className={`w-full shadow-md p-2 ${isEditMode && editId === trip.id ? 'bg-gray-300' : ''}`} key={trip.id}>
                    <div className="float-right pl-3 pr-1 hover:opacity-70" >
                      <img src="./images/close.png" alt="close" title="Deletar" onClick={() => handleClickDelete(trip.id)} hidden={isEditMode && editId === trip.id ? true : false} />
                    </div>
                    <div className="float-right px-3 hover:opacity-70" hidden={isEditMode && editId === trip.id ? true : false}>
                      <img src="./images/edit.png" alt="edit" title="Editar" onClick={() => handleClickEdit(trip.id)} />
                    </div>
                    <div className="float-right px-3 hover:opacity-70" hidden={isEditMode && editId === trip.id ? false : true}>
                      <img src="./images/checkmark.ico" alt="edit" title="confirmar" onClick={() => handleClickConfirm(trip.id)} />
                    </div>
                    <div className="w-12 py-2"><img src={trip.countryUrl} alt="flag url" /></div>
                    <div className="py-2 uppercase font-medium" style={{ color: '#4F9419' }}> {trip.country}</div>
                    <hr />
                    <div className="py-4" hidden={isEditMode && Number(trip.id) === editId ? true : false}>
                      <div className="p-1" >local: {trip.location}</div>
                      <div className="p-1">meta: {trip.goal}</div>
                    </div>
                    <div id="editable-field" className="py-4" hidden={!(isEditMode && editId === trip.id)}>
                      <div className="flex">
                        <label className="pl-1 w-14 mt-1" >local:</label>
                        <input id={`editLocation${trip.id}`} className="p-1 border-solid border-1 w-full" defaultValue={trip.location} />
                      </div>
                      <div className="flex">
                        <label className="pl-1 w-14 mt-1" >meta:</label>
                        <InputMask mask="99/9999" id={`editGoal${trip.id}`} className="p-1 border-solid border-1 w-full" defaultValue={trip.goal} />
                      </div>
                      <div className="text-sm" hidden={trip.id !== editId}>
                        <div>Criado em: <span  className="float-right">{trip.creationDate}</span></div>
                        <div>Última atualização: <span className="float-right">{trip.updateDate}</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div>loading...</div>
        )}
      </div>
    </>
  );
};

export default TripRows;

