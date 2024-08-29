// hooks/usarBD.js

import { useSQLiteContext } from 'expo-sqlite';

export default function usarBD() {
    const bd = useSQLiteContext();

    async function create(dados) {
        const regras = await bd.prepareAsync(
            "INSERT INTO filmes (titulo, genero, data, nota) VALUES ($titulo, $genero, $data, $nota)"
        );

        try {
            const result = await regras.executeAsync({
                $titulo: dados.titulo,
                $genero: dados.genero,
                $data: dados.data,
                $nota: dados.nota,
            });

            const idProduto = result.lastInsertRowId.toLocaleString();
            return { idProduto };
        } catch (error) {
            throw error;
        } finally {
            await regras.finalizeAsync();
        }
    }

    async function remove(id) {

        const regras = await bd.prepareAsync(
            'DELETE FROM filmes WHERE id = $id'
        );

        try {
            await regras.executeAsync({
                $id: id,
            });

        } catch (error) {
            throw error;
        } finally {
            await regras.finalizeAsync();
        }
    }

    async function edit(id, dados) {
        const regras = await bd.prepareAsync(
            "UPDATE filmes SET titulo = $titulo, genero = $genero, data = $data, nota = $nota WHERE id = $id"
        );

        try {
            await regras.executeAsync({
                $id: id,
                $titulo: dados.titulo,
                $genero: dados.genero,
                $data: dados.data,
                $nota: dados.nota,
            });
        } catch (error) {
            throw error;
        } finally {
            await regras.finalizeAsync();
        }
    }


    async function read(titulo, filtro, ordem) {
        let consulta;
        let parametros;



        if (titulo.trim() === "") {
            // Se o título estiver vazio, não usa a cláusula LIKE
            consulta = `SELECT * FROM filmes ORDER BY ${filtro} ${ordem};`;
            parametros = [];  // Sem parâmetros necessários
        } else {
            // Se o título não estiver vazio, usa a cláusula LIKE
            consulta = `SELECT * FROM filmes WHERE titulo LIKE ? ORDER BY ${filtro} ${ordem};`;
            parametros = [`%${titulo}%`];  // Parâmetros para a cláusula LIKE
        }

        try {
            const resposta = await bd.getAllAsync(consulta, parametros);
            return resposta;
        } catch (error) {
            throw error;
        }

    }


    return { create, read, remove, edit };
}