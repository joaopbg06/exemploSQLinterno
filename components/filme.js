import { Pressable, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';


export default function Filme({ dataFilme, onDelete, onSelectChange, isSelected }) {
    const [onSelect, setOnSelect] = useState(false)

    const handlePress = () => {
        const novoEstado = !onSelect;
        setOnSelect(novoEstado);
        onSelectChange(novoEstado ? dataFilme : null); // Passa o produto ou null para o pai
    };

    return (
        <Pressable style={isSelected ? styles.selectedContainer : styles.container}
            onPress={handlePress}
        >

            <Text style={styles.text}>
                {dataFilme.titulo} - {dataFilme.genero} - {dataFilme.data} - {dataFilme.nota}
            </Text>

            <TouchableOpacity
                onPress={onDelete}
            >
                <MaterialIcons name="delete" size={24} color="red" />
            </TouchableOpacity>

        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#CECECE",
        padding: 24,
        marginVertical: 5,
        borderRadius: 5,
        gap: 12,
        flexDirection: "row",
    },
    selectedContainer: {
        backgroundColor: "#CECECE",
        padding: 24,
        borderRadius: 5,
        gap: 12,
        flexDirection: "row",

        borderColor: "#000",
        borderWidth: 1,
    },
    text: {
        flex: 1,
    },

});
