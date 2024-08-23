import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, Alert, ScrollView, Text, Pressable, Modal } from 'react-native'; 
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import Modal1 from './components/modal1';
import Modal2 from './components/modal2';
import Filme from './components/filme';
import usarBD from './hooks/usarBD';

export default function Index() {
    useFonts({ 'fonte': require('./assets/fonts/Inknut_Antiqua/InknutAntiqua-Regular.ttf') });

    const [id, setId] = useState('');

    const [titulo, setTitulo] = useState('');
    const [genero, setGenero] = useState('');
    const [data, setData] = useState('');
    const [nota, setNota] = useState('');
    const [filtro, setFiltro] = useState('');

    const [filmes, setFilmes] = useState([]);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);

    const [pesquisa, setPesquisa] = useState('');

    const [itemSelecionado, setItemSelecionado] = useState(null);


    const [modalVisible, setModalVisible] = useState(false);


    const produtosBD = usarBD();

    const remove = async (id) => {

        console.log(id + ' começou')
        try {
            await produtosBD.remove(id);
            await listar();
        } catch (error) {
            console.log(error);
        }
    };

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


    async function listar() {
        try {
            const captura = await produtosBD.read(id)
            setFilmes(captura)
        } catch (error) {
            console.log(error)
        }
    }


    async function editar(titulo, genero, data, nota) {
        if (!produtoSelecionado) {
            return Alert.alert('Erro', 'Nenhum produto selecionado para editar');
        }


        try {
            const item = { titulo, genero, data, nota };
            await produtosBD.edit(produtoSelecionado.id, item);
            Alert.alert('Produto editado com sucesso');
            listar();
        } catch (error) {
            console.error(error);
        }
    }

    async function filtrar() {
        if (!filtro.trim()) {
            return Alert.alert('Erro', 'O campo de  não pode estar vazio.');
        }
        try {
            const resultado = await produtosBD.filtrar(filtro);
            setFilmes(resultado);
        } catch (error) {
            console.error('Erro ao filtrar filmes:', error);
        }
    }

    const handleDataFromChild = (data) => {
        setFilmes(data); // Armazena o array vindo do filho no estado do pai
    };
    const handleDataFromChild2 = (data) => {
        setFilmes(data); // Armazena o array vindo do filho no estado do pai
    };

    useEffect(() => {
        listar();
    }, []);


    const handleProdutoSelect = (produto) => {
        setProdutoSelecionado(produto);
    };

    useEffect(() => {
        if (produtoSelecionado) {
            setTitulo(produtoSelecionado.titulo);
            setGenero(produtoSelecionado.genero);
            setNota(String(produtoSelecionado.nota));
            setData(String(produtoSelecionado.data));
        }
    }, [produtoSelecionado]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.titulo}>Zé Filmess</Text>
                </View>

                <Pressable onPress={() => setModalVisible(true)} style={styles.adicionar}>
                    <Ionicons name="add-outline" size={35} color="#000" style={{ padding: 5 }} />
                </Pressable>
            </View>

            <ScrollView>
                {filmes.map((filme) => (
                    <Filme
                        key={filme.id}
                        dataFilme={filme}
                        onDelete={() => remove(filme.id)}
                        onSelectChange={handleProdutoSelect}
                        isSelected={produtoSelecionado?.id === filme.id}
                        send={handleDataFromChild2}
                    />
                ))}
            </ScrollView>

            <Modal1 isVisible={modalVisible} onClose={() => setModalVisible(false)}  sendDataToParent={handleDataFromChild}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titulo: {
        fontFamily: 'fonte',
        fontSize: 14,
    },
    header: {
        backgroundColor: '#D9D9D9',
        paddingTop: 35,
        paddingBottom: 20,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
    },
    adicionar: {
        backgroundColor: '#B9B9B9',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
});




// <TextInput
//                     style={styles.texto}
//                     placeholder="Insira o titulo do filme"
//                     onChangeText={setTitulo}
//                     value={titulo}
//                 />
//                 <TextInput
//                     style={styles.texto}
//                     placeholder="Genero"
//                     onChangeText={setGenero}
//                     value={genero}
//                 />
//                 <TextInput
//                     style={styles.texto}
//                     placeholder="Nota (0-10)"
//                     onChangeText={setNota}
//                     value={nota}
//                     maxLength={4} // Limita a entrada para 10.00
//                 />
//                 <TextInput
//                     style={styles.texto}
//                     placeholder="Ano de Lançamento"
//                     onChangeText={setData}
//                     value={data}
//                     maxLength={4}
//                 />

//                 <Button
//                     style={styles.botao}
//                     title="Adicionar Filme"
//                     onPress={() => create()}
//                 />

//                 <Button
//                     style={styles.botao}
//                     title="Editar"
//                     onPress={() => editar(titulo, genero, data, nota)}
//                 />

//                 <Button
//                     style={styles.botao}
//                     title="filmes log"
//                     onPress={() => console.log(filmes)}
//                 />

//                 <Button
//                     style={styles.botao}
//                     title="filtro"
//                     onPress={() => filtrar(filtro)}
//                 />

//                 <TextInput
//                 />


//                 <TextInput
//                     style={styles.texto}
//                     placeholder="Pesquisar"
//                     onChangeText={setPesquisa}
//                 />