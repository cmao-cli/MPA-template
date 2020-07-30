# Base image
FROM registry.cn-hangzhou.aliyuncs.com/codemaohub/codemao-master:11-onbuild

# Download qshell
RUN mkdir /srv/qiniu && \
  curl -o /srv/qiniu/qshell https://ops-files.codemao.cn/qshell && \
  chmod -R +x /srv/qiniu

# Workdir is unprivileged user home
WORKDIR /usr/src/app

# Copy dependency information
COPY package.json package-lock.json .npmrc /usr/src/app/

# Install node dependencies, don't modify lockfile
RUN npm install

# Copy Codes
COPY . /usr/src/app/
RUN chown codemao:codemao www

# Switch to unprivileged user
USER codemao

# Build
ARG front_env
RUN npm run build:docker

# Upload QN
ARG QN_AKEY
ARG QN_SKEY
RUN ./bin/qn.sh

# Entry point
ENTRYPOINT ["npm", "run"]
CMD ["start:docker"]
