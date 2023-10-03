import { useEffect, useState, useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import { SavedListContext } from "../context/SavedListContext";
import Button from "../components/Button";
import axios from "axios";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";


const CutLists = () => {

    const [listagem, setListagem] = useState([])

    const { sessionId, setSessionId } = useContext(LoginContext)

    const { savedList, setSavedList } = useContext(SavedListContext)


    async function getListaCorte() {
        await axios.get(`http://localhost:3000/listas/${sessionId}`)
            .then((response) => {
                setListagem([...response.data])
            })
            .catch((err) => {
                console.error(err)
            })
    }

    async function handleDeleteCorte(id) {
        await axios.post(`http://localhost:3000/listas/delete/${sessionId}`, {
            id: id,
        })
        .then()
        .catch((err) => {
            console.error(err)
        })
    }

    useEffect(() => {

        getListaCorte() 

    }, [listagem])



    return (
        <div className="">
            {sessionId ? (
                <div>
                    <NavBar />
                    <div className="grid grid-cols-6 p-4 gap-2">
                        {listagem.map(listas => (
                            <div className="flex flex-col items-center gap-1">
                                <div key={listas.id} className="flex flex-col w-full overflow-y-scroll h-60 px-2 border-2 border-zinc-600 rounded-md shadow-md shadow-zinc-400">
                                    <h2 className="text-xl font-bold">{`Lista ${listas.date.substring(0, 10)}`}</h2>
                                    {listas.lista.map(peca => (
                                        <div>
                                            <p>{peca.w} x {peca.h} x {peca.quantidade}</p>
                                        </div>
                                    ))
                                    }
                                </div>
                                <div className="flex gap-1">
                                    <Button className={'w-24'} content={'REMOVER'} onClick={() => {
                                        handleDeleteCorte(listas.id)
                                    }}/>
                                    <Link to='/' className={'w-24'} content={'CORTAR'} onClick={() => {
                                        setSavedList(listas.id)
                                    }}>CORTAR</Link>

                                </div>

                                
                            </div>

            
                        ))}
                    </div>
                </div>
            ) : (

                <div className="flex flex-col items-center">
                    <NavBar />
                    <h2 className="text-xl font-semibold">Faça o Login para acessar suas listas de corte</h2>
                </div>
            )}
  


 
        </div>
    );
}
 
export default CutLists;