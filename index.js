import { View, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import Filme from './components/filme';
import usarBD from './hooks/usarBD';
import { Picker } from '@react-native-picker/picker';

export default function Index() {
    const [id, setId] = useState('');
    const [titulo, setTitulo] = useState('');
    const [genero, setGenero] = useState('');
    const [data, setData] = useState('');
    const [nota, setNota] = useState('');

    const [filmes, setFilmes] = useState([]);


    const [produtoSelecionado, setProdutoSelecionado] = useState(null);

    const [pesquisa, setPesquisa] = useState('');
    const [filtro, setFiltro] = useState('titulo');
    const [ordem, setOrdem] = useState('ASC');


    const produtosBD = usarBD();

    const remover = async (id) => {
        try {
            await produtosBD.remove(id);
            listar();
        } catch (error) {
            console.log(error);
        }
    };

    const create = async () => {

        if (!produtoSelecionado) {
            if (!titulo.trim() || !genero.trim() || !nota.trim() || !data.trim()) {
                return Alert.alert('Erro', 'Todos os campos devem ser preenchidos');
            }

            try {
                const item = await produtosBD.create({ titulo, genero, data, nota });
                Alert.alert('Produto cadastrado com o ID: ' + item.idProduto);
                setId(item.idProduto);
                listar();
            } catch (error) {
                console.log(error);
            }
        }

        else {
            try {
                const item = { titulo, genero, data, nota };
                await produtosBD.edit(produtoSelecionado.id, item);
                Alert.alert('Produto editado com sucesso');
                listar();
            } catch (error) {
                console.error(error);
            }
        }

    };

    const listar = async () => {
        try {
            const captura = await produtosBD.read(pesquisa, filtro, ordem);
            setFilmes(captura);
        } catch (error) {
            console.log(error);
        }
    };





    useEffect(() => {
        listar();
    }, [pesquisa]);

    useEffect(() => {
        listar();
    }, [filtro]);

    useEffect(() => {
        listar();
    }, [ordem]);



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
                    maxLength={4}
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
                    title="Adicionar/Editar Filme"
                    onPress={create}
                />


                <Picker
                    selectedValue={filtro}
                    style={styles.picker}
                    onValueChange={(itemValue) => setFiltro(itemValue)}
                >
                    <Picker.Item label="Titulo" value="titulo" />
                    <Picker.Item label="Gênero" value="genero" />
                    <Picker.Item label="Ano de lançamento" value="data" />
                    <Picker.Item label="Nota" value="nota" />
                </Picker>

                <Picker
                    selectedValue={ordem}
                    style={styles.picker}
                    onValueChange={(itemValue) => setOrdem(itemValue)}
                >
                    <Picker.Item label="Crescente" value="ASC" />
                    <Picker.Item label="Decrescente" value="DESC" />

                </Picker>

                <TextInput
                    style={styles.texto}
                    placeholder="Pesquisar"
                    onChangeText={setPesquisa}
                />

                <ScrollView>
                    {filmes.map((filme) => (
                        <Filme
                            key={filme.id}
                            dataFilme={filme}
                            onDelete={() => remover(filme.id)}
                            onSelectChange={handleProdutoSelect}
                            isSelected={produtoSelecionado?.id === filme.id}
                        />
                    ))}
                </ScrollView>

            </View>
        </ScrollView>
    );
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
