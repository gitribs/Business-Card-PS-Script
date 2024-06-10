/**
 * @author Erik Howard <https://codingfiend.com>

 Free to use and modify, no attibution required.
 */

#target photoshop

/**

BEGIN USER VARS. EDIT BELOW AS NEEDED

-----------------------------------------------------------------------------------------------

**/

var useAddress = false;

/** 

Change <emailBase> to the domain to be displayed on the card

**/

var emailBase = 'site.com'; // change to desired website domain

/**

The file saves to ~/Downloads unless changed below

**/

var savePath = '~/Documents';

/**

TEXT LAYER NAMES

The vars below must correspond to the names of the text layers in the PSD.
Build the template PSD with the same text layer names as below, or change 
the values below to match the text layer names in the template PSD.

**/

var userNameTextLayer = 'tf_name';
var titleTextLayer = 'tf_title';

if(useAddress) {
  var addressTextLayer = 'tf_address';
  var locationTextLayer = 'tf_location';
}

var phoneTextLayer = 'tf_phone';
var emailTextLayer = 'tf_email';

/**

-----------------------------------------------------------------------------------------------

END USER VARS. DO NOT EDIT BELOW!

**/



var docRef = app.activeDocument;
var username, title, address, location, phone, ext, email = '';
var u;

var dlg = new Window ('dialog', 'Business Card Creator', u);
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

if(useAddress) {
  var confirmAddress = confirmPanel.add('statictext', u, '-');
  var confirmLocation = confirmPanel.add('statictext', u, '-');
}

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

if(useAddress) {
  var addressContainer = mainPanel.add( 'group' );
  nameContainer.orientation = 'row';
  addressContainer.add('statictext', u, 'Street Address:');
  var addressField = addressContainer.add('edittext', u);
  addressField.characters = 30;

  var locationContainer = mainPanel.add( 'group' );
  locationContainer.add('statictext', u, 'City');
  var cityField = locationContainer.add('edittext', u);
  cityField.characters = 11;
  locationContainer.add('statictext', u, '  State:');
  var stateField = locationContainer.add('edittext', u);
  stateField.characters = 3;
  locationContainer.add('statictext', u, 'Zip');
  var zipField = locationContainer.add('edittext', u);
  zipField.characters = 5;
}

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
emailField.characters = 22;
emailField.justify = 'right';
emailContainer.add('statictext', u, '@' + emailBase);

var btnPreviewContainer = mainPanel.add( 'panel', u, u, {borderStyle: 'none'});
btnPreviewContainer.alignment = 'center';
btnPreviewContainer.alignChildren = ['fill', 'fill'];
var btnPreview = btnPreviewContainer.add('button', u, 'Preview');
btnPreview.onClick = showPreview;

function showPreview() {
  username = nameField.text;
  title = titleField.text;

  if(useAddress) {
    address = addressField.text;
    var city = cityField.text;
    var state = stateField.text;
    var zip = zipField.text;
    location = city + ', ' + state + ' ' + zip;
  }

  ext = extField.text == '' ? '' : ' x' + extField.text;
  phone = '(' + areaCodeField.text + ') ' + 
                phoneField.text.substr(0, 3) + '-' + 
                phoneField.text.substr(3) + 
                ext;

  email = emailField.text + '@' + emailBase;

  confirmName.text = '     Name:  ' + username;
  confirmTitle.text = '       Title:  ' + title;

  if(useAddress) {
    confirmAddress.text = ' Address:  ' + address;
    confirmLocation.text = '                  ' + location;
  }

  confirmPhone.text = '    Phone:  ' + phone;
  confirmEmail.text = '      Email:  ' + email;

  mainPanel.visible = false;
}

function goBack() {
  mainPanel.visible = true;
}

function populateFields() {
  changeTextLayerContent(docRef, userNameTextLayer, username);
  changeTextLayerContent(docRef, titleTextLayer, title);

  if(useAddress) {
    changeTextLayerContent(docRef, addressTextLayer, address);
    changeTextLayerContent(docRef, locationTextLayer, location);
  }

  changeTextLayerContent(docRef, phoneTextLayer, phone);
  changeTextLayerContent(docRef, emailTextLayer, email);

  finalize();
}

function finalize() {
  if(confirm('Click OK to save to ' + savePath)) {
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
























