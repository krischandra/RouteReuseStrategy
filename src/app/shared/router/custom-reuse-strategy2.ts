    {provide: RouteReuseStrategy, useClass: CustomReuseStrategy},
      [CartTokenGuardService, RouteActivationGuardService], data: {key: 'browseDevices'}
      
import {ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy} from '@angular/router';

export class CustomReuseStrategy extends RouteReuseStrategy {

  private routesToCache: string[] = ['browseDevices'];
  private handlers: {[key: string]: DetachedRouteHandle} = {};

  // Decides if the route should be stored
  public shouldDetach(route: ActivatedRouteSnapshot): boolean {
    const key = 'key';
    const isCacheRouteFound: boolean = this.routesToCache.indexOf(route.data[key]) > -1;
    return isCacheRouteFound;
  }

  // Store the information for the route we're destructing
  public store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    const key = 'key';
    this.handlers[route.data[key]] = handle;
  }

// Return true if we have a stored route object for the next route
  public shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const key = 'key';
    const storeRoute = !!this.handlers[route.data[key]];
    return storeRoute;
  }

  // If we returned true in shouldAttach(), now return the actual route data for restoration
  public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    const key = 'key';
    const shouldAttach = this.handlers[route.data[key]];
    return shouldAttach;
  }

  // Reuse the route if we're going to and from the same route
  public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    const areTheyEqual = future.routeConfig === curr.routeConfig;
    return areTheyEqual;
  }
}
