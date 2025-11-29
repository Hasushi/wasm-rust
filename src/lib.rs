// src/lib.rs

// JS からそのまま見えるようにするおまじない
#[unsafe(no_mangle)]
pub extern "C" fn add(a: i32, b: i32) -> i32 {
    a + b
}
