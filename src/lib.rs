// src/lib.rs

// JS 側の関数 `env.notify_result(i32)` をインポート
#[link(wasm_import_module = "env")]
unsafe extern "C" {
    fn notify_result(x: i32);
}

// JS から呼ばれるエクスポート関数
#[unsafe(no_mangle)] // edition 2024 の場合
pub extern "C" fn add_and_notify(a: i32, b: i32) -> i32 {
    let sum = a + b;

    // FFI の呼び出しも unsafe コンテキストで行う
    unsafe {
        notify_result(sum);
    }

    sum
}
