// hooks/usarBD.js

import { useSQLiteContext } from 'expo-sqlite';

export default function usarBD() {
    const bd = useSQLiteContext();

    async function create(dados) {
        const regras = await bd.prepareAsync(
            "INSERT INTO filmes (titulo, genero, data, nota) VALUES ($nome, $quantidade, $data, $nota)"
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
        try {
            await bd.execAsync("DELETE FROM filmes WHERE id = ?", [id]);
        } catch (error) {
            throw error;
        }
    }

    async function read(titulo) {
        try {
            const consulta = "SELECT * FROM filmes WHERE titulo LIKE ?";
            const resposta = await bd.getAllAsync(consulta, [`%${titulo}%`]);
            return resposta;
        } catch (error) {
            throw error;
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

    async function filtrar(filtro) {
        // Verifica se o filtro é válido para evitar SQL Injection
        const colunasPermitidas = ['titulo', 'genero', 'data', 'nota'];
        if (!colunasPermitidas.includes(filtro)) {
            throw new Error('Filtro inválido.');
        }

        // Constrói a consulta SQL dinamicamente
        const consulta = `SELECT * FROM filmes ORDER BY ${filtro} DESC`;

        const regras = await bd.prepareAsync(consulta);

        try {
            const result = await regras.allAsync(); // Executa a consulta e obtém todos os resultados
            return result;
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            await regras.finalizeAsync(); // Libera recursos
        }
    }


    return { create, read, remove, edit, filtrar };
}