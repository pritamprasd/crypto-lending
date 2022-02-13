FROM ubuntu:latest

WORKDIR /app

RUN apt update
RUN apt upgrade -y
RUN apt install python3-dev libpq-dev python-dev gcc wget -y
RUN apt install python3-pip -y

COPY requirements.txt ./requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

ENTRYPOINT ["python3", "./src/app.py"]
