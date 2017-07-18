/**
 * create by 给力叔 on 2017/7/11.
 */
import {Component, OnInit, Input, ViewChild, ElementRef, Renderer2} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";
import {PageLoadingService} from "./page-loading.service";
import {SVGAnimatorStatus} from "./svg-animator-status";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'page-loading',
  templateUrl: "page-loading.component.html",
  styleUrls: ['page-loading.component.scss']
})
export class GlPageLoadingComponent implements OnInit {
  @ViewChild("loader") loaderElementRef: ElementRef;

  @Input() effectIndex = -1;

  constructor(public router: Router,
              public renderer2: Renderer2,
              public pageLoadingService: PageLoadingService) {

  }

  ngOnInit() {
    let animator = this.pageLoadingService.init(this.loaderElementRef.nativeElement, this.renderer2);
    let subscription: Subscription;
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        subscription && subscription.unsubscribe();
        animator.show(this.pageLoadingService.getEffect(this.effectIndex));
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        //svg has animate in then hide the svg directly;
        if (animator.status == SVGAnimatorStatus.showEnd) {
          animator.hide();
        } else {//wait for svg animate in
          subscription = animator.subscribe((status) => {
            if (status == SVGAnimatorStatus.showEnd) {
              animator.hide();
            }
          });
        }
      }
    });
  }
}
