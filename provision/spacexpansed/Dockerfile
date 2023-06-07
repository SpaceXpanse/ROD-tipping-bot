FROM ubuntu:20.04

RUN apt-get update

RUN apt-get -y install wget

WORKDIR /usr/src

RUN wget https://github.com/SpaceXpanse/rod-core-wallet/releases/download/v.0.6.8.9/spacexpanse-0.6.8.9-linux64.zip
RUN unzip spacexpanse-0.6.8.9-linux64.zip
RUN chmod +x spacexpansed spacexpanse-cli
RUN ln -s /usr/src/spacexpanse/bin/spacexpansed /usr/bin/spacexpansed
RUN ln -s /usr/src/spacexpanse/bin/spacexpanse-cli /usr/bin/spacexpanse-cli

#ADD spacexpanse.conf /root/.spacexpanse/spacexpanse.conf

EXPOSE 22555 22556 44555 44556 18444

CMD ["spacexpansed", "-printtoconsole"]