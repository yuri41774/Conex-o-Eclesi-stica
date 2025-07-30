// Script para enviar todos os arquivos da pasta biblia para o Firestore
// Pré-requisitos:
// 1. Baixe o arquivo de credenciais do Firebase (serviceAccountKey.json) pelo console do Firebase
// 2. Instale as dependências: npm install firebase-admin
// 3. Execute: node uploadBibliaToFirestore.js

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Caminho para o arquivo de credenciais
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const bibliaDir = path.join(__dirname, 'public', 'biblia');

async function uploadAll() {
  const versoes = fs.readdirSync(bibliaDir).filter(v => v.startsWith('biblia_'));
  for (const versaoDir of versoes) {
    const versao = versaoDir.replace('biblia_', '');
    const versaoPath = path.join(bibliaDir, versaoDir);
    const livros = fs.readdirSync(versaoPath).filter(f => f.endsWith('.json'));
    for (const livroFile of livros) {
      const livroAbrev = path.basename(livroFile, '.json');
      const livroPath = path.join(versaoPath, livroFile);
      const conteudo = JSON.parse(fs.readFileSync(livroPath, 'utf8'));
      // Estrutura: array de objetos, cada objeto = capítulo
      // Exemplo: [{"1": {"1": "No princípio...", ...}}, ...]
      // Vamos salvar em: biblia/{versao}/{livroAbrev}/capitulo/versiculo
      for (let i = 0; i < conteudo.length; i++) {
        const capObj = conteudo[i];
        const capNum = Object.keys(capObj)[0];
        const versiculos = capObj[capNum];
        for (const [versNum, texto] of Object.entries(versiculos)) {
          const docRef = db.collection('biblia')
            .doc(versao)
            .collection(livroAbrev)
            .doc(`${capNum}_${versNum}`);
          await docRef.set({
            capitulo: Number(capNum),
            versiculo: Number(versNum),
            texto: texto
          });
          console.log(`Enviado: ${versao}/${livroAbrev} cap ${capNum} v${versNum}`);
        }
      }
    }
  }
  console.log('Upload concluído!');
  process.exit(0);
}

uploadAll().catch(e => { console.error(e); process.exit(1); });
