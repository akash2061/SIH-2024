# Anti-DDoS Testing Results:
This document presents the results of performance and security testing conducted to evaluate the Anti-DDoS mechanisms of a server running on `http://localhost:5000/`.

## Test Summary
+ Testing Tool: ApacheBench, Siege, Curl
+ Test URL: http://localhost:5000/
+ Objective: Assess the server's ability to handle high request volumes and its response to potential DDoS attacks.

## ApacheBench Results:

```
ab -n 50 -c 5 http://localhost:5000/
```
### Output:
```
This is ApacheBench, Version 2.3 <$Revision: 1913912 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking localhost (be patient).....done


Server Software:        
Server Hostname:        localhost
Server Port:            5000

Document Path:          /
Document Length:        17 bytes

Concurrency Level:      5
Time taken for tests:   0.033 seconds
Complete requests:      50
Failed requests:        48
   (Connect: 0, Receive: 0, Length: 48, Exceptions: 0)
Non-2xx responses:      48
Total transferred:      14470 bytes
HTML transferred:       1936 bytes
Requests per second:    1515.52 [#/sec] (mean)
Time per request:       3.299 [ms] (mean)
Time per request:       0.660 [ms] (mean, across all concurrent requests)
Transfer rate:          428.31 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.0      0       0
Processing:     2    3   1.1      2       8
Waiting:        1    2   1.0      2       7
Total:          2    3   1.1      3       8

Percentage of the requests served within a certain time (ms)
  50%      3
  66%      3
  75%      3
  80%      3
  90%      4
  95%      5
  98%      8
  99%      8
 100%      8 (longest request)

```
### Analysis:
+ **Request Handling**: The server processed a high number of requests per second but failed to handle 96% of the requests. This indicates that the Anti-DDoS system might be triggered under high load or rate limits might be set too restrictively.
+ **Response Time**: Very low mean response time suggests that the server was responsive before triggering the Anti-DDoS protections.
+ **Failed Requests**: High failure rate (48 out of 50) may indicate effective rate limiting or filtering mechanisms.

## Siege Results:

```
siege -c 10 -t 1M -v http://localhost:5000/
```
### Output:
```
** SIEGE 4.1.3
** Preparing 10 concurrent users for battle.
The server is now under siege...
HTTP/1.1 200     0.02 secs:      17 bytes ==> GET  /
HTTP/1.1 200     0.02 secs:      17 bytes ==> GET  /
HTTP/1.1 429     0.02 secs:      69 bytes ==> GET  /
HTTP/1.1 403     0.03 secs:      39 bytes ==> GET  /
HTTP/1.1 403     0.03 secs:      39 bytes ==> GET  /
HTTP/1.1 403     0.03 secs:      39 bytes ==> GET  /
HTTP/1.1 403     0.03 secs:      39 bytes ==> GET  /
HTTP/1.1 403     0.04 secs:      39 bytes ==> GET  /
HTTP/1.1 403     0.04 secs:      39 bytes ==> GET  /
HTTP/1.1 403     0.04 secs:      39 bytes ==> GET  /
HTTP/1.1 403     0.02 secs:      39 bytes ==> GET  /
HTTP/1.1 403     0.02 secs:      39 bytes ==> GET  /
HTTP/1.1 403     0.01 secs:      39 bytes ==> GET  /
HTTP/1.1 403     0.01 secs:      39 bytes ==> GET  /
HTTP/1.1 403     0.01 secs:      39 bytes ==> GET  /
HTTP/1.1 403     0.02 secs:      39 bytes ==> GET  /
HTTP/1.1 403     0.02 secs:      39 bytes ==> GET  /
HTTP/1.1 403     0.01 secs:      39 bytes ==> GET  /
HTTP/1.1 403     0.01 secs:      39 bytes ==> GET  /
HTTP/1.1 403     0.02 secs:      39 bytes ==> GET  /
HTTP/1.1 403     0.02 secs:      39 bytes ==> GET  /
HTTP/1.1 403     0.02 secs:      39 bytes ==> GET  /
HTTP/1.1 403     0.02 secs:      39 bytes ==> GET  /
HTTP/1.1 403     0.02 secs:      39 bytes ==> GET  /
HTTP/1.1 403     0.02 secs:      39 bytes ==> GET  /
HTTP/1.1 403     0.01 secs:      39 bytes ==> GET  /
HTTP/1.1 403     0.01 secs:      39 bytes ==> GET  /
HTTP/1.1 403     0.02 secs:      39 bytes ==> GET  /
HTTP/1.1 403     0.02 secs:      39 bytes ==> GET  /
HTTP/1.1 403     0.01 secs:      39 bytes ==> GET  /
HTTP/1.1 403     0.01 secs:      39 bytes ==> GET  /
^C
Lifting the server siege...
Transactions:		          31 hits
Availability:		      100.00 %
Elapsed time:		        0.07 secs
Data transferred:	        0.00 MB
Response time:		        0.02 secs
Transaction rate:	      442.86 trans/sec
Throughput:		        0.02 MB/sec
Concurrency:		        9.00
Successful transactions:           2
Failed transactions:	           0
Longest transaction:	        0.04
Shortest transaction:	        0.01

```
### Analysis:
+ **Transaction Rate**: The server handled up to 442.86 transactions per second, but only a few were successful.
+ **HTTP Status Codes**: Responses varied, with some showing HTTP 429 (Too Many Requests) and HTTP 403 (Forbidden), indicating rate limiting and possible IP blocking.
+ **Availability**: High availability (100%) suggests that the Anti-DDoS system successfully protected the server from downtime.

## Using Curl:
### Output:
```
curl -H "X-Forwarded-For: 172.168.113.32" http://localhost:5000/
Server is running                                                                                                    

curl -H "X-Forwarded-For: 172.168.113.32" http://localhost:5000/
Server is running                                                                                                    

curl -H "X-Forwarded-For: 172.168.113.32" http://localhost:5000/
{"message":"Too many requests from this IP, please try again later."}                                                                                                    

curl -H "X-Forwarded-For: 172.168.113.32" http://localhost:5000/
{"message":"Your IP has been blocked."}    
```
### Analysis:
+ **Initial Requests**: The server was initially responsive, indicating it was operational.
+ **Rate Limiting and IP Blocking**: The server implemented rate limiting after a certain threshold and eventually blocked the IP. This is a key anti-DDoS feature, demonstrating the server's ability to mitigate excessive request volumes.

## Conclusion
The testing reveals that the server's Anti-DDoS mechanisms are effectively managing high request rates. Key observations include:

1. **ApacheBench**: High request throughput with a significant number of failures, suggesting that the rate-limiting or filtering mechanisms are aggressively applied under load.
2. **Siege**: Demonstrated high transaction rate with some responses indicating rate limiting (HTTP 429) and IP blocking (HTTP 403). The system successfully prevented server downtime.
3. **Curl**: Showed progressive rate limiting and IP blocking, effectively managing repeated requests from the same IP.

Overall, the server appears to have robust Anti-DDoS protections in place, effectively handling high traffic and mitigating potential attacks.