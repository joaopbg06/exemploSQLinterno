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
        const regras = await bd.prepareAsync("DELETE FROM filmes WHERE id = $id");

        try {
            const resultado = await regras.executeAsync({ $id: id });
            if (resultado.rowsAffected === 0) {
                console.log(`Nenhum item encontrado com o ID ${id}`);
            } else {
                console.log(`Item com ID ${id} removido com sucesso.`);
            }
        } catch (error) {
            console.error("Erro ao remover o item:", error);
            throw error;
        } finally {
            await regras.finalizeAsync();
        }
    }

    async function read(id) {
        try {
            const consulta = "SELECT * FROM filmes WHERE id ";

            const resposta = await bd.getAllAsync(consulta, [id])

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
    
        // Prepara a consulta (não é necessário usar prepareAsync para consultas SELECT sem parâmetros)
        // Usaremos diretamente o método de execução adequado
    
        try {
            // Executa a consulta e obtém todos os resultados
            const result = await bd.getAllAsync(consulta);
            return result;
        } catch (error) {
            console.error('Erro ao filtrar filmes:', error);
            throw error;
        }
    }
    




    return { create, read, remove, edit, filtrar };
}