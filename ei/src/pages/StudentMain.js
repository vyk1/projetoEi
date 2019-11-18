import React, { Component } from 'react';

import { StyleSheet, FlatList, Text, View, Platform } from 'react-native';
import server from "../config/server";
import Esperador from '../components/Esperador';

export default class StudentMain extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `${navigation.getParam('title')}`,
            headerStyle: {
                backgroundColor: '#5f98e3',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontFamily: 'RobotoMono-Bold',
                fontSize: 15
            },
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            user: { id: '5d72603dcc169444900b2402' },
            logado: {},
            GridViewItems: [
                { key: 'Informações Sobre o Estágio', page: 'InfoStage' },
                { key: 'Registrar Atividade', page: 'RegisterActivity' },
                { key: 'Relatório Geral', page: 'GenReport' },
                { key: 'Contatos', page: 'Contacts' },
                { key: 'Ei! Fique Ligado', page: 'StayOn' },
                { key: 'Para Refletir', page: 'ToThink' },
                { key: "Sobre o App", page: "About" },
            ],
        }
    }

    async getUser() {

        return fetch(`${server}/user/${this.state.user.id}`)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('rodou');

                this.setState({ logado: responseJson })
                console.log(responseJson);
                this.props.navigation.setParams({ title: `Olá ${this.state.logado.user.name}` })

            })
            .catch((error) => {
                console.error(error);
                return false
            });
    }
    componentDidMount() {
        this.getUser()
    }

    GetGridViewItem(page, key) {
        const { logado } = this.state;
        this.props.navigation.navigate(page, {
            title: key,
            logado,
            title: 'Carregando',

        });
    }
    renderiza() {
        const { logado } = this.state;
        console.log('====================================');
        console.log(logado);
        console.log(!Object.keys(logado).length);
        console.log('====================================');

        if (!Object.keys(logado).length) {
            return (
                <Esperador />
            )
        } else {
            return (
                <View style={styles.MainContainer}>
                    <FlatList
                        data={this.state.GridViewItems}
                        renderItem={({ item }) =>
                            <View style={styles.GridViewBlockStyle}>
                                <Text style={styles.GridViewInsideTextItemStyle} onPress={this.GetGridViewItem.bind(this, item.page)} > {item.key} </Text>
                            </View>}
                        numColumns={2}
                    />
                </View>
            );
        }
    }

    render() {
        return (this.renderiza())
    }
}
const styles = StyleSheet.create({

    Container: {
        backgroundColor: '#fafbfc'
    },

    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        margin: 10,
        paddingTop: 0,
    },

    GridViewBlockStyle: {

        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        height: 100,
        margin: 5,
        backgroundColor: '#5fbbe3'
    },

    GridViewInsideTextItemStyle: {
        color: '#fff',
        padding: 18,
        fontSize: 18,
        justifyContent: 'center',
        textAlign: 'center',
    }
});
