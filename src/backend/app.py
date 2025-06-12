from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app, origins=["https://legusto.github.io"])

LAMBDA_URL = os.getenv("LAMBDA_URL")

@app.route("/solve-tsp", methods=["POST"])
def solve_tsp():
    try:
        # Get the vertices and edges from the request body
        data = request.get_json()
        vertices = data.get("vertices")
        edges = data.get("edges")

        if not vertices or not edges:
            return jsonify({"error": "Invalid input: vertices and edges are required"}), 400

        # Send the request to the Lambda function URL
        response = requests.post(LAMBDA_URL, json={"vertices": vertices, "edges": edges})

        # Check if the Lambda function responded successfully
        if response.status_code != 200:
            return jsonify({"error": "Error calling Lambda function", "details": response.text}), response.status_code

        # Return the Lambda function response
        return jsonify(response.json()), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)