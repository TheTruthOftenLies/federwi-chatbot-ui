const { spawn } = require('child_process');
const http = require('http');
const path = require('path');

// Function to check if a port is available
function checkPort(port) {
  return new Promise((resolve) => {
    const server = http.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on('error', () => resolve(false));
  });
}

// Function to find available port
async function findAvailablePort(startPort = 3000) {
  for (let port = startPort; port < startPort + 10; port++) {
    const available = await checkPort(port);
    if (available) {
      return port;
    }
  }
  throw new Error('No available ports found');
}

// Function to wait for server to be ready
function waitForServer(port, maxAttempts = 30) {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const checkServer = () => {
      const req = http.get(`http://localhost:${port}`, (res) => {
        console.log(`✓ Server is ready on port ${port}`);
        resolve(port);
      });
      
      req.on('error', () => {
        attempts++;
        if (attempts >= maxAttempts) {
          reject(new Error(`Server not ready after ${maxAttempts} attempts`));
        } else {
          console.log(`Waiting for server... (${attempts}/${maxAttempts})`);
          setTimeout(checkServer, 1000);
        }
      });
    };
    checkServer();
  });
}

async function startDesktopApp() {
  try {
    console.log('🚀 Starting Chatbot UI Desktop App...');
    
    // Find available port
    const port = await findAvailablePort(3000);
    console.log(`📡 Using port ${port} for Next.js`);
    
    // Start Next.js dev server
    console.log('🔧 Starting Next.js development server...');
    const nextProcess = spawn('npm', ['run', 'dev'], {
      env: { ...process.env, PORT: port.toString() },
      stdio: 'inherit',
      shell: true
    });
    
    // Wait for Next.js to be ready
    await waitForServer(port);
    
    // Start Electron
    console.log('🖥️  Starting Electron...');
    const electronProcess = spawn('npx', ['electron', '.'], {
      env: { 
        ...process.env, 
        NODE_ENV: 'development',
        DEV_PORT: port.toString()
      },
      stdio: 'inherit',
      shell: true
    });
    
    // Handle process cleanup
    process.on('SIGINT', () => {
      console.log('\n🛑 Shutting down...');
      nextProcess.kill();
      electronProcess.kill();
      process.exit(0);
    });
    
    // Handle Electron exit
    electronProcess.on('exit', () => {
      console.log('🔚 Electron closed, shutting down Next.js...');
      nextProcess.kill();
      process.exit(0);
    });
    
  } catch (error) {
    console.error('❌ Error starting desktop app:', error.message);
    process.exit(1);
  }
}

startDesktopApp(); 