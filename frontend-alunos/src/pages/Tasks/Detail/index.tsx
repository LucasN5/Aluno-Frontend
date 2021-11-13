import React, {useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import {useHistory, useParams} from 'react-router-dom';
import './index.css';
import api from '../../../services/api';
import moment from 'moment';

interface ITask{
    id: number;
    Nome: string;
    Idade: number;
    Data_de_Nascimento: string;
    RA: number;
    Endereço: string;
    Matriculado: boolean;
    created_at: Date;
    updated_at: Date;
}

const Detail: React.FC = () => {

    const history = useHistory()
    const { id } = useParams<{id: string}>()
    const [task, setTask] = useState<ITask>()

    function back() {
        history.goBack()
    }

    async function findTask(){
        const response = await api.get<ITask>(`/tasks/${id}`)
        console.log(response)
        setTask(response.data)
    }

    useEffect(() => {
        findTask()
    }, [id])

    return (
        <div className="container">
            <br />
            <div className="task-header">
                <h1>Detalhe do Cadastro</h1>
                <Button variant="dark" size="sm">Voltar</Button>
            </div>
            <br />

            <Card style={{width: '18rem'}}>
                <Card.Body>
                    <Card.Title>{task?.Nome}, {task?.RA}</Card.Title>

                    <Card.Text>
                        {task?.Data_de_Nascimento}
                        <br/>
                        {task?.Idade}
                        <br/>
                        {task?.Endereço}
                        <br/>
                        {task?.Matriculado ? "Finalizado" : "Pendente"}
                        <br/>
                        <strong>Data de Cadastro</strong>
                        {moment(task?.created_at).format('DD/MM/YYYY')}
                        <br/>
                        <strong>Data de Atualização</strong>
                        {moment(task?.created_at).format('DD/MM/YYYY')}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Detail;