import { Link, useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import { database } from '../services/firebase';

import '../styles/auth.scss';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

export function NewRoom(){
    const { user } = useAuth();
    const history = useHistory();
    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event: FormEvent) {
        // função para previnir que a página fique atualizando após clicar no submit do formulário
        event.preventDefault();
        
        if(newRoom.trim() === ''){
            return 
        }

        // criando no bd o rooms e dentro dele jogando os dados de quem criou a sala, como id e nome da sala
        // procurar por referencia rooms dentro do banco de dados e depois fazer um push
        const roomRef = database.ref('rooms');

        // jogando umam informação pra dentro de rooms, jogando uma nova sala pra dentro de rooms
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        });

        history.push(`/rooms/${firebaseRoom.key}`);
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="LetMeAsk" />
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input onChange={event => setNewRoom(event.target.value)} value={newRoom} type="text" name="" id="" placeholder="Nome da sala"/>
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>Quer entrar em uma sala já existente? <Link to="/">Clique aqui</Link></p>
                </div>
            </main>
        </div>
    )
    
}