# 家計簿エンドポイント

## expenses

- `GET /expenses`： `expenses`テーブルの全てのデータを取得。
- `GET /expenses?id=XXX`： `expenses`テーブルの ID を指定してデータを取得。
- `POST /expenses`： `expenses`テーブルにデータを追加。追加データは、POST 時に body に入れる。※ID は不要
- `DELETE /expenses?id=XXX`： `expenses`テーブルの ID を指定してデータを削除。
- `PATCH /expenses`： `expenses`テーブルの ID を指定してデータを変更。変更内容は body に入れる。

### GET/expenses

- リクエストパス

```
/expenses
```

- リクエストボディ

```
なし
```

- レスポンス
  - `expenses`テーブルの全てのデータを返却。

```
[
    {
        "id": 1,
        "date": "2022-10-31T15:00:00.000Z",
        "category": "交際費",
        "note": "会社の飲み会",
        "deposit": "0",
        "withdrawal": "5000"
    },
    {
        "id": 2,
        "date": "2022-10-31T15:00:00.000Z",
        "category": "給料",
        "note": "10月分給料",
        "deposit": "300000",
        "withdrawal": "0"
    },
    .....
]
```

### GET /expenses?id=XXX

- リクエストパス

```
/expenses/?id=XXX
XXX：expensesテーブルのid
```

- リクエストボディ

```
なし
```

- レスポンス
  - `expenses`テーブルの指定した ID のデータを返却

```
[
    {
        "id": 2,
        "date": "2022-10-31T15:00:00.000Z",
        "category": "給料",
        "note": "10月分給料",
        "deposit": "300000",
        "withdrawal": "0"
    }
]
```

### POST /expenses

- リクエストパス

```
/expenses
```

- リクエストボディ

```
{
	"date": "20221105",
	"category": "水道光熱費",
	"note": "10月分水道代",
	"deposit": 0,
	"withdrawal": 2000
}
```

- レスポンス
  - `expenses`テーブルの全てのデータを返却。

```
[
    {
        "id": 1,
        "date": "2022-10-31T15:00:00.000Z",
        "category": "交際費",
        "note": "会社の飲み会",
        "deposit": "0",
        "withdrawal": "5000"
    },
    {
        "id": 2,
        "date": "2022-10-31T15:00:00.000Z",
        "category": "給料",
        "note": "10月分給料",
        "deposit": "300000",
        "withdrawal": "0"
    },
    .....
]
```

### DELETE /expenses?id=XXX

- リクエストパス

```
/expenses/?id=XXX
XXX：expensesテーブルのid
```

- リクエストボディ

```
なし
```

- レスポンス
  - `expenses`テーブルの全てのデータを返却。

```
[
    {
        "id": 1,
        "date": "2022-10-31T15:00:00.000Z",
        "category": "交際費",
        "note": "会社の飲み会",
        "deposit": "0",
        "withdrawal": "5000"
    },
    {
        "id": 2,
        "date": "2022-10-31T15:00:00.000Z",
        "category": "給料",
        "note": "10月分給料",
        "deposit": "300000",
        "withdrawal": "0"
    },
    .....
]
```

### PATCH /expenses

- リクエストパス

```
/expenses
```

- リクエストボディ

```
{
  "id": 3,
	"note": "食費（カフェ）",
	"withdrawal": 3000
}
```

- レスポンス
  - `expenses`テーブルの全てのデータを返却。

```
[
    {
        "id": 1,
        "date": "2022-10-31T15:00:00.000Z",
        "category": "交際費",
        "note": "会社の飲み会",
        "deposit": "0",
        "withdrawal": "5000"
    },
    {
        "id": 2,
        "date": "2022-10-31T15:00:00.000Z",
        "category": "給料",
        "note": "10月分給料",
        "deposit": "300000",
        "withdrawal": "0"
    },
    .....
]
```
