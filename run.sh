rustup target add wasm32-unknown-unknown
cargo build --release --target wasm32-unknown-unknown

# 出力をコピー
cp target/wasm32-unknown-unknown/release/wasm_rust.wasm ./wasm_add.wasm

# サーバ起動
uv run python -m http.server 8080
# → http://localhost:8080 を開く
