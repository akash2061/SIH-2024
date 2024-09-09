import cv2 
import dlib 
import numpy as np
from math import hypot
import time
from scipy.spatial.distance import euclidean

# face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
detector = dlib.get_frontal_face_detector()
#  wget -nd https://github.com/JeffTrain/selfie/raw/master/shape_predictor_68_face_landmarks.dat
predictor = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat")
blink_count = 0
time_limit = 7


def mid_point(p1,p2):
    return int((p1.x + p2.x)/2) , int((p1.y + p2.y)/2)

def get_ratio(eye_points, facial_landmarks):
    # x-axis
    left_point = (facial_landmarks.part(eye_points[0]).x, facial_landmarks.part(eye_points[0]).y)
    right_point = (facial_landmarks.part(eye_points[3]).x, facial_landmarks.part(eye_points[3]).y)
    # y-axis
    center_top = mid_point(facial_landmarks.part(eye_points[1]), facial_landmarks.part(eye_points[2]))
    center_bottom = mid_point(facial_landmarks.part(eye_points[5]), facial_landmarks.part(eye_points[4]))

    hor_line = cv2.line(frame, left_point, right_point, (0, 255, 0), 1)
    ver_line = cv2.line(frame, center_top, center_bottom, (0, 255, 0), 1)

    # hor_line_length = hypot((left_point[0] - right_point[0]), (left_point[1] - right_point[1]))
    # ver_line_length = hypot((center_top[0] - center_bottom[0]), (center_top[1] - center_bottom[1]))

    hor_line_length = euclidean(left_point, right_point)
    ver_line_length = euclidean(center_top, center_bottom)
    
    if ver_line_length == 0:
        return 0
    
    ratio = hor_line_length / ver_line_length
    return ratio






cap = cv2.VideoCapture(0)

start = time.time()
while True:
    _ , frame = cap.read()
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = detector(gray)
    # print(faces)

    for face in faces:
        x,y = face.left(), face.top()
        x1, y1 = face.right() , face.bottom()
        cv2.rectangle(frame, (x,y), (x1,y1), (0,0,255), 2)

        landmarks = predictor(gray, face)
        
    left_eye_ratio = get_ratio([36,37,38,39,40,41], landmarks)
    right_eye_ratio = get_ratio([42,43,44,45,46,47],landmarks)
    blink_ratio = left_eye_ratio + right_eye_ratio / 2
    # print(blink_ratio)


    if blink_ratio > 8.2 and blink_ratio < 9.3 :
        cv2.putText(frame, "BLINKING..", (130,180), cv2.FONT_HERSHEY_PLAIN, 6, (255, 0, 0))
        blink_count = blink_count + 1

    blink_count
    cv2.putText(frame, str(blink_count), (40,130), cv2.FONT_HERSHEY_PLAIN, 6, (255, 0, 0), 2)

    if blink_count > 3:
        cv2.putText(frame, "HUMANNNN!!!!", (70,200), cv2.FONT_HERSHEY_PLAIN, 2, (0, 0, 255), 2)
        print("\n\n\n\n HUMAN HU BHAI!! \n\n\n\n\n")
        break;
    if time.time() - start > time_limit:
        cv2.putText(frame, "BOT!!!!", (70,200), cv2.FONT_HERSHEY_PLAIN, 2, (0, 0, 255), 2)
        print("\n\n\n\nBOT PKDA GYAA!!!!\n\n\n\n\n")
        break

    cv2.putText(frame, "BLINK 3-4 times", (40,150), cv2.FONT_HERSHEY_PLAIN, 2, (0, 0, 255), 2)
    cv2.imshow("frame", frame)
    time_left = time.time() - start
    print(f'TIME LEFT    :  {time_left:.2f} sec  / 7 sec')

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()