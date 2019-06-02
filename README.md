# SPADE-GUI
NVIDIA SPADE GUI tool, recreated and enhanced.

This is a recreation of the NVIDIA SPADE [demonstration app](https://youtu.be/p5U4NgVGAwg) they showed at GTC 2019. It will do most things that the demonstration app could do, which is take a MS Paint-like input from the user and convert it in semi-real time to a photo-realistic image. It will first function using the ADE20K pretrained model released, and may eventually support the COCO-Stuff dataset model.

This app uses a modified version of SPADE that strips out unneeded components and modifies some files to be friendly with NodeJS executing the scripts. The Git repository of SPADE and the licensing info can be found [here](https://github.com/NVlabs). While this code is licensed under MIT, the modified version of SPADE shares the [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) license provided by NVIDIA.

The Flickr Landscapes (40k) data set shown in the video was not open sourced by NVIDIA and as such will likely not be supported, unless folks who trained the model themselves would be willing to share.

# Install And Use

To install, please download [uSPADE](https://1drv.ms/u/s!AjdWHl830MgYujEEBuEQREKNar-o?e=AHDDyV), the modified version of SPADE for SPADE-GUI. Extract and place in the top directory of this repository. Run `pip install -r uSPADE/requirements.txt`. Then, run `pip install opencv-python`. Run `npm install` and `npm start`, and you should be good to go.

Please note, SPADE-GUI only functions on Unix-based systems due to the dependencies not functioning on Windows. SPADE-GUI requires Python 3.x or higher to function, and the unpackaged version of this app requires NodeJS and NPM.
