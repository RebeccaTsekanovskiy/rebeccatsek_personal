Read Me:

- pages worked done:
dorms page and resources page


problems encounter:

It took me a really long time to get the filters working. first , we started with a js map function that had all of the information about the dorms. Then, we got that ever so slightly working and it was time to make the json file.

Going from the js that was working for the mini map and the json file took so much time. I think getting started was one of the most difficult parts, besides getting the json file organized and running. 

For the json file, I would just copy block by block and go through each section. I used the resources given by rpi 
- https://sll.rpi.edu/housing-comparison

and went through the entire json file that way..
After that was done, I intergrated the filters first, which was extremely annoying. Parsing through the json file, I looked for things that were considered true/false to help the filters work. 

Once of them got to work, it was really easy to intergate the other filters. But, that first filter must have taken over 10/15 hours. 

After that, I worked on getting the kitchen filters integrated and getting 3 new buttons to pop up and dynamically move up the page when clicked. That was more annoying to do rather than hard.

After that, I worked on gathering all the data into the modal.
By making functions for each part of the modal to parse through the data was the best way I could think about approaching the page. So, I was extremely specific with how I wanted the data to be displayed, compared to when I was working on the filters and just checking if the value was true. Instead, I would just gather the information from the map by specifically calling on it, rather than using a for loop to go through all the information. I used that approach for all parts of the modal, which was not that bad to intergate. I use a JS map to make sure the name of the key was then put into actual words so it can be displayed. I used multiple maps based off what part of the page I was working, like for the filters.

Lastly, I integrated the model viewer into the project. When it was first tested out, the model viewer was inserted into the HTMl with a specific source link. That was fine and it was able to be left in a .glb form. But, when it was time to move it into the json file and display it differently, I had to convert it into a .gltf file. That was not extremely bad because VS code has an extension that allows you to convert easily. Then, since , the model viewer was dependent on the dorm and not all dorms had a model viewer, a function had to be created. I added another section into the JSON indicated as GLB path 1 or GLB path 2 which is where I stored the model viewers.  I then created a function that would help dynamically load the tab model viewer onto the modal. I used show and hide features to make sure that model viewer would close properly when tabs would be switched, as well as having the pages refresh when jumping through dorms with the modal.



Sources used:

https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON

https://jsonlint.com/


https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction

https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics


https://www.w3schools.com/php/php_forms.asp

https://www.php.net/manual/en/book.mysqli.php

https://www.php.net/manual/en/book.mysqli.php

https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON

https://www.w3schools.com/Js/js_json_parse.asp

https://www.freecodecamp.org/news/how-to-build-a-modal-with-javascript/

https://opensource.com/

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects

https://www.w3schools.com/howto/howto_css_modals.asp

https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps

https://www.w3schools.com/js/js_classes.asp


https://dev.to/antonioerdeljac/display-3d-models-on-the-web-in-1-minute-58p2


https://dev.to/theranbrig/add-ar-and-3d-models-to-any-site-in-minutes-3i6c

https://web.dev/model-viewer/

https://web.dev/articles/model-viewer


https://codeshack.io/interactive-modals-javascript/


https://www.w3schools.com/w3css/w3css_modal.asp


https://codepen.io/luxonauta/pen/vYKYppq