This file will run a Photoshop script that shows a dialog. The dialog will allow the input of 6 fields:

Full Name, 
Title, 
Area Code, 
Phone, 
Ext, 
Email

The only requirement is that the photoshop document being targeted, 
(which must be open in Photoshop before running this script),
contains the following text layers:

tf_name, 
tf_title, 
tf_phone, 
tf_email

The text layers can be nested in other layers or groups. The code will find them.

The created PNG file will be saved in ~/Downloads when the script is executed,
named following the format of firstname-lastname-card.png
