## ng2-pageloading

Pageloading effects for angular2, inspired by [PageLoadingEffects](http://tympanus.net/codrops/2014/04/23/page-loading-effects/) and [me-pageloading](https://github.com/Treri/me-pageloading).

### Install

    npm install ng2-pageloading --save

### Usage
1. include `<script src="http://cdn.staticfile.org/snap.svg/0.2.0/snap.svg-min.js"></script>` in your html
2. import `PageLoadingModule`.
3. use component `<page-loading></page-loading>`.


### API
- `PageLoadingService.show([effectName])`, show animation, you can specify which animation to show. If not specify, ng2-pageLoading will use the `effect` value set to `PageLoadingService`. If no effectName is set to `PageLoadingService`, the value is `random`.
- `PageLoadingService.hide()`, hide the current animation.


### ThanksTo
[PageLoadingEffects](http://tympanus.net/codrops/2014/04/23/page-loading-effects/) and [me-pageloading](https://github.com/Treri/me-pageloading)

### License
MIT
