FROM ubuntu:24.04

RUN apt-get update && apt-get install -y curl xz-utils git jq
RUN curl -sL https://nodejs.org/dist/v22.10.0/node-v22.10.0-linux-x64.tar.xz -o node-v22.10.0-linux-x64.tar.xz
RUN tar -xf node-v22.10.0-linux-x64.tar.xz
RUN ls -la node-v22.10.0-linux-x64/bin

ENV PATH="/node-v22.10.0-linux-x64/bin:${PATH}"

RUN npm install -g pnpm bun yarn

ARG HARDHAT_VERSION
RUN npm install -g @ignored/hardhat-vnext@${HARDHAT_VERSION}

ARG PROJECT_REPOSITORY
RUN git clone --depth 1 --recurse-submodules https://github.com/${PROJECT_REPOSITORY}.git /project

COPY repositories.json init.sh /test/
RUN /test/init.sh ${PROJECT_REPOSITORY} /project
RUN rm -rf /test

WORKDIR /project
ENTRYPOINT [ "hardhat" ]

# docker run --entrypoint /bin/bash --rm -it
