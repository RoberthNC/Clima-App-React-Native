import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet, Text, TextInput, TouchableWithoutFeedback, View, Animated, Alert } from 'react-native';

const Formulario = ({busqueda, guardarBusqueda, guardarConsultar}) => {

    const { ciudad, pais } = busqueda;

    const [ animacionBtn ] = useState(new Animated.Value(1));

    const animacionEntrada = () => {
        Animated.spring( animacionBtn, {
            toValue: .75
        }).start();
    }

    const consultarClima = () => {
        if(pais.trim() === '' || ciudad.trim() === ''){
            mostrarAlerta();
            return;
        }

        guardarConsultar(true);
    }

    const mostrarAlerta = () => {
        Alert.alert('Error', 'Agrega la ciudad y país para la búsqueda',[{ text:'Entendido' }]);
    }

    const animacionSalida = () => {
        Animated.spring( animacionBtn, {
            toValue:1,
            friction:4,
            tension:30
        }).start();
    }

    const estiloAnimacion = {
        transform:[{scale: animacionBtn}]
    }

    return (
        <>
            <View style={styles.formulario}>
                <View>
                    <TextInput
                        value={ciudad}
                        style={styles.input}
                        onChangeText={ciudad => guardarBusqueda({...busqueda, ciudad})}
                        placeholder='Ciudad'
                        placeholderTextColor='#666'
                    />
                </View>
                <View>
                    <Picker
                        selectedValue={pais}
                        style={styles.selectPais}
                        onValueChange={pais => guardarBusqueda({...busqueda, pais})}
                    >
                        <Picker.Item label='-- Seleccione un país --' value=''/>
                        <Picker.Item label='Estados Unidos' value='US'/>
                        <Picker.Item label='México' value='MX'/>
                        <Picker.Item label='Argentina' value='AR'/>
                        <Picker.Item label='Colombia' value='CO'/>
                        <Picker.Item label='Costa Rica' value='CR'/>
                        <Picker.Item label='España' value='ES'/>
                        <Picker.Item label='Perú' value='PE'/>
                    </Picker>
                </View>

                <TouchableWithoutFeedback
                    onPressIn={ animacionEntrada }
                    onPressOut={ animacionSalida }
                    onPress={ () => consultarClima() }
                >
                    <Animated.View style={[styles.btnBuscar, estiloAnimacion]}>
                        <Text style={styles.textoBuscar}>Buscar Clima</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    input:{
        padding:10,
        height:50,
        backgroundColor:'#FFF',
        fontSize:20,
        marginBottom:20,
        textAlign:'center'
    },
    selectPais:{
        backgroundColor:'#FFF',
        height:120
    },
    btnBuscar:{
        marginTop:50,
        backgroundColor:'#000',
        padding:10,
        justifyContent:'center'
    },
    textoBuscar:{
        color:'#FFF',
        fontWeight:'bold',
        textTransform:'uppercase',
        textAlign:'center',
        fontSize:18
    }
});

export default Formulario;