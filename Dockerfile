FROM ubuntu:latest

WORKDIR /app

RUN apt update
RUN apt upgrade -y
RUN apt install python3-pip python3-dev gcc wget -y

RUN pip3 install web3

RUN wget https://gethstore.blob.core.windows.net/builds/geth-linux-amd64-1.10.6-576681f2.tar.gz
RUN    gzip -d geth-linux-amd64-1.10.6-576681f2.tar.gz
RUN    tar -xvf  geth-linux-amd64-1.10.6-576681f2.tar
RUN    ls geth-linux-amd64-1.10.6-576681f2
RUN    cp geth-linux-amd64-1.10.6-576681f2/geth /bin/geth
RUN    chmod 700 /bin/geth

RUN pip3 install py-solc-x
RUN python3 -m solcx.install v0.8.6

ENTRYPOINT [ "geth", "--dev", \
                "--datadir=/app/.ethereum", \
                "--http", \
                "--http.corsdomain='*'", \
                "--http.vhosts='*'", \
                "--http.addr=0.0.0.0", \
                "--http.api=eth,web3",\
                "--networkid=123698745"\
            ]
