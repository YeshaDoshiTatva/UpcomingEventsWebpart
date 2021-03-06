## upcoming-events-webpart

This is where you include your WebPart documentation.

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

gulp clean - TODO
gulp test - TODO
gulp serve - TODO
gulp bundle - TODO
gulp package-solution - TODO

### Build Instructions in Visual Studio code
1. Run command npm i @fluentui/react
2. Run command npm install moment --save
3. Run command gulp build
4. Run command gulp bundle --ship
5. Run command gulp package-solution --ship


### Build Instructions
1. Download the source code from https://github.com/YeshaDoshiTatva/UpcomingEventsWebpart
2. Unzip the downloaded zip folder.
3. Navigate to .sppkg file in path '\sharepoint\solution\upcoming-events-webpart.sppkg'.
4. Open the App Catalog site. Navigate to Site Contents and then to Apps for SharePoint folder.
5. Click Files option in top bar and then click on 'Upload Document'.
6. Choose the .sppkg file and click on OK.
7. Click on Deploy button and the package file will be added.
8. Check in the package file.

### Add solution to site collection
1. Navigate to the site contents of the site where the webpart is required.
2. Click on New -> App.
3. Select the solution that is deployed.
4. Wait for sometime and you can see the solution added in Site Contents page of the site.

### Add webpart to page
1. Open a page in edit mode.
2. Click on add icon button and search for the calendar webpart deployed.
3. The webpart will be added in the page on clicking the webpart name.
4. Change the webpart properties to view the functionality of the webpart.
5. Change the below properties:
* List URL - Enter the path till ListName (Eg: https://contoso/sites/sitename/Lists/listname)
* Number of items to be displayed - Enter integer
6. Upcoming Events Calendar list will be created. You can use that list.