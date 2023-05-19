
# Как создать проект

npx create-next-app@latest .

firebase experiments:enable webframeworks

firebase init hosting
(надо выбрать Set up automatic builds and deploys with GitHub? Yes)

(попросит перейти на тарифный план Blaze, нужно для deploy)

<https://console.firebase.google.com/project/<project-id>/usage/details>

firebase deploy

<https://<project-id>.web.app/api/hello>

<https://<project-id>.web.app>

В .github/workflows/*.yml добавить 
```yml
      - uses: FirebaseExtended/action-hosting-deploy@v0
      ...
        env:
          FIREBASE_CLI_EXPERIMENTS: webframeworks
```

Добавить роли:
<https://console.cloud.google.com/iam-admin/iam?authuser=0&consoleUI=FIREBASE&hl=en&project=<project-id>>
в GitHub Actions (sergeychernov/<project-id>)
Api Keys Admin
Artifact Registry Administrator
Cloud Build Service Account
Cloud Functions Admin
Cloud RuntimeConfig Admin
Firebase Admin
Service Account User
Service Account Key Admin

Создать БД:
<https://console.firebase.google.com/project/<project-id>/firestore>

firebase init firestore

npm install firebase-admin --save

### Для локальной разработки

gcloud auth login

gcloud config set project PROJECT_ID

gcloud auth application-default login

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
