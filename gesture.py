import grove_gesture_sensor
import time
 
g=grove_gesture_sensor.gesture()
g.init()
while True:
    gest=g.return_gesture()
    #Match the gesture
    if gest==g.FORWARD:
        print("gest!FORWARD")
    elif gest==g.BACKWARD:
        print("gest!BACKWARD")
    elif gest==g.RIGHT:
        print("gest!RIGHT")
    elif gest==g.LEFT:
        print("gest!LEFT")
    elif gest==g.UP:
        print("gest!UP")
    elif gest==g.DOWN:
        print("gest!DOWN")
    elif gest==g.CLOCKWISE:
        print("gest!CLOCKWISE")
    elif gest==g.ANTI_CLOCKWISE:
        print("gest!ANTI_CLOCKWISE")
    elif gest==g.WAVE:
        print("gest!WAVE")
    elif gest==0:
        print("gest!-")
    else:
        print("gest!Error")
    time.sleep(.1)