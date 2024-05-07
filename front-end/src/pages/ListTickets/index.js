import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { Sidebar } from "../../components/Sidebar";
import api from "../../config/configApi";

export const ListTickets = () => {

    const { state } = useLocation()

    const [data, setData] = useState([]);

    const [page, setPage] = useState('');
    const[lastPage, setLastPage] = useState('');

    const [status, setStatus] = useState({
        type: state ? state.type : "",
        mensagem: state ? state.mensagem : "",
    })

    const getTickets = async (page) => {

        if(page === undefined){
            page = 1;
        }

        setPage(page)

            const headers = {
                'headers': {
                'Authorization': "Bearer " + localStorage.getItem('token'),
            }
        }

        await api.get("/list-tickets/" + page, headers)
        .then((response) => {
            setData(response.data.chamado);
            setLastPage(response.data.lastPage);
        }).catch((err) => {
            if(err.response) {
                setStatus({
                    type: "error",
                    mensagem: err.response.data.mensagem
                })
            } else{
                setStatus({
                    type: "error",
                    mensagem: "Tente novamente mais tarde!"
                })
            }
        })

    }
    useEffect(() => {
        getTickets()
    }, [])

    return (
        <div>
            <Navbar />
            <div className="content">
                <Sidebar active="list-tickets"/>

                <div className="wrapper table-sm-list">
                    <div className="row">
                        <div className="top-content-adm">
                            <span className="title-content">Lista de chamados</span>
                            <div className="top-content-adm-right">
                        
                            </div>
                        </div>
                        <div className="alert-content-adm">
                            {status.type === "success" ? <p className="alert-success">{status.mensagem}</p> : ""}
                            {status.type === "error" ? <p className="alert-danger">{status.mensagem}</p> : ""}
                        </div>
                        <div className="content-adm">

                            <table className="table-list">
                            <thead className="list-head">
                                <tr>
                                    <th className="list-head-content">ID</th>
                                    <th className="list-head-content">Nome Usuário</th>
                                    <th className="list-head-content table-sm-none">Departamento</th>
                                    <th className="list-head-content table-sm-none">Tipo</th>
                                    <th className="list-head-content">Título</th>
                                    <th className="list-head-content">Categoria</th>
                                    <th className="list-head-content table-sm-none">Prioridade</th>
                                    <th className="list-head-content">Status</th>
                                    <th className="list-head-content table-sm-none ">Aberto em</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(chamado => (
                                    <tr key={chamado.id}>
                                        <td className="list-body-content">{chamado.id}</td>
                                        <td className="list-body-content">{chamado.nome_usuario}</td>
                                        <td className="list-body-content table-sm-none">{chamado.localizacao}</td>
                                        <td className="list-body-content table-sm-none">{chamado.tipo}</td>
                                        <td className="list-body-content">{chamado.titulo_chamado}</td>
                                        <td className="list-body-content">{chamado.categoria}</td>
                                        
                                        <td className="list-body-content table-sm-none">{chamado.prioridade}</td>
                                        {chamado.status_chamado === "Novo" ? <td className="list-body-content status-new">{chamado.status_chamado}</td> : ""}
                                        {chamado.status_chamado === "Em andamento" ? <td className="list-body-content status-working">{chamado.status_chamado}</td> : ""}
                                        {chamado.status_chamado === "Atendido" ? <td className="list-body-content status-finished">{chamado.status_chamado}</td> : ""}
                                        {chamado.status_chamado === "" ? <td className="list-body-content status-null">---</td> : ""}
                                        <td className="list-body-content table-sm-none ">{chamado.createdAt}</td>
                                        <td className="list-body-content">
                                            <Link to={"/view-ticket/" + chamado.id}><button type="button" className="btn-info">Ver</button></Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            </table>

                            <div className="content-pagination">
                                <div className="pagination">
                                    <Link to="#" onClick={() => getTickets(1)}><i className="fas fa-angle-double-left"></i></Link>
                            
                                    {page !== 1 ? <Link to="#" onClick={() => getTickets(page - 1)}>{page - 1}</Link> : ""}{" "}

                                    <Link to="#" className="active">{page}</Link>

                                    {page + 1 <= lastPage ? <Link to="#" onClick={() => getTickets(page + 1)}>{page + 1}</Link> : ""}{" "}
                    
                                    <Link to="#" onClick={() => getTickets(lastPage)}><i className="fas fa-angle-double-right"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}