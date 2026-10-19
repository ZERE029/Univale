// Dados de exemplo (os 4 animais que aparecem na referência).
const animais = [
  { id: 1, nome: "Thor",    especie: "cachorro", porte: "medio",   castrado: true,  vacinado: true, feminino: false, status: "disponivel", foto: "img/thor.png" },
  { id: 2, nome: "Simba",   especie: "cachorro", porte: "pequeno", castrado: true,  vacinado: true, feminino: false, status: "disponivel", foto: "img/simba.png" },
  { id: 3, nome: "Tico",    especie: "gato",     porte: "pequeno", castrado: true,  vacinado: true, feminino: false, status: "disponivel", foto: "img/tico.png" },
  { id: 4, nome: "Belinha", especie: "cachorro", porte: "grande",  castrado: false, vacinado: true, feminino: true,  status: "processo",   foto: "img/belinha.png" },
  { id: 5, nome: "Mel",       especie: "cachorro", porte: "medio",   castrado: true,  vacinado: true, feminino: true,  status: "disponivel", foto: "img/mel.png" },
  { id: 6, nome: "Romeu",     especie: "gato",     porte: "pequeno", castrado: false, vacinado: true, feminino: false, status: "processo",   foto: "img/romeu.png" },
  { id: 7, nome: "Chico",     especie: "cachorro", porte: "pequeno", castrado: false, vacinado: true, feminino: false, status: "disponivel", foto: "img/chico.png" },
  { id: 8, nome: "Frederico", especie: "cachorro", porte: "pequeno", castrado: true,  vacinado: true, feminino: false, status: "disponivel", foto: "img/frederico.png" },
];

const PORTE = { pequeno: "Pequeno porte", medio: "Médio porte", grande: "Grande porte" };
const ESPECIE = { cachorro: "Cachorro", gato: "Gato" };
const STATUS = { disponivel: "Disponível", processo: "Em processo" };

const $ = (s) => document.querySelector(s);
const grid = $("#grid");
const filtros = { q: "", especie: "todos", porte: null, castrado: false, vacinado: false };

const normaliza = (t) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const rotulo = (a, base) => (a.feminino ? base.replace(/o$/, "a") : base);

function saude(ok, texto) {
  return `<span><i class="fa-regular ${ok ? "fa-circle-check ok" : "fa-circle-xmark no"}"></i>${texto}</span>`;
}

function cardHTML(a) {
  const icone = a.especie === "gato" ? "fa-cat" : "fa-dog";
  const castrado = a.castrado ? rotulo(a, "Castrado") : rotulo(a, "Não castrado");
  return `
    <article class="card">
      <div class="card__photo">
        <img src="${a.foto}" alt="${a.nome}">
        <span class="badge ${a.status === "processo" ? "badge--processo" : ""}"><i class="fa-solid fa-paw"></i>${STATUS[a.status]}</span>
      </div>
      <div class="card__body">
        <h3 class="card__name">${a.nome}</h3>
        <div class="card__meta"><span><i class="fa-solid ${icone}"></i>${ESPECIE[a.especie]}</span><span class="sep"></span><span>${PORTE[a.porte]}</span></div>
        <div class="card__health">${saude(a.castrado, castrado)}${saude(a.vacinado, rotulo(a, "Vacinado"))}</div>
        <button class="card__btn" data-id="${a.id}">Ver detalhes</button>
      </div>
    </article>`;
}

function render() {
  const q = normaliza(filtros.q.trim());
  const lista = animais.filter((a) =>
    (filtros.especie === "todos" || a.especie === filtros.especie) &&
    (!filtros.porte || a.porte === filtros.porte) &&
    (!filtros.castrado || a.castrado) &&
    (!filtros.vacinado || a.vacinado) &&
    (!q || normaliza(`${a.nome} ${ESPECIE[a.especie]} ${PORTE[a.porte]}`).includes(q))
  );
  grid.innerHTML = lista.map(cardHTML).join("");
  $("#vazio").hidden = lista.length > 0;
}

// Busca
$("#busca").addEventListener("input", (e) => { filtros.q = e.target.value; render(); });
$("#btnBusca").addEventListener("click", () => { $("#busca").scrollIntoView({ block: "center" }); $("#busca").focus(); });

// Espécie (seleção única) e porte (clicar de novo desmarca)
document.querySelectorAll(".chips[data-group]").forEach((grupo) => {
  grupo.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    const chave = grupo.dataset.group, valor = chip.dataset.value;
    filtros[chave] = chave === "porte" && filtros.porte === valor ? null : valor;
    sincronizaChips();
    render();
  });
});

function sincronizaChips() {
  document.querySelectorAll(".chips[data-group] .chip").forEach((c) => {
    const chave = c.closest(".chips").dataset.group;
    c.classList.toggle("is-active", filtros[chave] === c.dataset.value);
  });
  [["#fCastrado", "castrado"], ["#fVacinado", "vacinado"]].forEach(([sel, chave]) =>
    $(sel).setAttribute("aria-pressed", filtros[chave]));
}

// Castrado / Vacinado
[["#fCastrado", "castrado"], ["#fVacinado", "vacinado"]].forEach(([sel, chave]) =>
  $(sel).addEventListener("click", () => { filtros[chave] = !filtros[chave]; sincronizaChips(); render(); }));

// Limpar filtros (também usado por "ver todos")
function limpar() {
  Object.assign(filtros, { q: "", especie: "todos", porte: null, castrado: false, vacinado: false });
  $("#busca").value = "";
  sincronizaChips();
  render();
}
$("#limpar").addEventListener("click", limpar);
$("#verTodos").addEventListener("click", limpar);

// Detalhes do animal
grid.addEventListener("click", (e) => {
  const btn = e.target.closest(".card__btn");
  if (!btn) return;
  const a = animais.find((x) => x.id === +btn.dataset.id);
  $("#mNome").textContent = a.nome;
  $("#mInfo").innerHTML = [
    ESPECIE[a.especie], PORTE[a.porte],
    a.castrado ? rotulo(a, "Castrado") : rotulo(a, "Não castrado"),
    rotulo(a, "Vacinado"), STATUS[a.status],
  ].map((t) => `<li>${t}</li>`).join("");
  $("#modal").showModal();
});

// Menu mobile
const toggle = $("#menuToggle"), nav = $("#nav");
toggle.addEventListener("click", () => {
  const aberto = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", aberto);
});
nav.addEventListener("click", (e) => {
  if (!e.target.closest("a")) return;
  nav.querySelectorAll(".nav__link").forEach((l) => l.classList.toggle("is-active", l === e.target));
  nav.classList.remove("is-open");
});

render();
