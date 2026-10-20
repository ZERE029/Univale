const $ = (s, r = document) => r.querySelector(s);
const form = $("#form");
const modo = form.dataset.modo; // "login" ou "cadastro"
const campos = [...form.querySelectorAll("[data-rule]")];

// Cada regra devolve true (ok) ou a mensagem de erro
const regras = {
  nome: (v) => v.trim().split(/\s+/).length >= 2 || "Digite seu nome e sobrenome.",
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || "Digite um e-mail válido.",
  telefone: (v) => v.replace(/\D/g, "").length === 11 || "Use DDD + número, ex.: (43) 99999-9999.",
  senha: (v) => v.length >= 8 || "A senha precisa ter pelo menos 8 caracteres.",
  senhaLogin: (v) => v.length > 0 || "Digite sua senha.",
  confirma: (v) => v === $("#senha").value || "As senhas não coincidem.",
  termos: (v) => v || "Aceite os termos para continuar.",
};

function validar(el) {
  const ok = regras[el.dataset.rule](el.type === "checkbox" ? el.checked : el.value);
  const erro = ok === true ? "" : ok;
  const campo = el.closest(".field");
  campo.classList.toggle("is-invalid", !!erro);
  el.setAttribute("aria-invalid", !!erro);
  $(".error", campo).textContent = erro;
  return !erro;
}

campos.forEach((el) => {
  el.addEventListener("blur", () => { if (el.type !== "checkbox" && el.value) validar(el); });
  el.addEventListener("input", () => { if (el.closest(".field").classList.contains("is-invalid")) validar(el); });
  el.addEventListener("change", () => { if (el.type === "checkbox") validar(el); });
});

// Revalida a confirmação quando a senha muda
$("#senha").addEventListener("input", () => {
  const c = $("#confirma");
  if (c && c.value) validar(c);
});

// Mostrar / ocultar senha
document.querySelectorAll(".toggle-pass").forEach((b) => b.addEventListener("click", () => {
  const i = $("#" + b.dataset.target), mostrar = i.type === "password";
  i.type = mostrar ? "text" : "password";
  b.setAttribute("aria-label", mostrar ? "Ocultar senha" : "Mostrar senha");
  b.firstElementChild.className = mostrar ? "fa-regular fa-eye-slash" : "fa-regular fa-eye";
}));

// Máscara de telefone: (43) 99999-9999
const tel = $("#telefone");
if (tel) tel.addEventListener("input", () => {
  const d = tel.value.replace(/\D/g, "").slice(0, 11);
  tel.value = d.replace(/^(\d{0,2})(\d{0,5})(\d{0,4}).*/, (_, a, b, c) =>
    (a ? `(${a}` : "") + (a.length === 2 && b ? ") " : "") + b + (c ? `-${c}` : ""));
});

// Força da senha (só no cadastro)
const forca = $("#forca");
if (forca) $("#senha").addEventListener("input", (e) => {
  const v = e.target.value;
  const pts = (v.length >= 8) + (/[a-z]/.test(v) && /[A-Z]/.test(v)) + /\d/.test(v) + (/[^\w\s]/.test(v) || v.length >= 12);
  const n = v ? Math.max(1, pts) : 0;
  forca.dataset.n = n;
  [...forca.children].forEach((s, i) => s.classList.toggle("on", i < n));
  $("#forcaTxt").textContent = ["", "Senha fraca", "Senha razoável", "Senha boa", "Senha forte"][n];
});

// Aviso rápido (toast)
const toast = Object.assign(document.createElement("div"), { className: "toast" });
toast.setAttribute("role", "status");
document.body.append(toast);
function aviso(msg) {
  toast.textContent = msg;
  toast.classList.add("is-show");
  clearTimeout(aviso.t);
  aviso.t = setTimeout(() => toast.classList.remove("is-show"), 3500);
}

// PONTO DE INTEGRAÇÃO: hoje é só uma simulação. Troque pelo endpoint da API (Python/MySQL).
// A senha deve ser verificada e guardada (com hash) apenas no servidor, nunca no navegador.
async function enviar(tipo, dados) {
  // const r = await fetch(`/api/${tipo}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(dados) });
  // if (!r.ok) throw new Error((await r.json()).mensagem);
  await new Promise((r) => setTimeout(r, 900));
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const invalidos = campos.filter((c) => !validar(c));
  if (invalidos.length) return invalidos[0].focus();

  const btn = $("button[type=submit]", form), texto = btn.textContent;
  btn.disabled = true;
  btn.textContent = "Aguarde...";
  try {
    await enviar(modo, Object.fromEntries(new FormData(form)));
    aviso(modo === "login" ? "Login realizado! Redirecionando..." : "Conta criada! Vamos para o login...");
    setTimeout(() => (location.href = modo === "login" ? "index.html" : "login.html"), 1200);
  } catch (err) {
    aviso(err.message || "Não foi possível concluir. Tente novamente.");
    btn.disabled = false;
    btn.textContent = texto;
  }
});
