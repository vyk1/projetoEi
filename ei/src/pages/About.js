import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';

import logo from '../assets/logo_transp2.png';
import { ScrollView } from 'react-native-gesture-handler';
import { Container, Content } from 'native-base';

export default class About extends Component {
  static navigationOptions = {
    title: 'Sobre o App ESTÁGIO INTEGRADO',
    headerStyle: {
      backgroundColor: '#5f98e3',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontFamily: 'RobotoMono-Bold',
      fontSize: 15
    },
  };
  render() {
    return (
      <Container style={styles.MainContainer}>
        <Content>
          <Image source={logo} style={styles.image}></Image>
          <Text style={styles.text}>
            Este aplicativo é um produto educacional desenvolvido no decorrer da pesquisa de pós-graduação da mestranda Josiana Rita Bazana, aluna do Curso de Mestrado Profissional em Educação Profissional e Tecnológica – ProfEPT / IFFar, sob a orientação da Profª. Drª. Sandra Elisabet Bazana Nonenmacher e colaboração da estudante em Sistemas Para Internet Victoria Botelho Martins.
            </Text>
          <Text style={styles.text}>
            O objetivo deste aplicativo é incentivar a reflexão acerca do estágio e promover a comunicação entre os sujeitos envolvidos, por meio do suporte de um software educacional, contribuindo assim com os processos de ensino e de aprendizagem proporcionados pelo estágio curricular supervisionado.
            Esperamos que este aplicativo seja útil para você. Use e aproveite todas as ferramentas disponíveis.
        </Text>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 8
  },
  image: {
    alignSelf: 'center',
    width: 150,
    height: 150,
    resizeMode: 'stretch'
  },
  text: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'RobotoMono-Light',
    textAlign: 'justify',
    margin: 17,
  },
})
//   container: {
//     flex: 1,
//     marginTop: 20,
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     flex: 1,
//     margin: 20,
//     backgroundColor: 'orange',
//     margin: 10,
//     textAlign: 'center',
//     fontSize: 20,
    // paddingTop: 70,
//   }
// });