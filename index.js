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
  // console.log(completas);
  console.log("Tarefas concluídas: ");
  completas.forEach((a) => console.log(a.title));
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
  console.log("Tarefa adicionada!");
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
const listarPrioridade = async (prioridade) => {
  const json = await lerTarefas();
  const filtradas = json.tasks.filter((p) => p.priority == prioridade);
  console.log(filtradas);
};

//8
const atualizarMultiplosCampos = async (id, novoTitulo, descricao, prioridade, tags) => {
  const json = await lerTarefas();
  const tarefa = json.tasks.find((p) => p.id === id);

  if (tarefa) {
    tarefa.title = novoTitulo;
    tarefa.description = descricao;
    tarefa.priority = prioridade;
    tarefa.tags = tags;
    tarefa.updatedAt = new Date().toISOString();
    await fs.writeFile(FILE, JSON.stringify(json, null, 2));
    console.log(
      `\nTítulo da tarefa ${id} atualizado para: ${novoTitulo} \nDescrição da tarefa ${id} atualizado para: ${descricao} \nPrioridade da tarefa ${id} atualizado para: ${prioridade} \nTags da tarefa ${id} alterada para: ${tags}\n`,
    );
  } else {
    console.log(`A tarefa ${id} não existe`);
  }
};

//9
const adicionarTarefaComIdSeguro = async (titulo, descricao, prioridade, tags) => {
  const json = await lerTarefas();

  let id
  do {
    id = Date.now() + Math.floor(Math.random() * 1000);
  } while (json.tasks.find((task) => task.id === id));

  const nova = {
    id: id,
    title: titulo,
    description: descricao,
    completed: false,
    priority: prioridade,
    tags: [tags],
    createdAt: new Date().toISOString,
    updatedAt: null,
  };

  json.tasks.push(nova);
  await fs.writeFile(FILE, JSON.stringify(json, null, 2));

  console.log("Tarefa adicionada com ID seguro");
};

//10
const toggleTarefa = async (id) => {
  const json = await lerTarefas();

  const tarefa = json.tasks.find((tasks) => tasks.id == id);
  if (tarefa) {
    tarefa.completed = !tarefa.completed;
    tarefa.updatedAt = new Date().toISOString();
    await fs.writeFile(FILE, JSON.stringify(json, null, 2));
    console.log("Status alternados");
  } else if (!tarefa) {
    console.log("Tarefa não encontrada");
    return;
  }
};

async function executar() {
  // lerTarefas();
  // mostrarConcluido();
  // adicionarTarefa("Organizar tarefas II", "Organizar a ordem das tarefas", "alta", "Organização")
  // marcarConcluida(2);
  // atualizarTitulo(5, "Novo Título")
  // removerTarefa(5)
  // listarPrioridade("média");
  // atualizarMultiplosCampos(6, "Estudar JavaScript", "Estudar JavaScript hoje", "alta", "Programação",);
  // toggleTarefa(1)
  // adicionarTarefaComIdSeguro("Estudar JavaScript II", "Estudar JavaScript hoje", "alta", "Programação");
}
executar();
