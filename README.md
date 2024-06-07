This file will run a Photoshop script that shows a dialog. The dialog will allow the input of 6 fields:

Full Name, 
Title, 
Area Code, 
Phone, 
Ext, 
Email

The card template PSD must be open before running the script.

The only requirement is that the PSD contains the following text layers:

tf_name, 
tf_title, 
tf_phone, 
tf_email

Alternatively, those text layer names can be changed at the top of the code.

The script will work on any PSD that contains the required text layers, which can be 
nested in other layers or groups. The script will find them.

The created PNG file will be saved in ~/Downloads by default when the script is executed,
named following the format of <firstname-lastname-cardpng>. The download path can be changed
at the top of the code below.

A template PSD is included in the repo. If the template is used, the font will need to be
updated to one that is present on the user's computer, and editing of the text layer positioning
may be necessary.
