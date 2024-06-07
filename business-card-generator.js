/**

This Photoshop script will show a dialog that enables the input of 6 fields:

Full Name
Title
Area Code
Phone
Ext
Email

The card template PSD must be open before running the script.

The only requirement is that the PSD contains the following text layers:

tf_name
tf_title
tf_phone
tf_email

Alternatively, those text layer names can be changed at the top of the code below.

The script will work on any PSD that contains the required text layers, which can be 
nested in other layers or groups. The script will find them.

The created PNG file will be saved in ~/Downloads by default when the script is executed,
named following the format of firstname-lastname-card.png. The download path can be changed
at the top of the code below.

A template PSD is included in the repo. If the template is used, the font will need to be
updated to one that is present on the user's computer, and editing of the text layer positions
may be necessary.

**/

#target photoshop

/**

TEXT LAYER NAMES

These <somethingTextLayer> vars correspond to the names of the text layers in the PSD.
If unchanged, the text layers in the PSD will need to match the default values below.

**/

var userNameTextLayer = 'tf_name';
var titleTextLayer = 'tf_title';
var phoneTextLayer = 'tf_phone';
var emailTextLayer = 'tf_email';

/** 

Change <emailBase> to the domain to be displayed on the card

**/

var emailBase = '@site.com'; // change to your domain

/**

The file saves to ~/Downloads unless changed below

**/

var savePath = '~/Downloads';

/**

END USER VARS. DO NOT EDIT BELOW!

**/



var docRef = app.activeDocument;
var username, title, phone, ext, email = '';
var u;

var dlg = new Window ('dialog', 'JDV Card Creator', u);
dlg.location = [100,100];
dlg.margins = 15;
dlg.orientation = 'stack';
dlg.alignChildren = ['fill', 'fill'];

var mainPanel = dlg.add('panel', u, 'Enter Card Values');
mainPanel.orientation = 'column';
mainPanel.alignChildren = 'right';
mainPanel.margins = [15, 20, 15, 15];

var confirmPanel = dlg.add('panel', u, 'Confirm');
confirmPanel.orientation = 'column';
confirmPanel.alignChildren = ['fill', -1];
confirmPanel.margins = [15, 20, 15, 15];
var confirmName = confirmPanel.add('statictext', u, '-');
var confirmTitle = confirmPanel.add('statictext', u, '-');
var confirmPhone = confirmPanel.add('statictext', u, '-');
var confirmEmail = confirmPanel.add('statictext', u, '-');

var btnContainer = confirmPanel.add( 'panel', u, u, {borderStyle: 'none'});
btnContainer.orientation = 'row';
btnContainer.alignment = 'center';
btnContainer.alignChildren = ['fill', 'fill'];
var btnBuild = btnContainer.add('button', u, 'Build');
btnBuild.onClick = populateFields;
var btnBack = btnContainer.add('button', u, 'Back');
btnBack.onClick = goBack;

var nameContainer = mainPanel.add( 'group' );
nameContainer.orientation = 'row';
nameContainer.add('statictext', u, 'Full Name:');
var nameField = nameContainer.add('edittext', u);
nameField.characters = 30;

var titleContainer = mainPanel.add( 'group' );
titleContainer.orientation = 'row';
titleContainer.add('statictext', u, 'Title:');
var titleField = titleContainer.add('edittext', u);
titleField.characters = 30;

var phoneContainer = mainPanel.add( 'group' );
phoneContainer.add('statictext', u, 'Area Code:');
var areaCodeField = phoneContainer.add('edittext', u);
areaCodeField.justify = 'center';
areaCodeField.characters = 4;
phoneContainer.add('statictext', u, '      Phone:');
var phoneField = phoneContainer.add('edittext', u);
phoneField.justify = 'center';
phoneField.characters = 8;
phoneContainer.add('statictext', u, ' Ext:');
var extField = phoneContainer.add('edittext', u);
extField.justify = 'center';
extField.characters = 4;

var emailContainer = mainPanel.add( 'group' );
emailContainer.add('statictext', u, 'Email:');
var emailField = emailContainer.add('edittext', u);
emailField.characters = 21;
emailField.justify = 'right';
emailContainer.add('statictext', u, '@dv-llc.com');

var btnPreviewContainer = mainPanel.add( 'panel', u, u, {borderStyle: 'none'});
btnPreviewContainer.alignment = 'center';
btnPreviewContainer.alignChildren = ['fill', 'fill'];
var btnPreview = btnPreviewContainer.add('button', u, 'Preview');
btnPreview.onClick = showPreview;

function showPreview() {
  username = nameField.text;
  title = titleField.text;
  ext = extField.text == '' ? '' : ' x' + extField.text;
  phone = '(' + areaCodeField.text + ') ' + 
                phoneField.text.substr(0, 3) + '-' + 
                phoneField.text.substr(3) + 
                ext;

  email = emailField.text + emailBase;

  confirmName.text = ' Name:  ' + username;
  confirmTitle.text = '   Title:  ' + title;
  confirmPhone.text = 'Phone:  ' + phone;
  confirmEmail.text = '  Email:  ' + email;

  mainPanel.visible = false;
}

function goBack() {
  mainPanel.visible = true;
}

function populateFields() {
  changeTextLayerContent(docRef, userNameTextLayer, username);
  changeTextLayerContent(docRef, titleTextLayer, title);
  changeTextLayerContent(docRef, phoneTextLayer, phone);
  changeTextLayerContent(docRef, emailTextLayer, email);

  finalize();
}

function finalize() {
  if(confirm('Click OK to save to /Downloads')) {
    dlg.close();
    saveFile();
  } else {
    mainPanel.visible = true;
  }
  
}

function saveFile() {
  var pngFile = new File(savePath + '/' + username.split(' ').join('-').toLowerCase() + '-card.png');
  var pngSaveOptions = new PNGSaveOptions();

  pngSaveOptions.embedColorProfile = true;
  pngSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
  pngSaveOptions.matte = MatteType.NONE;
  pngSaveOptions.quality = 1;

  docRef.saveAs(pngFile, pngSaveOptions, true, Extension.LOWERCASE);
}

function changeTextLayerContent(doc, layerName, newTextString) {
  for (var i = 0, max = doc.layers.length; i < max; i++) {
    var layerRef = doc.layers[i];
    if (layerRef.typename === 'ArtLayer') {
      if (layerRef.name === layerName && layerRef.kind === LayerKind.TEXT) {
        layerRef.textItem.contents = newTextString;
      }
    } else {
      changeTextLayerContent(layerRef, layerName, newTextString);
    }
  }
}

dlg.show ();
























