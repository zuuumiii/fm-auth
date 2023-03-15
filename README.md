## 概要
FileMaker Data API を利用するために必要な **FMID** を取得できます。

## コンテナの立ち上げ
`docker-compose up`

## 初回のみやること
- npm パッケージインストール
`doker-compose run node npm install`

- 環境変数の設定
`.env`ファイルをfmAuthディレクトリに作成
```
export CLARIS_ID=hoge.fuga.@gmial.com # FilemakerのID
export CLARIS_PASS=password # Filemakerのパスワード
export REFRESH_TOKEN= # まだ何も入力しなくてよい。次に入力する
```
- Refresh Token の取得 
`doker-compose run node npm run refresh`実行
実行すると２段階認証のコードを聞かれるので入力してEnter
`Please input verification code : 123456`
レスポンスが返ってくると色々と表示されるが
`Claris ID Refresh Token`を`.env`の`export REFRESH_TOKEN=`にコピペ


## FMIDの取得
`doker-compose run node npm run auth`実行
認証に成功すればレスポンスが表示されます。
**Claris ID Token **が**FMID**になります。# fm-auth