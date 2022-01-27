# DAO Stats

[![Release version](https://img.shields.io/github/v/release/near-daos/dao-stats-ui)](https://github.com/near-daos/dao-stats-ui/releases/)
[![Build](https://github.com/near-daos/dao-stats-ui/actions/workflows/build-deploy.yaml/badge.svg)](https://github.com/near-daos/dao-stats-ui/actions/workflows/build-deploy.yaml)

A simple dashboard to get insights about different DAOs for communities.

#### Technology stack

- DaoStats backend: **[DaoStats API Middleware](https://github.com/near-daos/dao-stats-api)**
- Package manager: **[Yarn](https://yarnpkg.com/)**
- Core programming language: **[TypeScript](https://www.typescriptlang.org/)**
- Application framework: **[React](https://reactjs.org/)**
- Code quality: **[Eslint](https://eslint.org/), [Prettier](https://prettier.io/)**
- Containers: **[Docker](https://www.docker.com/)**
- Deployment: **[Kubernetes](https://kubernetes.io/)**

#### Status

[Change Log](https://github.com/near-daos/dao-stats--ui/releases/latest)

#### Links

Dev: [https://develop.daostats.io/](https://develop.daostats.io/)  
Production: [https://daostats.io/](https://daostats.io/)

## Getting Started

###### Clone the repo

```
git clone git@github.com:near-daos/dao-stats-ui.git
```

###### Install dependencies

```bash
yarn install
```

###### Prepare local configuration

Rename `.env.example` file in project folder to `.env.local`. It should have following content:

```bash
REACT_APP_API_ENDPOINT=https://mainnet.api.daostats.io/
```

###### Run development server

```bash
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
