#pip install opencv-python
import cv2
import os

path = os.getcwd()

#reads img as greyscale, then rewrites img
img = cv2.imread(path+"/util/drawn.png", 0)
cv2.imwrite(path+"/util/grey.png", img)

os.rename(path+"/util/grey.png", path+"/uSPADE/dataset/validation/ADE_val_00000001.png")
