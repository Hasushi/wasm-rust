// wasm-pack build --target web で生成された JS ラッパを読み込む
import init, { add_and_notify } from "./pkg/wasm_rust.js";

async function main() {
  // wasm と JS ランタイムの初期化
  await init();

  const inputA = document.getElementById("input-a");
  const inputB = document.getElementById("input-b");
  const button = document.getElementById("calc-btn");
  const resultSpan = document.getElementById("result");
  const logSpan = document.getElementById("log");

  // Rust から import される関数 notifyResult をグローバルに定義
  // （#[wasm_bindgen(js_name = notifyResult)] と対応）
  window.notifyResult = (x) => {
    logSpan.textContent = `notifyResult(${x}) が Rust から呼ばれました`;
    console.log("notifyResult from Rust:", x);
  };

  button.addEventListener("click", () => {
    const a = Number(inputA.value);
    const b = Number(inputB.value);

    if (Number.isNaN(a) || Number.isNaN(b)) {
      resultSpan.textContent = "数値を入力してください";
      return;
    }

    // Rust の add_and_notify を呼ぶ
    const sum = add_and_notify(a, b);

    // 戻り値も画面に出す
    resultSpan.textContent = String(sum);
  });
}

main().catch((e) => {
  console.error("init error:", e);
});
