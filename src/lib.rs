use wasm_bindgen::prelude::*;

// グローバル関数 notifyResult(i32) を JS 側に期待する
#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_name = notifyResult)]
    fn notify_result(x: i32);
}

// JS から呼ぶ関数
// 1. a + b を計算
// 2. JS の notifyResult(sum) を呼ぶ
// 3. sum を戻り値として返す
#[wasm_bindgen]
pub fn add_and_notify(a: i32, b: i32) -> i32 {
    let sum = a + b;
    notify_result(sum);
    sum
}
