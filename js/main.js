const btAdicionar = document.querySelector('#bt-adicionar')
const itens = JSON.parse(localStorage.getItem("itemList")) || []

itens.forEach(item => {
    adicionarElemento(item.nota)
})

btAdicionar.addEventListener('click', e => {
    e.preventDefault()
    
    const textAreaAdd = document.querySelector('#textarea-add')

    if (textAreaAdd.value !== "") {
        const novoItem = {
            "nota": textAreaAdd.value
        }

        adicionarElemento(novoItem.nota)
        itens.push(novoItem)

        localStorage.setItem("itemList", JSON.stringify(itens))
    
        textAreaAdd.value = ""
    }
})

function adicionarElemento(item) {
    const itemLista = document.createElement('li')
    itemLista.classList.add('item-lista')

    const textAreaEdit = document.createElement('textarea')
    textAreaEdit.classList.add('textarea')
    textAreaEdit.dataset.id = item.id
    textAreaEdit.innerHTML = item

    itemLista.appendChild(textAreaEdit)

    const ulItens = document.querySelector('#ul-itens')
    ulItens.appendChild(itemLista)

    itemLista.appendChild(botaoExcluir(item.id))
}

function botaoExcluir() {
    const btExcluir = document.createElement('button')
    btExcluir.classList.add('button-style')

    btExcluir.innerHTML = `
        <abbr title="Excluir nota">
            <i class="fa-solid fa-trash-can"></i>
        </abbr>
    `

    btExcluir.addEventListener('click', function() {
        excluirElemento(this.parentNode)
    })

    return btExcluir
}

function excluirElemento(tag) {
    tag.remove()

    itens.splice(tag, 1)

    localStorage.setItem("itemList", JSON.stringify(itens))
}   