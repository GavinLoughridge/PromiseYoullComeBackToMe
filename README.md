# PROJECT

“Promise You’ll Come Back To Me”

## TL;DR

A “flexboxfroggy” type game to teach people how to use promises with a story taken from 
the concept album The Life, Death, And Persistence Of Captain Charles Fort by The Wiggly Tendrills.

## ANSWERS TO PROJECT QUESTIONS

* **What problem does your project solve?**
	its hard to learn how to use promises and online documentation is confusing
* **Who has this problem?**
	developers who have not used promises before but want to learn what they are
* **How will your project solve this problem?**
	it will provide a fun way to build and use some very simple and tangible promises 
* **What inputs does it need?**
	keyboard and mouse actions from user, random numbers, cool space pictures
* **What outputs does it produce?**
	animations, success/failure notifications
* **What web APIs will it use?**
	random.org api for true random numbers (because why not)
	nasa rover api for cool space pictures (again, why not)
	other things? All the apis?
* **What technologies will it use?**
	css, html, javascript
* **What additional features will it have?**
	hopefully animations, maybe an audio console to play the source album while playing if you want. 
  Maybe it would be cool to embed a chatbot to ask some questions about promises.


## LONG DESCRIPTION

You will play the roll of Charles Fort trying to navigate wormholes in the Sargossa Sector and 
return to the love of your life Ada Lovelace before she grows old and dies due to the time dilation 
of your near speed of light travel.

However, Sargossa Sector wormholes are unpredictable. You may come out the other side at at 
time, and they might even collapse and spit you out somewhere else.  You need to remain in stasis 
during the jumps so you will need to program your Javascript Craft Control System to execute 
the correct jumps to get you home. This must be done asynchronously because the Javascript Craft 
Control System also controls your life support and if it gets blocked you will die. You must continue 
flying after wormhole jumps or you will stall and die. You must catch unexpected course changes and 
correct for them or you will get lost and die.

### CONTROLS

Users will have some scratch type building blocks that they can drag and drop to create promises 
(see attached files for example of simple drag and drop).

Users will build a promise to “come home” and will use then and catch to continue or correct their 
course depending on weather each wormhole jump succeeds or fails (see attached files for how a level backend might look).

Not sure how I’ll look at the order of these element and determination success or failure, but 
I’m confident I’ll figure it out.

### DISPLAY

Besides the drag and drop tool interface users will have a display of their position in the Sargossa Sector. 
It will show their starting position, destination, location of wormholes allow the way, and where the wormhole 
will drop then if the jump succeeds or fails.

When they submit a solution I’d like this to animate and show the craft taking the users path and getting 
to the destination/flying off into the abyss/exploding/etc. But this is a stretch goal, it could also just 
have a text interface displaying what resulted from their attempt.
