import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, Alert, ScrollView, Text, Pressable, Modal } from 'react-native'; 
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import usarBD from '../hooks/usarBD';


export default function Modal1({ isVisible, onClose,  sendDataToParent }) {
    // Carregar fontes personalizadas
    useFonts({ 'fonte': require('../assets/fonts/Inknut_Antiqua/InknutAntiqua-Regular.ttf') });

    const [id, setId] = useState('');

    const [titulo, setTitulo] = useState('');
    const [genero, setGenero] = useState('');
    const [data, setData] = useState('');
    const [nota, setNota] = useState('');

    const produtosBD = usarBD();

    async function create() {
        if (!titulo.trim() || !genero.trim() || !nota.trim() || !data.trim()) {
            return Alert.alert('Erro', 'Todos os campos devem ser preenchidos');
        }
        try {
            const item = await produtosBD.create({
                titulo,
                genero,
                data,
                nota
            });

            Alert.alert('Produto cadastrado com o ID: ' + item.idProduto);
            setId(item.idProduto);
            listar();

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listar();
    }, []);

    async function listar() {
        try {
            const captura = await produtosBD.read(id)
            sendDataToParent(captura)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Modal
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose} // Chama onClose quando o usuário fecha o modal
        >
            <View style={styles.modalOverlay}>
                <View style={styles.container}>
                    <View style={styles.comeco}>

                        <Text style={styles.titulo}>Adicionar</Text>

                        <Pressable onPress={onClose} style={styles.sair}>
                            <Ionicons name="close-outline" size={35} color="#000"

                            />
                        </Pressable>

                    </View>

                    <View style={styles.form}>
                        <TextInput
                            style={styles.input}
                            placeholder="Insira o titulo do filme"
                            onChangeText={setTitulo}
                            value={titulo}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Genero"
                            onChangeText={setGenero}
                            value={genero}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Nota (0-10)"
                            onChangeText={setNota}
                            value={nota}
                            maxLength={4} // Limita a entrada para 10.00
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Ano de Lançamento"
                            onChangeText={setData}
                            value={data}
                            maxLength={4}
                        />
                    </View>

                    <Pressable onPress={create()} style={styles.botao}>
                        <Text style={styles.textBotao}>Pronto</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    container: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    titulo: {
        fontSize: 16,
        fontFamily: 'fonte',
    },
    comeco: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    input: {
        height: 35,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#999",
        paddingHorizontal: 16,
        marginVertical: 5,
    },
    sair:{
        marginRight: -10    
    },
    botao: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,

    },
    textBotao: {
        fontFamily: 'fonte',
        fontSize: 14,
        backgroundColor: '#B9B9B9',
        paddingHorizontal: 15,
        paddingVertical: 2,
        borderRadius: 5
    },
});
