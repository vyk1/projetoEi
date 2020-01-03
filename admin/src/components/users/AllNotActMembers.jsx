import React, { Component } from 'react'
import Main from '../template/Main'
import Logo from '../template/Logo'
import Nav from '../template/Nav'
import Footer from '../template/Footer'
import { getToken } from '../auth'
import api from '../../Server'
// import InputMask from "react-input-mask"

const headerProps = {
    icon: 'inbox',
    title: 'Membros Não Verificados',
    subtitle: 'Aqui estão listados todos os membros não verificados.'
}

const initialState = {
    list: [],
    message: 'Carregando',
}

export default class UserCrud extends Component {

    state = { ...initialState }

    async componentWillMount() {
        this.getUser()
    }

    async getUser() {
        let token = getToken()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        }

        const response = await api.get('/users/notVerified', config)

        if (response.data.length <= 0) {
            this.setState({ message: "Não há membros a serem verificados." })
        }
        this.setState({
            list: response.data,
            status: response.status,
        })
    }

    async decline(e) {
        await e.persist()

        const name = e.target.attributes[3].value;
        const classid = e.target.attributes[2].value

        if (window.confirm(`Você tem certeza que deseja apagar o usuário ${name}?`)) {

            this.setState({
                loaded: false,
                message: ""
            })

            const body = {
                id: classid
            }
            let token = getToken()

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                }
            }

            const res = await api.post('/user/decline', body, config)
            if (res.status === 200) {

                this.setState({
                    message: res.data.message,
                    color: "success",
                    loaded: true,

                })
                this.getUser()

            } else {
                this.setState({
                    message: res.data.message,
                    color: 'message',
                    loaded: true,
                })
            }
        } else {
            return false
        }
    }

    async accept(e) {
        await e.persist()

        const name = e.target.attributes[3].value;
        const classid = e.target.attributes[2].value

        if (window.confirm(`Você tem certeza que deseja aceitar o usuário ${name}?`)) {

            this.setState({
                loaded: false,
                message: ""
            })

            const body = {
                id: classid
            }
            let token = getToken()

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                }
            }

            const res = await api.post('/user/accept', body, config)
            if (res.status === 200) {

                this.setState({
                    message: res.data.message,
                    color: "success",
                    loaded: true
                })
                this.getUser()

            } else {
                this.setState({ message: res.data.message, color: 'message' })
            }
        } else {
            return false
        }
    }

    renderTable() {
        return (
            <div>
                <p><strong>{this.state.message}</strong></p>
                <table className="table mt-4" >
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th>Tipo</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table >
            </div>
        )
    }

    getType(tipo) {
        switch (tipo) {
            case 1:
                return 'Estudante'
            case 2:
                return 'Orientador'
            case 3:
                return 'Supervisor'
            default:
                return '-'
        }
    }

    renderRows() {
        return this.state.list.map(user => {
            return (
                <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{this.getType(user.type)}</td>
                    <td>
                        <i style={{ padding: "10px" }} className="fa fa-user-times" classID={user._id} data-info={user.name} onClick={(e) => this.decline(e)} />
                        <i style={{ padding: "10px" }} className="fa fa-user-plus" classID={user._id} data-info={user.name} onClick={(e) => this.accept(e)} />
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className="app">
                <Logo />
                <Nav />
                <Main {...headerProps}>
                    {this.renderTable()}
                </Main>
                <Footer />
            </div>
        )
    }
}