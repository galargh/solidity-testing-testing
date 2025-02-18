FROM node:22-alpine AS hardhat
ARG HARDHAT_REF_NAME

RUN apk add --no-cache git
RUN npm install -g pnpm

RUN git clone --depth 1 --branch=${HARDHAT_REF_NAME} https://github.com/NomicFoundation/hardhat.git /hardhat

WORKDIR /hardhat
RUN git rev-parse HEAD

WORKDIR /hardhat/v-next/hardhat
RUN pnpm install --frozen-lockfile --prefer-offline
RUN pnpm build
RUN pnpm pack

FROM node:22-alpine
ARG PROJECT_REPOSITORY

COPY --from=hardhat /hardhat/v-next/hardhat/*.tgz /hardhat/

WORKDIR /hardhat
RUN npm install -g *.tgz

RUN apk add --no-cache git
RUN apk add --no-cache jq
RUN apk add --no-cache bash

RUN git clone --depth 1 --recurse-submodules https://github.com/${PROJECT_REPOSITORY}.git /project

COPY repositories.json init.sh /test/
RUN /test/init.sh ${PROJECT_REPOSITORY} /project
RUN rm -rf /test

WORKDIR /project
ENTRYPOINT [ "hardhat" ]

# docker run --entrypoint /bin/bash --rm -it
