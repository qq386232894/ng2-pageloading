import {Renderer2} from "@angular/core";
import {EffectData} from "./effect-data";
import {SVGAnimatorStatus} from "./svg-animator-status";
import {Subject} from "rxjs/Subject";
/**
 * create by 给力叔 on 2017/7/11.
 */
declare var mina:any;
declare var Snap:any;
export class SVGAnimator extends Subject<SVGAnimatorStatus>{
  el:any;
  options:any = {};
  path:any;
  renderer2:Renderer2;                 //just use to change the element class
  private _status:SVGAnimatorStatus;
  constructor(el:any,renderer2:Renderer2){
    super();
    this.el = el;
    this.renderer2 = renderer2;
    this._init();
    this.updateStatus(SVGAnimatorStatus.ready)
  }
  _init(){
    var s = Snap( this.el.querySelector( 'svg' ) );
    this.path = s.select( 'path' );
  }

  /**
   * show svg
   * @param effectData
   * @returns {boolean}
   */
  show(effectData:EffectData){
    if( this.isAnimating ) return false;
    this.updateStatus(SVGAnimatorStatus.showStart);

    this.path.attr('d', effectData.initialPath);
    this.options = effectData;
    // animate svg
    var onEndAnimation = ()=> {
        this.renderer2.addClass( this.el, 'pageload-loading' );
      this.updateStatus(SVGAnimatorStatus.showEnd);
      };
    this._animateSVG( 'in', onEndAnimation );
    this.renderer2.addClass( this.el, 'show' );
  }

  /**
   * hide svg
   */
  hide(){
    this.renderer2.removeClass( this.el, 'pageload-loading' );
    this.updateStatus(SVGAnimatorStatus.hideStart);

    this._animateSVG( 'out', ()=> {
      // reset path
      this.path.attr( 'd', this.options.initialPath );
      this.renderer2.removeClass( this.el, 'show' );
      this.updateStatus(SVGAnimatorStatus.ready);
    } );
  }

  public get isAnimating(){
    return this._status > SVGAnimatorStatus.ready;
  }

  /**
   * update status and emit event
   * @param status
   */
  private updateStatus(status:SVGAnimatorStatus){
    this._status = status;
    this.next(status);
  }

  //the status is readonly
  public get status(){
    return this._status;
  }

  /**
   * @param dir  in or out
   * @param callback  animation end callback
   * @private
   */
  _animateSVG(dir:any, callback:any){
    //get the in/out animating data
    var self = this,
      pos = 0,
      options:EffectData = this.options,
      steps = dir === 'out' ? options.closingSteps : options.openingSteps,
      stepsTotal = dir === 'out' ? options.closingStepsTotal : options.openingStepsTotal,
      speed = dir === 'out' ? options.speedOut : options.speedIn,
      easing = mina[dir === 'out' ? options.easingOut : options.easingIn],
      nextStep = function( pos:number ) {
        if( pos > stepsTotal - 1 ) {
          if( callback && typeof callback == 'function' ) {
            callback();
          }
          return;
        }
        self.path.animate( { 'path' : steps[pos] }, speed, easing, function() { nextStep(pos); } );
        pos++;
      };

    nextStep(pos);
  }
}
