import { useState } from "react"
import { useNavigate } from "react-router-dom"
import NavPacient from "../components/NavPacient"


function Login(){
    
const [nome, setNome] = useState('')
const [tipo, SetTipo] = useState('paciente')
const [senha, setSenha] = useState('')
const navigate = useNavigate()


const handleLogin = (e) =>{
    e.preventDefault()
    if(!nome.trim()) return alert('Digite seu nome')

    localStorage.setItem('usuario', JSON.stringify({nome, tipo, senha}))

    if (tipo === 'medico' && senha === '1234'){
        navigate('/triagem')
    }if (tipo === 'paciente'&& senha === '1234') {
        navigate('/cadastro')
    }
}
    return(
        <div>
       
        
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="text"
                placeholder="digite o nome" 
                value={nome}
                onChange={(e) => setNome(e.target.value)}/>
                <input type="password"
                placeholder="digite uma senha"
                value={senha}
                onChange={(e)=> setSenha(e.target.value)}></input>

                <select value={tipo} onChange = {(e) => SetTipo(e.target.value)}>
                    <option value="paciente">Paciente</option>
                    <option value="medico">Medico</option>
                </select>
                <button type="submit">Entrar</button>
            </form>
        </div>
    )
}
export default Login