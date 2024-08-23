import { View, TextInput, Button, StyleSheet, FlatList, Alert, ScrollView, Text, Pressable, Modal } from 'react-native'; 
import { MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { useState } from 'react';
import Modal2 from './modal2';


export default function Filme({ dataFilme, onDelete, onSelectChange, isSelected, send }) {
    const [onSelect, setOnSelect] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);


    const handlePress = () => {
        const novoEstado = !onSelect;
        setOnSelect(novoEstado);
        onSelectChange(novoEstado ? dataFilme : null); // Passa o produto ou null para o pai
    };

    const handleDataFromChild = (data) => {
        send(data); // Armazena o array vindo do filho no estado do pai
    };

    useFonts({ 'fonte': require('../assets/fonts/Inknut_Antiqua/InknutAntiqua-Regular.ttf') });


    return (
        <View style={styles.container}>
            <View style={styles.caixa}>
                <View style={styles.caixaTexto}>
                    <View style={styles.up}>
                        <Text style={styles.titulo}> {dataFilme.titulo} </Text>
                        <Text style={styles.sub}> {dataFilme.data} </Text>
                    </View>
                    <View style={styles.down}>
                        <Text style={styles.sub}> {dataFilme.genero} </Text>
                    </View>
                </View>


                <View style={styles.caixaNota}>
                    <Text style={styles.nota}> {dataFilme.nota}</Text>
                </View>
            </View>

            <Pressable onPress={() => { setModalVisible(true)}} style={styles.botao}>
                <Text style={styles.textBotao}>Editar/Deletar</Text>
            </Pressable>

            <Modal2 isVisible={modalVisible} onClose={() => setModalVisible(false)} dados={dataFilme} sendDataToParent={handleDataFromChild} />

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#D9D9D9",
        padding: 10,
        margin: 10,
        height: 'auto',
    },
    caixa:{
        flexDirection:'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    caixaTexto:{
        flexDirection:'column',
        justifyContent: 'flex-start'
    },
    caixaNota:{
        backgroundColor: '#B9B9B9',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 40,
        height: 40
    },
    up:{
        flexDirection: 'row',
        alignItems: "baseline"
    },
    botao:{
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    textBotao:{
        fontFamily: 'fonte',
        fontSize: 14,
        backgroundColor: '#B9B9B9',
        paddingHorizontal: 15,
        paddingVertical: 2,
        borderRadius: 5
    },
    titulo:{
        fontSize: 16,
        fontFamily: 'fonte',
    },
    sub:{
        color: '#727272',
        fontFamily: 'fonte',
        fontSize: 12,
    },
    nota:{
        fontSize: 14,
        fontFamily: 'fonte'
    },
    down:{
        marginTop: -15
    }
    

});

// <Pressable style={isSelected ? styles.selectedContainer : styles.container}
//     onPress={handlePress}
// >

//     <Text style={styles.text}>
//         {dataFilme.titulo} - {dataFilme.genero} - {dataFilme.data} - {dataFilme.nota}
//     </Text>

//     <TouchableOpacity
//         onPress={onDelete}
//     >
//         <MaterialIcons name="delete" size={24} color="red" />
//     </TouchableOpacity>

// </Pressable>
