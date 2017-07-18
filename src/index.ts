/**
 * create by 给力叔 on 2017/7/11.
 */
import {NgModule} from "@angular/core";
import {GlPageLoadingComponent} from "./page-loading.component";
import {PageLoadingService} from "./page-loading.service";
const components = [GlPageLoadingComponent]
@NgModule({
  imports: [],
  declarations: components,
  exports: components,
  providers: [PageLoadingService]
})
export class PageLoadingModule {
}
export {EffectData} from "./effect-data";
export {GlPageLoadingComponent} from "./page-loading.component";
export {PageLoadingService} from "./page-loading.service";
export {SVGAnimatorStatus} from "./svg-animator-status";
export {SVGAnimator} from "./svg-loader";
