import React, {useState, ChangeEvent, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import api from '../../../services/api';
import './index.css';
import { useHistory, useParams } from 'react-router-dom';

interface ITask{
    Nome: string;
    Idade: number;
    Data_de_Nascimento: string;
    RA: number;
    Endereço: string

}

const Tasks: React.FC = () => {

    const history = useHistory()
    const { id } = useParams<{ id:string }>()
    
    

    const [model, setModel] = useState<ITask>({
        Nome:'',
        Idade: 0o0,
        Data_de_Nascimento:'',
        RA: 0o0,
        Endereço:''
    })

    useEffect(() => {
        console.log(id)
        if (id !== undefined) {
            findTask(id)
        }
    }, [id])

    function updatedModel(e: ChangeEvent<HTMLInputElement>){
        setModel({
            ...model,
            [e.target.name]: e.target.value
        })
    }
    
   async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if(id !== undefined) {
            const response = await api.put(`/tasks/${id}`, model)
        } else {
            const response = await api.post('/tasks', model)
        }
        back()
    }

    function back() {
        history.goBack()
    }

    async function findTask(id: string){
        const response = await api.get(`tasks/${id}`)
        console.log(response)
        setModel({
            Nome: response.data.Nome,
            Idade: response.data.Idade,
            Data_de_Nascimento: response.data.Data_de_Nascimento,
            RA: response.data.RA,
            Endereço: response.data.Endereço
        })
    }
    
    return(

        <div className="container">
            <br />
            <div className="task-header">
                <h1>Novo Cadastro</h1>
                <Button variant="dark" size="sm">Voltar</Button>
            </div>
            <br />
            <div className="container">
                <Form onSubmit={onSubmit}>
                    <Form.Group>
                        <Form.Label>Nome do Aluno</Form.Label>
                        <Form.Control
                             type="text"
                             name="Nome"
                             value={model.Nome}
                             onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)}/>
                    </Form.Group>

                    <br/>
                    <Form.Group>
                        <Form.Label>Idade</Form.Label>
                        <Form.Control
                            type="number"
                            name="Idade"
                            value={model.Idade}
                            onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)}/>
                    </Form.Group>
                     <br/>  
                    <Form.Group>
                        <Form.Label>Data_de_Nascimento</Form.Label>
                        <Form.Control
                            type="text"
                            name="Data_de_Nascimento"
                            value={model.Data_de_Nascimento}
                            onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)}/> 
                    </Form.Group>
                      <br/>
                    <Form.Group>
                        <Form.Label>RA</Form.Label>
                        <Form.Control
                            type="number"
                            name="RA"
                            value={model.RA}
                            onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)}/>
                    </Form.Group>
                      <br/>
                    <Form.Group>
                        <Form.Label>Endereço</Form.Label>
                        <Form.Control
                            type="text"
                            name="Endereço"
                            value={model.Endereço}
                            onChange={(e:ChangeEvent<HTMLInputElement>) => updatedModel(e)}/>
                    </Form.Group>
                    
                    
                    <br />
                    <Button variant="dark" type="submit">Salvar</Button>
                </Form>
                </div>
        </div>
    );
} 

export default Tasks;