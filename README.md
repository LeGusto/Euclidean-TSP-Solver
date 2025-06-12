# Euclidean TSP Solver

An interactive web application that solves the Euclidean Traveling Salesman Problem (TSP) using dynamic programming and AWS Lambda for scalable backend calculations. This project combines a responsive Angular frontend with a Flask backend, deployed using Docker and hosted on Render. The frontend is live on GitHub Pages.

This project solves an open-loop version of the Traveling Salesman Problem (TSP), where the goal is to find the shortest route that visits every city in a given set exactly once without returning to the starting point. Unlike the classic TSP (which forms a closed loop), this variant is ideal for scenarios like one-way delivery routes, road trips ending at a final destination, or any path optimization task where the journey terminates at the last city.

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
