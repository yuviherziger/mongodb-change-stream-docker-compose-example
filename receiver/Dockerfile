FROM python:3.9-slim

COPY requirements.txt .
COPY app.py receiver/app.py
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

CMD ["bash", "-c", "sleep 5 && uvicorn receiver.app:app --host 0.0.0.0 --port 8000"]