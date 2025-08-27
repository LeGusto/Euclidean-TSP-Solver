# Euclidean TSP Solver

An interactive web app that solves the **Euclidean Traveling Salesman Problem (TSP)** using dynamic programming and visualizes the optimal path.  
Unlike the classic closed-loop TSP, this version finds the **shortest one-way path** visiting all cities exactly once — useful for delivery routes, road trips, or one-way optimizations.  

![tsp-thing](https://github.com/user-attachments/assets/6b35db4b-9fc0-4ee6-9ea5-12fdbeeb7155)

---

## 🚀 Features
- **Interactive canvas**: place vertices by clicking  
- **Optimal route calculation**:  calculates the fastest path with a chosen starting vertex
- **Visualization**: path drawn on canvas + total cost shown  

---

## ⚙️ Tech Stack

**Frontend**
- Angular (TypeScript)  
- Web Workers  
- GitHub Pages (hosting)  

**Backend**
- Flask (Python API)  
- AWS Lambda (large-graph solving)  
- Render (Dockerized hosting)  

**Deployment**
- Docker  
- GitHub Actions (CI/CD)  

---

## 📖 How It Works
1. **Place vertices**: click on the canvas  
2. **Calculate**: app finds the shortest one-way route  
3. **Visualize**: optimal path drawn with cost displayed  

---

## 📦 Deployment
- **Frontend** → GitHub Pages  
- **Backend** → Render (Dockerized Flask API)  
- **Scalability** → AWS Lambda  
