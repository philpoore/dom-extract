### Dom Extract
Filter HTML from file by Css Selector.


#### Install
```
npm install git+https://git@github.com/philpoore/dom-extract.git -g
```

#### Usage

Select all `h1` from `index.html`
```
selector='h1'
file='index.html'
dom-extract $selector $file
```

#### Advanced Useage

Use with `find` and `xargs` to get all `title` tags, out of `*.html` files.
```
find . -name "*.html" | xargs -L 1 dom-extract 'title'
```

Pipe in `STDIN` instead of using filename
```
cat index.html | dom-extract 'title'
```

Extract Number of Followers from Twitter Username
```
curl -sk https://twitter.com/philpoore | dom-extract ".ProfileNav-item--followers .ProfileNav-value" --text
```

#### Version History

##### v0.0.5
+ Allow pipe from STDIN

##### v0.0.6
Bump

##### v0.0.7
Dump

##### v0.0.8 - Current
+ Added support for using as libary
+ Extended the cli to include showing innerHTML
+ Added Testing
+ Update README.md

#### Who
Phil Poore made this :P