import fs from "node:fs/promises";

const FILE = "tasks.json";

//1
const lerTarefas = async () => {
  const data = await fs.readFile(FILE, "utf-8");
  const json = JSON.parse(data);

  // console.log(json.tasks)
  return json;
};

//2
const mostrarConcluido = async () => {
  const json = await lerTarefas();

  const completas = json.tasks.filter((p) => p.completed === true);
  console.log(completas);
};

//3
const adicionarTarefa = async (titulo, descricao, prioridade, tags) => {
  const json = await lerTarefas();

  const novaTarefa = {
    id: json.tasks.length + 1,
    title: titulo,
    description: descricao,
    completed: false,
    priority: prioridade,
    tags: [tags],
    createdAt: new Date().toISOString,
    updatedAt: null,
  };

  json.tasks.push(novaTarefa);
  await fs.writeFile(FILE, JSON.stringify(json, null, 2));
};

//4
const marcarConcluida = async (id) => {
  const json = await lerTarefas();

  const tarefa = json.tasks.find((p) => p.id === id);

  if (tarefa) {
    tarefa.completed = true;
    tarefa.updatedAt = new Date().toISOString();
    await fs.writeFile(FILE, JSON.stringify(json, null, 2));
    console.log(`Tarefa ${id} marcada como concluída`);
  } else {
    console.log(`A tarefa ${id} não foi encontrada`);
  }
};

//5
const atualizarTitulo = async (id, novoTitulo) => {
  const json = await lerTarefas();

  const tarefa = json.tasks.find((p) => p.id === id);

  if (tarefa) {
    tarefa.title = novoTitulo;
    tarefa.updatedAt = new Date().toISOString();
    await fs.writeFile(FILE, JSON.stringify(json, null, 2));
    console.log(`Título da tarefa ${id} atualizado para: ${novoTitulo}`);
  } else {
    console.log(`A tarefa ${id} não existe`);
  }
};

//6
const removerTarefa = async (id) => {
  const json = await lerTarefas();

  const tarefasAtualizadas = json.tasks.filter((p) => p.id !== id);

  if (tarefasAtualizadas.length < json.tasks.length) {
    json.tasks = tarefasAtualizadas;
    await fs.writeFile(FILE, JSON.stringify(json, null, 2));
    console.log(`Tarefa ${id} removida com sucesso`);
  } else {
    console.log(`Tarefa ${id} não encontrada`);
  }
};

//7
const listarPrioridade = async () => {
  const json = await lerTarefas();
  const prioridade = json.tasks.filter((p) => p.priority == "alta");
  console.log(prioridade);
};

async function executar() {
  //   lerTarefas();
  //   mostrarConcluido();
  // adicionarTarefa("Organizar tarefas II", "Organizar a ordem das tarefas", "alta", "Organização")
  //   marcarConcluida(2);
  //   atualizarTitulo(5, "Novo Título")
  //   removerTarefa(5)
  // listarPrioridade()
}
executar();
