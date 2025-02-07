// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: book;
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: book;
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: book;
// This script shows a random Scriptable API in a widget. The script is meant to be used with a widget configured on the Home Screen.
// You can run the script in the app to preview the widget or you can go to the Home Screen, add a new Scriptable widget and configure the widget to run this script.
// You can also try creating a shortcut that runs this script. Running the shortcut will show widget.
let api = await fetchWod();
let widget = await createWidget(api);
if (config.runsInWidget) {
  // The script runs inside a widget, so we pass our instance of ListWidget to be shown inside the widget on the Home Screen.
  Script.setWidget(widget);
} else {
  // The script runs inside the app, so we preview the widget.
  widget.presentMedium();
}
// Calling Script.complete() signals to Scriptable that the script have finished running.
// This can speed up the execution, in particular when running the script from Shortcuts or using Siri.
Script.complete();

async function createWidget(api) {
  let appIcon = await loadAppIcon();
  let title = "WOD of the day";
  let widget = new ListWidget();
  // Add background gradient
  let gradient = new LinearGradient();
  gradient.locations = [0, 1];
  gradient.colors = [new Color("141414"), new Color("13233F")];
  widget.backgroundGradient = gradient;
  // Show app icon and title
  let titleStack = widget.addStack();
  let appIconElement = titleStack.addImage(appIcon);
  appIconElement.imageSize = new Size(30, 30);
  appIconElement.cornerRadius = 4;
  titleStack.addSpacer(4);
  let titleElement = titleStack.addText(title);
  titleElement.textColor = Color.white();
  titleElement.textOpacity = 0.7;
  titleElement.font = Font.mediumSystemFont(13);
  widget.addSpacer(12);
  // Show API
  let nameElement = widget.addText(new Date().toDateString());
  nameElement.textColor = Color.white();
  nameElement.font = Font.boldSystemFont(18);
  widget.addSpacer(2);
  let descriptionElement = widget.addText(api.data);
  descriptionElement.minimumScaleFactor = 0.5;
  descriptionElement.textColor = Color.white();
  descriptionElement.font = Font.systemFont(18);
  widget.url = "https://www.crossfit.com/workout/";
  return widget;
}

async function fetchWod() {
  let url = "https://pranjaldotdev-cfwod.web.val.run/";
  let req = new Request(url);
  return await req.loadJSON();
}

async function loadAppIcon() {
  let url =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAdVBMVEUAAAD////v7+/8/Pze3t5+fn6QkJA5OTl0dHSHh4eUlJRCQkLb29vCwsLGxsawsLBnZ2f19fVXV1ecnJy5ubl4eHjT09Ozs7MhISGLi4vk5OQJCQkqKirLy8tNTU0TExNiYmKnp6cyMjJKSkoSEhIcHBxTU1OAfTrxAAADsElEQVR4nO3ZaVejPByG8QDWbnRh65JaLdb2+3/EB/JPINSpHg+etjPP9Xshw2JObiHrKAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+LG37TyMwvl417+o5ahRHNTBHIf9i+3pOQpENO5dVhK0YqXNsX+pPeVepbK+hYVeYSv1ZI6D36hlD1ngK3qW9ogJOwGDsGdp1xJOB0VRDJa/UeGfGkkLDJJAWuOpX3GSMEmiKAr2ahXVxzrh1lzXv1LlH5rI33ukCvnHtF9xknD76frY9j138Czv8F0No99LOPl0fXD3hEM1dQnlQtUFxdWbrSs3r6od7sfu+z3ncVKNnlt3Xsx0EumZefYiYbaorFOVL/bSyrMyU+f03gkjuaDNt6uWTd+RSD+7754PtTvXr58SatvTeN1PspvceArQJnTtUBKG0jpHfkdbD90r77yKuPOH+PfLhK4v9Z4Jq4nOTQO2CYc6rCRDFbXVGfknprUu/fNEqdI/X7mEz18lvLUmoTKz0uqHn9AGWtlPc6sWUs2ZvLrUfod6Lok3NmFeDAaDU5swfLKjiA5vP2C0CR1JGAU6K04T924kwkLF5nhSZ3Mcy8OhmxlN/RF/qrwR/xH60ouEMkWVu3OlZp2EyrZamzB2I/r1hPcfDz8lnHt3vYQzW+eXdT0QpHYtMVVpfVq+/E0JR39OKDUNcve8LEyizC0t/6KES++ul9AtAKO1ZDraOIldd3kJj4+WcLcxdt8kTJsEhfdERR/bhJfj4WMknIZJxY34VxOqtJnEyKg3aHYI0kdP6FrPNwmrftN9igdz+lHajNHuwRN25qVfJaxGP3nGjd4buxGS/zsJ1bHucKJ2qSXT1/CBEybe+vDLhNq+u61tieawdvfPj5uwqoXU+buET7ai0qVm8nDpZuCHbxLeZRfDLY9cj3j6Q0L9YetayrGaYWf2HZqHV27VmF5NaLeDnua99yt/LujQ3RH/tXt3ad9lZEcM91Um9vBxNeHGFbG/fcJJJ8Oom9DW0ap6ks76UF/stn7Rlzb7zndIaJd8ov6GOgk3ur2ZDLtPJ/UsJu4Evp7QbQ7cI6Eau52I0EzEAj+h+li7ALMXc6EZ72MZK8rmDb4pN211ja3z/xaZ+cXVDYN5ijzWcW73T1Jj09x8G5V5Xg7areJDuc7Xk2nn/mIs+Y+vlfOLvXU0Rbkz9X5O0567lQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADw//Qfc9sslvx6GSwAAAAASUVORK5CYII=";
  let req = new Request(url);
  return req.loadImage();
}
