let pessoas = JSON.parse(localStorage.getItem("pessoas")) || [];
let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

let pessoaEditando = -1;
let pedidoEditando = -1;


// ---------- PESSOAS ----------

document.getElementById("form-pessoa").onsubmit = function(e) {
    e.preventDefault();

    let nome = document.getElementById("nome").value;
    let cpf = document.getElementById("cpf").value;

    if (pessoaEditando == -1) {
        pessoas.push({ nome, cpf });
    } else {
        pessoas[pessoaEditando] = { nome, cpf };
        pessoaEditando = -1;
    }

    salvar();
    mostrar();
    this.reset();
};


function mostrar() {
    let lista = document.getElementById("lista-pessoas");

    lista.innerHTML = "";

    pessoas.forEach((pessoa, i) => {
        lista.innerHTML += `
            <tr>
                <td>${pessoa.nome}</td>
                <td>${pessoa.cpf}</td>
                <td>
                    <button onclick="editarPessoa(${i})">Editar</button>
                    <button onclick="excluirPessoa(${i})">Excluir</button>
                </td>
            </tr>
        `;
    });

    atualizarClientes();
    mostrarPedidos();
    dashboard();
}


function editarPessoa(i) {
    document.getElementById("nome").value = pessoas[i].nome;
    document.getElementById("cpf").value = pessoas[i].cpf;

    pessoaEditando = i;
}


function excluirPessoa(i) {
    pessoas.splice(i, 1);
    salvar();
    mostrar();
}


// ---------- PEDIDOS ----------

document.getElementById("form-pedido").onsubmit = function(e) {
    e.preventDefault();

    let pedido = {
        cliente: document.getElementById("cliente").value,
        produto: document.getElementById("produto").value,
        valor: Number(document.getElementById("valor").value),
        status: document.getElementById("status").value,
        data: document.getElementById("data").value
    };

    if (pedidoEditando == -1) {
        pedidos.push(pedido);
    } else {
        pedidos[pedidoEditando] = pedido;
        pedidoEditando = -1;
    }

    salvar();
    mostrarPedidos();
    dashboard();
    this.reset();
};


function mostrarPedidos() {
    let lista = document.getElementById("lista-pedidos");

    lista.innerHTML = "";

    pedidos.forEach((pedido, i) => {
        lista.innerHTML += `
            <tr>
                <td>${pedido.cliente}<br>${pedido.produto}</td>
                <td>R$ ${pedido.valor.toFixed(2)}</td>
                <td>${pedido.status}</td>
                <td>
                    <button onclick="editarPedido(${i})">Editar</button>
                    <button onclick="excluirPedido(${i})">Excluir</button>
                </td>
            </tr>
        `;
    });
}


function editarPedido(i) {
    let p = pedidos[i];

    document.getElementById("cliente").value = p.cliente;
    document.getElementById("produto").value = p.produto;
    document.getElementById("valor").value = p.valor;
    document.getElementById("status").value = p.status;
    document.getElementById("data").value = p.data;

    pedidoEditando = i;
}


function excluirPedido(i) {
    pedidos.splice(i, 1);
    salvar();
    mostrarPedidos();
    dashboard();
}


// ---------- DASHBOARD ----------

function dashboard() {

    document.getElementById("total-clientes").textContent =
        pessoas.length;

    document.getElementById("total-pedidos").textContent =
        pedidos.length;

    document.getElementById("pedidos-pendentes").textContent =
        pedidos.filter(p => p.status == "Pendente").length;

    document.getElementById("pedidos-concluidos").textContent =
        pedidos.filter(p => p.status == "Concluído").length;

    document.getElementById("pedidos-cancelados").textContent =
        pedidos.filter(p => p.status == "Cancelado").length;

    let total = pedidos.reduce((soma, p) => soma + p.valor, 0);

    document.getElementById("valor-vendido").textContent =
        "R$ " + total.toFixed(2);

    document.getElementById("media-pedido").textContent =
        pedidos.length ? "R$ " + (total / pedidos.length).toFixed(2) : "R$ 0.00";

    let hoje = new Date().toISOString().split("T")[0];

    document.getElementById("pedidos-hoje").textContent =
        pedidos.filter(p => p.data == hoje).length;
}


// ---------- OUTRAS FUNÇÕES ----------

function atualizarClientes() {
    let select = document.getElementById("cliente");

    select.innerHTML = "";

    pessoas.forEach(pessoa => {
        select.innerHTML +=
            `<option>${pessoa.nome}</option>`;
    });
}


function salvar() {
    localStorage.setItem("pessoas", JSON.stringify(pessoas));
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
}


// INICIAR
mostrar();
dashboard();