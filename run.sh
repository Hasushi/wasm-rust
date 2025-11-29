wasm-pack build --target web

# サーバ起動
uv run python -m http.server 8080
# → http://localhost:8080 を開く
