import { View, TextInput, Button, StyleSheet, FlatList, Alert, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import Filme from './components/filme';
import usarBD from './hooks/usarBD';

export default function Index() {
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



    const produtosBD = usarBD(); // Agora `produtosBD` é um objeto com os métodos de CRUD

    // Função para limpar todos os dados da tabela



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
    


    useEffect(() => {
        listar();
    }, [pesquisa]);


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
        <ScrollView>
            <View style={styles.container}>
            <TextInput
                style={styles.texto}
                placeholder="Insira o titulo do filme"
                onChangeText={setTitulo}
                value={titulo}
            />
            <TextInput
                style={styles.texto}
                placeholder="Genero"
                onChangeText={setGenero}
                value={genero}
            />
            <TextInput
                style={styles.texto}
                placeholder="Nota (0-10)"
                onChangeText={setNota}
                value={nota}
                maxLength={4} // Limita a entrada para 10.00
            />
            <TextInput
                style={styles.texto}
                placeholder="Ano de Lançamento"
                onChangeText={setData}
                value={data}
                maxLength={4}
            />

            <Button
                style={styles.botao}
                title="Adicionar Filme"
                onPress={() => create()}
            />

            <Button
                style={styles.botao}
                title="Editar"
                onPress={() => editar(titulo, genero, data, nota)}
            />

            <Button
                style={styles.botao}
                title="filmes log"
                onPress={() => console.log(filmes)}
            />

            <Button
                style={styles.botao}
                title="filtro"
                onPress={() => filtrar(filtro)}
            />

            <TextInput
                style={styles.texto}
                placeholder="filtro"
                onChangeText={setFiltro}
            />


            <TextInput
                style={styles.texto}
                placeholder="Pesquisar"
                onChangeText={setPesquisa}
            />

            <ScrollView >
                {filmes.map((filme) => (
                    <Filme
                        key={filme.id}  // Utilizando o id como chave
                        dataFilme={filme}
                        onDelete={() => remove(filme.id)}
                        onSelectChange={handleProdutoSelect}
                        isSelected={produtoSelecionado?.id === filme.id}
                    />
                ))}
            </ScrollView>

        </View>
        </ScrollView>
    )

}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: 20,
        padding: 32,
        gap: 16,
    },
    texto: {
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#999",
        paddingHorizontal: 16,

    },
    listContent: {
        gap: 16,
    }

});



