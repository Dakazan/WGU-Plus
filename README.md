WGU+ Extension
==========

Installing on Chrome
-----

WGU+ is currently available on the Chrome Webstore via the following link:

[WGU+](https://chrome.google.com/webstore/detail/wgu+/chaofigalhkdhmphgaanmpbapfjlpjpd)

Installing on Firefox
-----

WGU+ can also be manually loaded to firefox by switching to the firefox branch and downloading as zip. Go-to [about:debugging](about:debugging) or, manually build and load extension with [web-ext](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Getting_started_with_web-ext)



Description
-----

This chrome extension gives you a "Quick Links" option on the right your current course's pages. This appears directly above the Course Mentor/Announcements/etc options.
Once your course has been added to the extension, you will see quick links to uCertify, Lynda, SimLab, and other relevant study material.

<img src="https://github.com/bamhm182/WGU-Plus/blob/master/screenshots/WGU%2BExample.jpg"/>

Issues
-----

There are no known issues at this time.

If you find any, please let us know: [Issue Tracker](https://github.com/bamhm182/WGU-Plus/issues)

Contributing
-----

If your class is not already added, or if you would like to add additional resources, please clone this repository, make your changes, and create a Pull Request.
If you are unfamiliar with Git, feel free to open an Issue with information about the changes you want to make.

Resources are added to a <CLASS_ID>.txt file in the links folder.

<CLASS_ID> can be pulled from the class's URL on my.wgu.edu. For example: <br/>
8080002: https://my.wgu.edu/courses/course/8080002/course-material<br/>
7040001: https://my.wgu.edu/courses/course/7040001/course-material<br/>


Within this file, you will find each resource on its own line in the following format:<br/>
LINK_TYPE | LINK_NAME            | LINK

<b>LINK_TYPE</b>: The type of resource you are adding. The resource should be all one word. Examples are provided below.<br/>
<b>LINK_NAME</b>: This will be displayed to the right of the icon. For example: Lynda or Lynda\<br/\>(Mike Meyers).<br/>
<b>LINK</b>: The URL to the resource.<br/>

If the class comes directly from WGU (for example, uCertify), please use the provision link. Directly linking to the class in uCertify seems to result in uCertify returning the demo version of
the class, regardless of whether or not you're already enrolled in the full version of the class.

Before submitting a link, please ensure that it is the most generic form. For example, if I click on a video in Lynda, I may be taken to https://www.lynda.com/SQL-tutorials/Explore-DB-Browser/548044/635454-4.html?srchtrk=index%3a1%0alinktypeid%3a2%0aq%3asql%0apage%3a1%0as%3arelevance%0asa%3atrue%0aproducttypeid%3a2. This link has more information that it needs to have and may bring the user to a specific part of the video instead of the series overall. Instead, provide the generic link to the series overall, for example: https://www.lynda.com/SQL-tutorials/Learning-SQL-Programming/548044-2.html.

Additionally, WGU links to materials via a provision link that looks something like this: https://lrps.wgu.edu/provision/123456789 <br/>
At the time I'm writing this, I believe those links to be universal and think they should be fine to use. Please provide these links when linking to things such as uCertify.

Current Resources
==========
LINK_TYPE
-----
<b>NOTE</b>: Capitilzation doesn't matter, LINK_TYPEs should be all one word. If they're not in the list below, they will have a generic book icon.

acrobatiq<br/>
cbtnuggets<br/>
doc<br/>
hawkes<br/>
lynda<br/>
mindedgeonline<br/>
pdf<br/>
skillsoft<br/>
testout<br/>
ucertify<br/>
vitalsource<br/>
youtube<br/>
zybooks<br/>
