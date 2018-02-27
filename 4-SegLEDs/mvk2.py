import RPi.GPIO as GPIO

#GPIO.setmode(GPIO.BOARD)
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
#18, 23,24,25, 8, 12, 7, 16
#segments = {'a': 18, 'b': 24, 'c': 25, 'd': 8, 
#            'e':  12, 'f': 7, 'g': 16}

segments = (18, 23,24,25, 8,7,12, 16)
for segment in segments:
	GPIO.setup(segment, GPIO.OUT)
	GPIO.output(segment, 1) # We put segments output in one

digits = (2,3, 4, 17)

for digit in digits:
	GPIO.setup(digit, GPIO.OUT)
	GPIO.output(digit, 0)   # We put digit output in zero

try:
    while True:
	pass
except KeyboardInterrupt:
        GPIO.cleanup()

