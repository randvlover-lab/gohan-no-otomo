# ご飯のおとも MVP v7.9

v7.8をベースに、共有起動時に古いindex.htmlが残る問題を解消するためService Workerの更新方式を変更。
- index.html: MVP v7.9
- 自動取得ロジック: v7.8から変更なし
- SW: v4へ更新。アプリ本体のHTMLはネットワーク優先、旧キャッシュを削除。
