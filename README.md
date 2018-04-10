# RouteReuseStrategy

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.0-rc.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

How RouteReuseStrategy works,

When you navigate, shouldReuseRoute fires. This one is a little odd to me, but if it returns true, then it actually reuses the route you're currently on and none of the other methods are fired. I just return false if the user is navigating away.

If shouldReuseRoute returns false, shouldDetach fires. shouldDetach determines whether or not you want to store the route, and returns a boolean indicating as much. This is where you should decide to store/not to store paths, which I would do by checking an array of paths you want stored against route.routeConfig.path, and returning false if the path does not exist in the array.
If shouldDetach returns true, store is fired, which is an opportunity for you to store whatever information you would like about the route. Whatever you do, you'll need to store the DetachedRouteHandle because that's what Angular uses to identify your stored component later on. Below, I store both the DetachedRouteHandle and the ActivatedRouteSnapshot into a variable local to my class.
So, we've seen the logic for storage, but what about navigating to a component? How does Angular decide to intercept your navigation and put the stored one in its place?

Again, after shouldReuseRoute has returned false, shouldAttach runs, which is your chance to figure out whether you want to regenerate or use the component in memory. If you want to reuse a stored component, return true and you're well on your way!
Now Angular will ask you, "which component do you want us to use?", which you will indicate by returning that component's DetachedRouteHandle from retrieve.

How to use?

Navigate to src/app/shared/router/custom-reuse-strategy2.ts
