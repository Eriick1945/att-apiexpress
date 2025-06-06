
const { Pool } = require('pg');
const fs = require('fs');

// Configuração da conexão com o PostgreSQL
const pool = new Pool({
  user: 'atividadexpress_user',
  host: 'dpg-d11h44ndiees73fch4vg-a.oregon-postgres.render.com',
  database: 'atividadexpreess',
  password: 'CeXEKRtr81qju4l6gEeIMBo278mbk1D1',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

// Função para executar o script SQL
async function executeSqlScript() {
  const client = await pool.connect();
  
  try {
    // Lê o arquivo SQL
    const sqlScript = fs.readFileSync('setup.sql', 'utf8');
    
    console.log('Iniciando execução do script SQL...');
    
    // Divide o script em comandos individuais (separados por ;)
    const commands = sqlScript.split(';').filter(command => command.trim() !== '');
    
    // Executa cada comando sequencialmente
    for (const command of commands) {
      if (command.trim()) {
        console.log(`Executando: ${command.trim().substring(0, 50)}...`);
        await client.query(command);
      }
    }
    
    console.log('Script SQL executado com sucesso!');
  } catch (error) {
    console.error('Erro ao executar script SQL:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

// Chama a função principal
executeSqlScript();
