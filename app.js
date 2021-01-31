let dados = {};

(async () => {
    dados = await fetch('produtos.json')
        .then(response => {
            return response.json();
        })
        .then(r => {
            return r;
        })
        .catch(err => {
            const app = document.querySelector('#app');
            
            app.innerHTML +=
            `<div class="modal__overlay">
                <div class="modal">
                    <img src="img/ohno.png" alt="" width="60%">
                    <h1 class="modal__title">Óh não!!</h1>
                    <p class="modal__subtitle">Infelizmente não foi possível mostrar os produtos!</p>
                    <p class="modal__texto">Para conseguir ver a lista de produtos abra este arquivo no localhost ou em algum servidor :)</p>
                    <p class="modal__texto">Se preferir acesse o link <a href="https://uinoob.com.br/testeciag" target="_blank">Acesse o teste aqui</a></p>
                </div>
            </div>`

        });

        let produtos_container = document.querySelector('#produtos');
        let quantidade = document.querySelector('#qtd_produtos');
        let valor = document.querySelector('#valor_produtos');

        produtos = dados.produtos.filter(a => a.status == 'ativo')

        let valorTotal = 0;

        for(let i of produtos){
            valorTotal += parseFloat(i.preco)

            produtos_container.innerHTML +=
            `
            <div class="item tab">
                <div class="item__background" style="background-image: url(${i.img})">
                    <div class="item__overlay">
                        
                    </div>
                </div>
                <div class="item__info">
                    <div>
                        <p class="item__title">${i.nome}</p>
                        <div class="item__preco">
                            <span>R$</span>
                            <p>${parseFloat(i.preco).toLocaleString('pt-br', {minimumFractionDigits: 2})}</p>
                        </div>
                    </div>
                    <div class="item__link">
                        <a href="${i.link}" target="_blank"><i class="far fa-eye"></i></a>
                    </div>
                </div>
            </div>`
        }

        
        quantidade.innerHTML = `<b>${produtos.length}</b> produtos`;
        valor.innerHTML = `<b>R$ </b>${parseFloat(valorTotal).toLocaleString('pt-br', {minimumFractionDigits: 2})}`;
})();

let itens = document.getElementsByClassName('item');
let ativo = document.getElementById('ativo');

function list(){
    toggle(ativo, 'ativo--list', 'ativo--tab')

    for(let i of itens){
        toggle(i, 'list', 'tab')
    }
}

function tab(){
    toggle(ativo, 'ativo--tab', 'ativo--list')

    for(let i of itens){
        toggle(i, 'tab', 'list')
    }
}

function toggle(i, add, remove){
    i.classList.remove(remove);
    i.classList.add(add);
}