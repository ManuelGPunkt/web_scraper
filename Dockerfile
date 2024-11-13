FROM python:3.6.15

LABEL Mark Becher

WORKDIR /app

COPY . /app/

RUN pip install flask requests lxml

ENTRYPOINT [ "python", "Flask_Server.py" ]