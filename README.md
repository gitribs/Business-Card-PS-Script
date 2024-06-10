# Business Card Photoshop Script

This script facilitates quickly creating new business cards from a PSD template.
It will show a dialog that enables the input of 6 fields:

- Full Name
- Title
- Area Code
- Phone
- Ext
- Email

If the value `useAddress` is set to **true** in the script's code, the dialog will
also show 4 addition fields:

- address
- city
- state
- zip

NOTE: **The card template PSD must be open before running the script.**

# Text layer names

- tf_name
- tf_title
- tf_phone
- tf_email

If `useAddress` is set to **true**

- tf_address
- tf_location

A template PSD is included in the repo. If the template is used, the font will need to be
updated to one that is present on the user's computer. Design the template as needed.

The template PSD is not required. The script will work on any PSD that contains text layers
that match the values assigned to the `<something>TextLayer` variables in the script. The text 
layers can be nested in other layers or groups. The script will find them.

# Email Domain

The var `emailBase` should be updated to the desired email address domain desired.

# Save Location

The created PNG file will be saved in `~/Downloads` by default when the script is executed,
named following the format of `firstname-lastname-card.png`. To customize the download path, 
change the value of `savePath` in the script code as needed. 

To run the script, go to **File > Scripts > Browse** and navigate to the script's location.

For quicker access, drop the script in the following location:

- **PC**   \Program Files\Adobe\Adobe Photoshop 2024\Presets\Scripts
- **Mac**  /Applications/Adobe\ Photoshop\ 2024/Presets/Scripts

NOTE: **The version of Photoshop may need to be changed from the path examples above.**

The script should appear in the same menu as the Browse option described above.
