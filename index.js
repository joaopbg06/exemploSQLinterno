import { View, TextInput, Button, StyleSheet,} from 'react-native';
import { useState } from 'react';

export default function Index() {
    
    const [titulo, setTitulo] = useState('');
    const [genero, setGenero] = useState('');
    const [nota, setNota] = useState('');
    const [dataLancamento, setDataLancamento] = useState('');
    const [pesquisa, setPesquisa] = useState('');

    return (
        <View >
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
                keyboardType="numeric"
                onChangeText={setNota}
                value={nota}
                 maxLength={4} // Limita a entrada para 10.00
            />
            <TextInput
                style={styles.texto}
                placeholder="Data de Lançamento"
                onChangeText={setDataLancamento}
                value={dataLancamento}
                keyboardType="numeric"
            />
            <Button
                style={styles.botao}
                title="Adicionar Filme"
                //  onPress={handleSubmit}
            />
            <TextInput
                style={styles.texto}
                placeholder="Pesquisar"
                onChangeText={setPesquisa}
            />
        </View>
    )
    
}


const styles = StyleSheet.create({

    container: {
        padding: 20,
    },
    botao:{
        
    },
    texto: {
        height: 20,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
        borderRadius: 4,
    },

});
    

//     return (
//         <View style={styles.container}>
//             <TextInput
//                 style={styles.texto}
//                 placeholder="Insira o título do filme"
//                 onChangeText={setTitulo}
//                 value={titulo}
//             />
            
//             <Picker
//                 selectedValue={genero}
//                 style={styles.picker}
//                 onValueChange={(itemValue) => setGenero(itemValue)}
//             >
//                 <Picker.Item label="Selecione o Gênero" value="" />
//                 <Picker.Item label="Ação" value="Ação" />
//                 <Picker.Item label="Comédia" value="Comédia" />
//                 <Picker.Item label="Drama" value="Drama" />
//                 <Picker.Item label="Ficção Científica" value="Ficção Científica" />
//                 <Picker.Item label="Romance" value="Romance" />
//                 {/* Outros gêneros podem ser adicionados aqui */}
//             </Picker>
            
//             <TextInput
//                 style={styles.texto}
//                 placeholder="Nota (0-10)"
//                 keyboardType="numeric"
//                 onChangeText={setNota}
//                 value={nota}
//                 maxLength={4} // Limita a entrada para 10.00
//             />
            
//             <TextInput
//                 style={styles.texto}
//                 placeholder="Data de Lançamento"
//                 onChangeText={setDataLancamento}
//                 value={dataLancamento}
//                 keyboardType="numeric"
//             />
            
//             <Button
//                 title="Adicionar Filme"
//                 onPress={handleSubmit}
//                 color="#28a745"
//             />
//         </View>
//     );
// }


//     picker: {
//         height: 50,
//         marginBottom: 12,
//     },
// });


