# Welcome to Gistlog

## What is Gistlog?
Gistlog makes your gist snippets readable like a blog. [This page](http://narutaro.github.io) is the live sample of Gistlog. All the contents here come form your gist.

## Intallation
This repositry consists of html, css and js so just clone this repogitry to any web server. I recommend to use github pages. Just push to your repositry as `<your_name>.github.io`

## Configuration
### Gist acccount
Specify your github account name in `config.js` file. Your **public** gist will be organized like [this sample page](http://narutaro.github.io). The only gists which are written in markdown and single file gist will be show up. 
### Default page
Specify your default gist id in `config.js` file. It will be the top page of the site. 
### About me
The profile image and description comes from your github's profile. Gistlog uses the info in the "location" field in github profile page as profile description - see right top of [this](http://narutaro.github.io) page. 


## Share your gist with a gist id
When you want to share one of your gistlog article, you can do so by the gist id in a query string.
```
http://narutaro.github.io/?=3205b6008782df4c66f4
```


