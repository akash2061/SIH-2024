import subprocess
import concurrent.futures

# Number of IPs to simulate and number of requests per IP
NUM_IPS = 1000
NUM_REQUESTS = 1000

# Function to send a request to localhost:5000
def send_request(ip):
    for i in range(NUM_REQUESTS):
        try:
            # Use curl with the X-Forwarded-For header to spoof IP
            subprocess.run([
                'curl', 
                '-s',  # Silent mode (don't show progress)
                '-o', '/dev/null',  # Discard output to reduce overhead
                '--header', f'X-Forwarded-For: {ip}',  # Spoof IP
                'http://localhost:5000'
            ])
        except Exception as e:
            print(f"Error sending request from IP {ip}: {e}")

# Function to generate a fake IP address
def generate_fake_ip(index):
    # Simple IP generator: 192.168.1.X, where X is between 1 and 254
    return f"192.168.1.{index % 254 + 1}"

def main():
    # List of fake IP addresses
    fake_ips = [generate_fake_ip(i) for i in range(NUM_IPS)]

    # Use ThreadPoolExecutor to send requests concurrently
    with concurrent.futures.ThreadPoolExecutor() as executor:
        # Submit a thread for each IP
        executor.map(send_request, fake_ips)

if __name__ == "__main__":
    main()
