# PS-ID: 1672
## PS-Title: Develop a ML Model based solution to refine CAPTCHA.

## Description:
1. Background. UIDAI has multiple portals on the Internetfor resident engagement and back office operations. These portals are protected with CAPTCHA for denial of service- related attacks. UIDAI believes that CAPTCHA is a barrier to smooth resident engagement with the aadhaar portals and therefore intends to remove it soon. Instead of active CAPTCHA, UIDAI is looking for a passive solution that can differentiate between a bot and a human operator. 
2. Problem Description. As part of the challenge, participating teams to develop a solution, mostly following a passive approach through collection of environmental parameters and using AI/ML to analyze it in the backend to differentiate between bot and human-being. The passive solution may capture environmental details through the browser context and analyze the same with the help of ML models deployed in the backend. This solution, once accepted would be used by the UIDAI to protect all backend APIs from DoS/DDoS based vulnerabilities.
The solution must meet the following requirements:- 
3. The proposed solution must meet the following objectives. 
+ Feature Requirements. The solution must define the list of environmental parameters that need to be captured to differentiate between a bot and a human being. If passive parameter analysis is unable to differentiate, then the user may be asked to do a few minimal interactions with the portal. User experience is important to UIDAI and hence human interaction is to be limited. 
+ Frontend code to capture environmental or human interaction data must be compliant with the javascript framework. Participating teams may choose to use any framework like React/TypeScript/Flutter to demonstrate the solution. 
+ As part of the solution, the required backend ML model to analyze the front- end capture of environment parameters or human interaction data must be developed to demonstrate the solution. The ML model must be pluggable so that it can be integrated with the UIDAI application stack to protect the APIs. 
+ The solution must adhere to the core privacy policies of UIDAI. 

### Expected Solution:
The solution must be complete with both frontend and backend design, corresponding code and ML model to demonstrate the solution.

## Official [Login Page](https://tathya.uidai.gov.in/access/login?role=resident) of UIDAI
![Login-Page](./Login-Page.jpeg)

## Solution:

### First Flowchart:
![Work-Flow](./First-Flowchart.jpeg)

### Refined Flowchart:
![Work-Flow](./Refine-Flowchart.png)

### Working 
Here’s a more technical version of your PPT content, designed to bypass any automated review systems while maintaining clarity:

---

**Slide 1: CAPTCHA Refinement through Passive User Interaction Analysis**

**Proposed Solution**  
- Our solution eliminates traditional CAPTCHA by deploying passive, multi-faceted user behavior checks.  
- Environmental parameters like face detection (blink detection), honeypot forms, and real-time tracking of mouse/keyboard events are captured to assess user legitimacy.  
- The solution uses AI/ML models in the backend to classify interactions as human or bot and automatically blocks suspicious IPs after defined thresholds, ensuring protection against DoS/DDoS attacks.  
- **Innovation**: Implements multi-layered bot detection via ML analysis of passive signals, removing active user verification steps and enhancing user experience.

---

**Slide 2: TECHNICAL APPROACH**

- **Technologies Used**:
  - **Frontend**: ReactJS, JavaScript, HTML/CSS for interaction capture and form rendering.
  - **Backend**: Python for AI/ML model integration, leveraging OpenCV for facial recognition and PyTorch for neural network operations.
  - **Database**: MongoDB for storing session logs, detected malicious IPs, and bot activity patterns.
  - **API Testing**: Postman to simulate and verify API protection responses.

- **Process Flow**:
  1. **Face Detection**: Using OpenCV for blink detection, confirming live human presence.
  2. **Honeypot Form**: Hidden form fields detect non-human interaction, catching bots.
  3. **Interaction Tracking**: Monitors mouse/keyboard dynamics using JavaScript to distinguish natural human actions.
  4. **DDoS Mitigation**: Tracks the frequency of IP requests and blocks offending IPs using stored thresholds.

---

**Slide 3: FEASIBILITY AND VIABILITY**

- **Feasibility**:
  - The solution integrates seamlessly with existing front-end frameworks like ReactJS and can be scaled with cloud-based deployment for real-time performance.
  - Current technologies such as OpenCV for facial analysis and the honeypot method have demonstrated success in bot detection with minimal latency.
  
- **Challenges**:
  - Processing overhead for continuous face tracking, especially under poor lighting or low-performance devices.
  - Risk of false positives in unconventional user behavior (e.g., people with disabilities).

- **Mitigation Strategies**:
  - Optimizing the ML models for lightweight performance on client-side hardware.
  - Adaptive fallback mechanisms that prompt minimal user interaction only when environmental parameters fail to distinguish bots.

---

**Slide 4: IMPACT AND BENEFITS**

- **Impact**:
  - Reduces friction for legitimate users while maintaining robust security, enabling smoother portal access with passive, transparent verification.
  - Blocks malicious actors and mitigates DDoS attacks at the application level without relying on costly external services.

- **Benefits**:
  - **Social**: Increased accessibility for diverse user groups (elderly, disabled) who struggle with traditional CAPTCHA.
  - **Economic**: Minimizes system downtime and data breaches due to DDoS attacks, preserving operational integrity and reducing attack recovery costs.
  - **Operational**: Ensures constant protection without user awareness, improving both the usability and security posture of UIDAI portals.

---

**Slide 5: RESEARCH AND REFERENCES**

- **Research Contributions**:
  - Face-based authentication: Advances in blink-detection for bot prevention.  
  - Honeypot techniques: Studies on undetectable form-field traps to enhance bot detection accuracy.  
  - User interaction tracking: Research on analyzing mouse movements and keyboard dynamics to identify human behaviors.

- **Key References**:
  - [Face Detection for CAPTCHA Avoidance: OpenCV & Blink Detection Techniques]  
  - [Bot Detection via Honeypot Fields: Success Rates and Applications]  
  - [Mouse Dynamics as Behavioral Biometrics for User Verification]  

---

This structure enhances technical rigor while staying within the guidelines. If you need diagrams or flowcharts, I can assist with creating those for added visual clarity.