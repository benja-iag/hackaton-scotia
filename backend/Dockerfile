FROM python:3.8-slim-buster

WORKDIR /app/
RUN apt update -y && apt install curl -y

COPY requirements.txt .

RUN pip3 install -r requirements.txt

CMD ["flask", "--app", "app", "run", "--host", "0.0.0.0", "--debugger"]