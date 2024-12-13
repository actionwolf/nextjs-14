### Manual Setting

```js
// package.json 생성
yarn init-y

// react, next, react-dom 생성
yarn add next react react-dom
```

```js
// app/page.tsx 생성
export default function Page() {
  return <h1>Home</h1>;
}
```

```js
// package.json 에 script 추가
{ ...,

  "scripts":{
    "dev": "next dev"
  },
  ...
}

// 최초 실행시 typescript 자동 설치
yarn dev

// 실행 후 자동생성
-> tsconfig.json
-> node_modules
-> layout.tsx
```

### Mock Api

#### https://nomad-movies.nomadcoders.workers.dev/

- `/movies`: List popular movies
- `/movies/:id`: Get movie by :id
- `/movies/:id/credits`: Get credits for a movie by :id
- `/movies/:id/videos`: Get videos for a movie by :id
- `/movies/:id/providers`: Get providers for a movie by :id
- `/movies/:id/similar`: Get similar movies for a movie by :id

### Required Service

- Vercel
- Prisma
- PlantScale
- Cloudflare
