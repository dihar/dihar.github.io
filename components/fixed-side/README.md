# \<fixed-side\>

allows create affix effect side, parent container must have relative position,
content of `fixed-side` will be fixed when window 
scrolling between top parent container and bottom container


## Install with bower

```
bower i fixed-side -S
``` 

## Example
1. Import component

	```html
		<link rel="import" href="path/to/folder/fixed-side/fixed-side.html">
	```
2. Add element

	```html
	<div class="container-for-scrolling">
		<fixed-side top="20" bottom="20">
			some content
		</fixed-side>
	</div>
	```

	`top` — distanse to window top at which container scrolls 

	`bottom` — distanse to window bottom at which container stops to scroll 
