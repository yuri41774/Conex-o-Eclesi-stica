Esta pasta contém os arquivos de livros da Bíblia em formato JSON, organizados por versão (NVI, ACF, AA).

Padrão dos arquivos:
- Cada versão está em uma subpasta (ex: biblia_nvi, biblia_acf, biblia_aa).
- Cada livro está em um arquivo separado, nomeado conforme o livro (ex: genesis.json, exodo.json).

Formato dos arquivos:
{
  "book": "Gênesis",
  "abbrev": {"pt": "gn", "en": "gen"},
  "chapters": [
    {"1": {"1": "No princípio criou Deus os céus e a terra.", ...}},
    ...
  ]
}

Cada capítulo é um objeto, onde as chaves são os números dos capítulos e versículos.
Os arquivos foram atualizados a partir do repositório original: https://github.com/thiagobodruk/biblia
