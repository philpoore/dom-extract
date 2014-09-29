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
