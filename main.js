// main.js

let wasmInstance = null;

async function initWasm() {
  const resp = await fetch("./wasm_add.wasm");
  if (!resp.ok) {
    throw new Error(`failed to fetch wasm: ${resp.status} ${resp.statusText}`);
  }

  const bytes = await resp.arrayBuffer();
  const { instance } = await WebAssembly.instantiate(bytes, {});
  wasmInstance = instance;
  console.log("Wasm loaded");
}

function setupUI() {
  const inputA = document.getElementById("input-a");
  const inputB = document.getElementById("input-b");
  const button = document.getElementById("calc-btn");
  const resultSpan = document.getElementById("result");

  button.addEventListener("click", () => {
    if (!wasmInstance) {
      alert("Wasm がまだ読み込み中です…");
      return;
    }

    const a = Number(inputA.value);
    const b = Number(inputB.value);

    // NaN 対策
    if (Number.isNaN(a) || Number.isNaN(b)) {
      resultSpan.textContent = "数値を入力してください";
      return;
    }

    // Rust の add(a, b) を呼び出し
    const sum = wasmInstance.exports.add(a, b);
    resultSpan.textContent = String(sum);
  });
}

initWasm().catch((e) => {
  console.error(e);
  alert("Wasm の初期化に失敗しました。コンソールを確認してください。");
});

setupUI();
