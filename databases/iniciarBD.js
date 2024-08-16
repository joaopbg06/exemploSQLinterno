export async function IniciarBD(bd) {
  await bd.execAsync(`
      CREATE TABLE IF NOT EXISTS filmes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        genero TEXT NOT NULL,
        data DATE,    
        nota FLOAT          
);

    `);
}
// façam a tabela ai 

//ta feita já KKK