
#!/bin/bash

# Start Chinook Music Store local development environment

echo "Starting Chinook Music Store local development environment..."

# Start the backend in the background
echo "Starting backend server..."
cd backend
./mvnw spring-boot:run > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..

echo "Backend server starting with PID: $BACKEND_PID"
echo "Backend logs available at: $(pwd)/backend.log"

# Start the frontend in the background
echo "Starting frontend server..."
cd frontend
export PORT=51188
export HOST=0.0.0.0
export DANGEROUSLY_DISABLE_HOST_CHECK=true
npm start > ../frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

echo "Frontend server starting with PID: $FRONTEND_PID"
echo "Frontend logs available at: $(pwd)/frontend.log"

echo "Frontend will be available at: http://localhost:51188"
echo "Backend API will be available at: http://localhost:8080/api"

echo "To stop the servers, run: kill $BACKEND_PID $FRONTEND_PID"

# Save PIDs to a file for easy shutdown
echo "$BACKEND_PID $FRONTEND_PID" > .dev-pids

echo "Development environment started successfully!"
echo "PIDs saved to .dev-pids file"

# Create a stop script
cat > stop-local-dev.sh << EOF
#!/bin/bash
if [ -f .dev-pids ]; then
  echo "Stopping development servers..."
  kill \$(cat .dev-pids)
  rm .dev-pids
  echo "Development servers stopped."
else
  echo "No running development servers found."
fi
EOF

chmod +x stop-local-dev.sh
echo "Created stop-local-dev.sh script to stop the servers"
