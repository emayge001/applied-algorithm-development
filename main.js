const dijkstra = (graph, start) => {
    const distances = {}; // Create an empty object to store the distances to each vertex
    const visited = {}; // Create an empty object to keep track of visited vertices
    const pq = new PriorityQueue(); // Create a priority queue to prioritize vertices with the smallest distance

    // Initialize distances
    for (const vertex in graph) { // Loop through each vertex in the graph
        distances[vertex] = vertex === start ? 0 : Infinity; // Set the distance to each vertex to Infinity, except for the start vertex which is set to 0
        pq.enqueue(vertex, distances[vertex]); // Enqueue each vertex with its corresponding distance to the priority queue
    }

    while (!pq.isEmpty()) { // While the priority queue is not empty
        const { value: currentVertex } = pq.dequeue(); // Dequeue the vertex with the smallest distance from the priority queue

        if (!visited[currentVertex]) { // If the current vertex has not been visited yet
            visited[currentVertex] = true; // Mark the current vertex as visited

            for (const neighbor in graph[currentVertex]) { // Loop through each neighbor of the current vertex
                const distance = distances[currentVertex] + graph[currentVertex][neighbor]; // Calculate the distance to the neighbor through the current vertex

                if (distance < distances[neighbor]) { // If the calculated distance is smaller than the current distance to the neighbor
                    distances[neighbor] = distance; // Update the distance to the neighbor
                    pq.enqueue(neighbor, distance); // Enqueue the neighbor with its updated distance to the priority queue
                }
            }
        }
    }

    return distances; // Return the object containing the shortest distances to each vertex
};

// Example graph
const graph = {
    'A': { 'B': 4, 'C': 2 },
    'B': { 'A': 4, 'C': 5, 'D': 10 },
    'C': { 'A': 2, 'B': 5, 'D': 3 },
    'D': { 'B': 10, 'C': 3 }
};

// Test the function
const shortestDistances = dijkstra(graph, 'A'); // Call the dijkstra function with the example graph and the starting vertex 'A'
console.log(shortestDistances); // Output the shortest distances to each vertex
