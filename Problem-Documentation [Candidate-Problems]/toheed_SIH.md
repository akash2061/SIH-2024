: TOHEED AKHTAR

## 1.
### PROBLEM

#### P.id -  1734 
#### P.title - Downscaling of Satellite based air quality map using AI/ML

#### P.Description :
- Create fine spatial resolution air quality map (N02) from satellite data. 
	(probably by ESO6 satellite, accesible to student after register)
- spatial resolution : where each part of image is distinguishable, like a map.
- componenets exist solution dosent. We have to sum the componenets.
- challenge : deal with data having gaps under cloudy conditions.
	sol (tent) : fine-tune the model with cloudy data and correct labels.

#### Assumptions :
- data will be in tabular/numeric/structured from from sateelite
- will have to use some model to classify air quality of different states/ciites based on satellite data.
- optimize for data under cloudy conditions.

#### SOLUTION
	
- Train the model to get the quality of air of different city states. 
- output -> color i.e. red for high , green for slow 
- now doing something on frontend that shows the map with different states/areas having different colors based on outputs.
- a state color may be defined as average of its cities. 

- something like this (1+2) which can be zoomed and selected individually. 
	- 1. https://www.isro.gov.in/PreciseAirQualityMonitoring.html
	- 2. https://www.earthdata.nasa.gov/learn/find-data/near-real-time/hazards-and-disasters/air-quality

#### SHOWSTOPPERS :
- Gives regular updates to signed up users of thier locality air's quality. 
- measures to improve air quality.
- real-time data for researches and goverment bodies.
- paid for local users? 

---

## 2. 
### PROBLEM 
(Dense lots of stuff to be done)

#### P.id -  1721 
#### P.title -  Intelligence and Investigations - Enhancing Anti-Doping Efforts

#### P.Description :
- Create a DB from data from various sources, (DATABASE STUFF)
- Adv. Analytics and AI to detect doping. (DA / AI)
- UI for Investigators to collaborate and track and manage cases with visualization (FRONTEND)
- Secure Channels for WhistleBlowers (BACKEND)
- Documentation, best-practices and training for people to learn how to use this. (DOCUMENTATION)
	
- challenge : lot of stuff to build, can be a plus point as it seems tough to crack.
	sol (tent) : Build best parts and sum them together.

#### Assumptions :
- everyone will have a task to do. 
- either there will be a lot of submission or very less.

### SOLUTION

Challenges : 
Description itself is the challenges with oppurtunities to execute it brilliantly,

#### SHOWSTOPPERS :
- Ranking of top perf. (doping-free) athletes as a rewward fro thier discipline.
- awareness / rewards / dope-free-stars

---

## 3.
### PROBLEM : Monitoring of construction progress of construction/building projects based on images.
	
#### P.id : 1725
#### P.title : Utilization of images for monitoring of progress of construction activities for building construction projects.

#### P.Description : 
- Handle images
- ML algo to identify stage of progress based on images.
- input to ML algo vaires -> no of buildings in image, types of progress (foundation, etc.)
- compare status with previous images.

#### Assumptions :
- Much ml stuff,
- Strong Web architecture to handle images and model.

### SOLUTION 
	
- Create a project, (Backend / Frontend)
- inputs images in it and get status of progress, (Backend / DB/ ML)
- on input second image app auto compares the images and gives status based on recent image,
	
#### SHOWSTOPPERS :
- ability to create projects,
- auto compares,
- tells the percentage of progress to the finish (progrss% / 100% progress)

---

## 4.
### PROBLEM : to improve UIDAI captcha based on ML techniques.
	
#### P.id : 1672
#### P.title : Develop a ML Model based solution to refine CAPTCHA.

#### P.Description : 
- frontend should be compliant with js framework react/TS.
- ML based Captcha
- ML model must be pluggable so it can be integrated with UIDAI app stack.
- Must respect UIDAI pivacy policies.

#### Assumptions :
- Doable
- P(higher no of submissions)

### SOLUTION 
	
Captcha
- Ask for permission to open your camera, 
- Ask to look in the camera for 5 - 10 sec.(Frontend)
- check for face using face recognition and locates eyes, (ML / Backend)
- if eye blinks are detected human - captcha proceeds
	if eye blinks are not detected - captacha failed
- can also ask to say some word and detect it using voice recong. 
	
#### SHOWSTOPPERS :
- ability to differentiate with ai models blinking and real person,
- easy and streamlined.
- insertable plugin / api
