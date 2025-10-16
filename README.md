# Ecoville

Projeto final do curso de desenvolvimento Full Stack do LAB365.

Back-end em Java com Spring boot.

Front-end em React.


# Criação de perfis iniciais de coletores:

Três usuários coletores são criados automaticamente ao rodar o programa pela primeira vez quando a tabela de usuários estiver vazia.

Usuários:

- alice
- bob
- suzane

Senhas: 1234


## Endpoints

### Cadastro de usuários
*/api/usuarios:*

- POST com o seguinte formato:

```json
{
    "nomeDeUsuario": "joao",
    "senha": "1234",
    "perfil": "RESIDENCIAL",
    "endereco": {
        "cep": "85895-100",
        "logradouro": "Avenida Atlântica",
        "estado": "SC",
        "cidade": "Itapoá",
        "bairro": "Centro",
        "numero": "11",
        "complemento": "",
        "latitude": -26.265729, 
        "longitude": -48.861439
    }
}
```

Os valores possíveis para o campo de Perfil são:
- RESIDENCIAL
- COLETOR

### Cadastro de coletas
*/api/coletas?usuarioId=4*:
- POST com o seguinte formato:
```json
{
  "dataAgendada": "2025-10-10",
  "observacoes": "Recolher papel",
  "itens": [
    {
      "tipo": "PAPEL",
      "quantidadeEstimadaKg": 58.10,
      "quantidadeValidadaKg": 50.50,
      "estado": "BOM"
    }
  ]
}
```
Valores possíveis para o "tipo" dos itens são:
- PLASTICO,
- VIDRO,
- PAPEL,
- METAL

Valores possíveis para o campo "estado" do item sã0:
- RUIM
- BOM
- OTIMO

### Listagem de coletas

*/api/coletas/minhas?usuarioId={idUsuarioResidencial}*
- GET


## Atualização de coletas

### Aceitar solicitação

*/api/coletas/{idSolicitacao}/aceitar?coletorId={idColetor}*
- PATCH para mudar status para ACEITA

### Cancelar solicitação
*/api/coletas/{idSolicitacao}/cancelar*
- PATCH para mudar status para CANCELADA

### Finalizar solicitação
*/api/coletas/{idSolicitacao}/finalizar*
- PATCH para mudar Status para FINALIZADA

### Adicionar feedback
*/api/coletas/{idSolicitacao}/feedback*
- PATCH com feedback no corpo, sem objeto, como mostrado:
![alt text](feedback.png)


### Atualizar todos os campos

*/api/coletas/{idSolicitacao}*:

- PUT com o seguinte formato:

```json
{
    "idUsuarioResidencial": 4,
    "idColetor": 1,
    "dataSolicitacao": "2025-10-15T15:30:00",
    "dataAgendada": "2025-10-17",
    "observacoes": "Recolher todo o metal",
    "status": "AGUARDANDO",
    "feedback": "Ótimo cliente",
    "itens": [
        {
        "tipo": "METAL",
        "quantidadeEstimadaKg": 5.15,
        "quantidadeValidadaKg": 5.15,
        "estado": "BOM"
        }
    ]
}
```



