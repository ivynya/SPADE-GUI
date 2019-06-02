#pip install opencv-python
import cv2
import os

path = os.getcwd()

#reads img as greyscale, then rewrites img
img = cv2.imread(path+"/img/drawn.png", 0)
cv2.imwrite(path+"/img/grey.png", img)

os.rename(path+"/img/grey.png", path+"/uSPADE/dataset/validation/ADE_val_00000001.png")
