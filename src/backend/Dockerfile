# This environment has python preinstalled and is suitable for running a Flask application.
FROM python:3.12-slim

# Set environment variables
ENV FLASK_APP=app.py
ENV FLASK_ENV=production
ENV PORT=8080

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpq-dev \
    && apt-get clean

# Set the working directory
WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application codes
COPY . /app

# Expose the port Flask will run on
EXPOSE $PORT

# Use Gunicorn for production-ready server
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:8080", "app:app"]

