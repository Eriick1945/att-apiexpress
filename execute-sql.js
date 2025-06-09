
const { Pool } = require('pg');
const fs = require('fs');


// Configuração da conexão com o PostgreSQL
const pool = new Pool({
  user: 'database_7y85_user',
  host: 'dpg-d13jqji4d50c739h7770-a.oregon-postgres.render.com',
  database: 'database_7y85',
  password: 'ZBJ5fq8rge8kYCg1kZiUCCYJdU1JJaPz',
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
