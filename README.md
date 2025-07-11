# Euclidean TSP Solver

An interactive web application that solves the Euclidean Traveling Salesman Problem (TSP) using dynamic programming, then displays the resulting path visually.

This project solves an open-loop version of the Traveling Salesman Problem (TSP), where the goal is to find the shortest route that visits every city in a given set exactly once without returning to the starting point. Unlike the classic TSP (which forms a closed loop), this variant is ideal for scenarios like one-way delivery routes, road trips ending at a final destination, or any path optimization task where the journey terminates at the last city.

![tsp-thing](https://github.com/user-attachments/assets/6b35db4b-9fc0-4ee6-9ea5-12fdbeeb7155)


## Features

### Interactive Vertex Placement
- Users can place vertices on a canvas to define the graph
- Preview vertex placement with real-time feedback

### Optimal Path Calculation
- Calculates the shortest path using dynamic programming
- For smaller graphs (≤18 vertices), computations are handled locally using Web Workers
- For larger graphs, computations are offloaded to AWS Lambda for scalability

### Visualization
- Displays the optimal path with connecting lines on the canvas
- Provides the total cost of the path

### Responsive Design
- Ensures smooth performance even for larger graphs

## Technologies Used

### Frontend
- Angular
- TypeScript
- Web Workers for local calculations

### Backend
- Flask
- Python
- AWS Lambda for scalable TSP calculations

### Deployment
- Dockerized backend hosted on Render
- Frontend hosted on GitHub Pages
- Github Actions for automatic deployment

## How It Works

1. **Vertex Placement**
   - Click on the canvas to place vertices
   - After clicking calculate, the application calculate the optimal TSP route for the given vertices based on euclidean distance

2. **Path Calculation**
   - For smaller graphs, the TSP is solved locally using Web Workers
   - For larger graphs, the adjacency matrix is sent to the Flask backend, which forwards the request to an AWS Lambda function for computation

3. **Visualization**
   - The optimal path is drawn on the canvas
   - The total cost is displayed

## Tech Stack

### **Frontend**
- **Framework**: [Angular](https://angular.io/) (TypeScript)
- **Web Workers**: Offload TSP computations (≤18 vertices) to avoid UI blocking
- **Hosting**: [GitHub Pages](https://pages.github.com/)

### **Backend**
- **Framework**: [Flask](https://flask.palletsprojects.com/) (Python)
- **Serverless Compute**: [AWS Lambda](https://aws.amazon.com/lambda/) (scalable TSP solver for large graphs)
- **API**: RESTful endpoints for TSP requests
- **Hosting**: [Render](https://render.com/) (Dockerized)

### **Deployment & Infrastructure**
- **Containerization**: [Docker](https://www.docker.com/)
- **CI/CD**: [GitHub Actions](https://github.com/features/actions)

