# 100 Years of Drought Interactive

This is a pre-packaged piece designed for a [specific story](http://www.abc.net.au/news/2014-02-26/100-years-of-drought/5282030). 

## Requirements

- jQuery is expected to be in the page (though it waits for DOM ready before 
looking for jQuery).
- Drought map images should be at `http://www.abc.net.au/dat/news/interactives/100-yrs-of-drought/{year}.png`
- It expects a number of interface PNGs to be at `http://www.abc.net.au/dat/news/interactives/100-yrs-of-drought/interface/`

## Build

To build the production version run `grunt dist`. For development run `grunt` which watches all the relevant files and
sets up a development server (http://localhost:8000).

## Implementation in CM

Add a HTML Fragment to the story with the following content:

```
<srcipt id="cyrsd-script" src="[link to JS asset in CM]"></srcipt>
```

For development the link src can be changed to `http://localhost:8000/app.js`.

The script gets the annotations for each year from tables within the article. It expects table(s) to have two columns.
The first column should contain a date or date range with four digit years for which the annotation applies. The second
column should contain the annotations.

## Extras

The script also hides an embedded image on mobile. This is a hacky hack to solve the social media sharing image issue.

## Browser support

IE7+