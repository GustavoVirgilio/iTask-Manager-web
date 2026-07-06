class Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  criadaEm: Date;
  concluida: boolean;

  constructor(tituloRecebido: string, descricaoRecebida: string) {
    this.id = Date.now();
    this.titulo = tituloRecebido;
    this.descricao = descricaoRecebida;
    this.criadaEm = new Date();
    this.concluida = false;
  }

  formatarData(): string {
    const data = this.criadaEm.toLocaleDateString("pt-BR");
    const hora = this.criadaEm.toLocaleTimeString("pt-BR");

    return `${data} às ${hora}`;
  }

  renderizar(): HTMLDivElement {
    const card = document.createElement("div");
    card.classList.add("tarefa-card");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const conteudo = document.createElement("div");
    conteudo.classList.add("conteudo-tarefa");

    const titulo = document.createElement("h3");
    titulo.textContent = this.titulo;

    const descricao = document.createElement("p");
    descricao.textContent = this.descricao;

    const dataCriacao = document.createElement("small");
    dataCriacao.textContent = `Criada em: ${this.formatarData()}`;

    checkbox.addEventListener("change", () => {
      this.concluida = checkbox.checked;
      card.classList.toggle("concluida", this.concluida);
    });

    conteudo.appendChild(titulo);

    if (this.descricao !== "") {
      conteudo.appendChild(descricao);
    }

    conteudo.appendChild(dataCriacao);

    card.appendChild(checkbox);
    card.appendChild(conteudo);

    return card;
  }
}

class App {
  tarefas: Tarefa[];

  form: HTMLFormElement;
  inputTitulo: HTMLInputElement;
  inputDescricao: HTMLTextAreaElement;
  listaTarefas: HTMLDivElement;
  mensagemVazia: HTMLParagraphElement;

  constructor() {
    this.tarefas = [];

    this.form = document.getElementById("form-tarefa") as HTMLFormElement;
    this.inputTitulo = document.getElementById("titulo-tarefa") as HTMLInputElement;
    this.inputDescricao = document.getElementById("descricao-tarefa") as HTMLTextAreaElement;
    this.listaTarefas = document.getElementById("lista-tarefas") as HTMLDivElement;
    this.mensagemVazia = document.getElementById("mensagem-vazia") as HTMLParagraphElement;

    this.configurarEventos();
  }

  configurarEventos(): void {
    this.form.addEventListener("submit", (evento) => {
      evento.preventDefault();
      this.adicionarTarefa();
    });
  }

  adicionarTarefa(): void {
    const titulo = this.inputTitulo.value.trim();
    const descricao = this.inputDescricao.value.trim();

    if (titulo === "") {
      return;
    }

    const novaTarefa = new Tarefa(titulo, descricao);

    this.tarefas.push(novaTarefa);
    this.listaTarefas.appendChild(novaTarefa.renderizar());

    this.form.reset();
    this.inputTitulo.focus();

    this.atualizarMensagemVazia();
  }

  atualizarMensagemVazia(): void {
    if (this.tarefas.length === 0) {
      this.mensagemVazia.style.display = "block";
    } else {
      this.mensagemVazia.style.display = "none";
    }
  }
}

new App();