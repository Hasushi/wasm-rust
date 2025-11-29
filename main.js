// main.js

let wasmInstance = null;

async function initWasm() {
  const resp = await fetch("./wasm_add.wasm");
  if (!resp.ok) {
    throw new Error(`failed to fetch wasm: ${resp.status} ${resp.statusText}`);
  }

  const bytes = await resp.arrayBuffer();

  // Rust 側が import している env.notify_result をここで実装する
  const importObject = {
    env: {
      notify_result: (x) => {
        const logSpan = document.getElementById("log");
        logSpan.textContent = `notify_result(${x}) が Rust から呼ばれました`;
        console.log("notify_result from Rust:", x);
      },
    },
  };

  const { instance } = await WebAssembly.instantiate(bytes, importObject);
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

    if (Number.isNaN(a) || Number.isNaN(b)) {
      resultSpan.textContent = "数値を入力してください";
      return;
    }

    // Rust の add_and_notify(a, b) を呼ぶ
    const sum = wasmInstance.exports.add_and_notify(a, b);

    // 戻り値を結果表示に出す
    resultSpan.textContent = String(sum);
  });
}

initWasm().catch((e) => {
  console.error(e);
  alert("Wasm の初期化に失敗しました。コンソールを確認してください。");
});

setupUI();
