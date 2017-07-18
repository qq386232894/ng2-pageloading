/**
 * create by 给力叔 on 2017/7/11.
 */
import {Injectable, Renderer2} from '@angular/core';
import {EffectData} from "./effect-data";
import {SVGAnimator} from "./svg-loader";
@Injectable()
export class PageLoadingService {
  private _animator:SVGAnimator;
  effects = [
    {
      name:"Lazy Stretch",
      opening: 'M20,15 50,30 50,30 30,30 Z;M0,0 80,0 50,30 20,45 Z;M0,0 80,0 60,45 0,60 Z;M0,0 80,0 80,60 0,60 Z',
      closing: 'M0,0 80,0 60,45 0,60 Z;M0,0 80,0 50,30 20,45 Z;M20,15 50,30 50,30 30,30 Z;M30,30 50,30 50,30 30,30 Z',
      path: 'M30,30 50,30 50,30 30,30 Z',
      speedIn: 100
    },
    {
      name:"Circle",
      opening: 'M 40 -21.875 C 11.356078 -21.875 -11.875 1.3560784 -11.875 30 C -11.875 58.643922 11.356078 81.875 40 81.875 C 68.643922 81.875 91.875 58.643922 91.875 30 C 91.875 1.3560784 68.643922 -21.875 40 -21.875 Z',
      path: 'M40,30 c 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 Z',
      speedIn: 300,
      easingIn: 'easeinout'
    },
    {
      name:"Spill",
      opening: 'M 0,0 c 0,0 63.5,-16.5 80,0 16.5,16.5 0,60 0,60 L 0,60 Z',
      path: 'M 0,0 c 0,0 -16.5,43.5 0,60 16.5,16.5 80,0 80,0 L 0,60 Z',
      speedIn: 400,
      easingIn: 'easeinout'
    },
    {
      name:"Frame it",
      opening: 'M 0,0 0,60 80,60 80,0 Z M 40,30 40,30 40,30 40,30 Z',
      path: 'M 0,0 0,60 80,60 80,0 Z M 80,0 80,60 0,60 0,0 Z',
      speedIn: 300,
      easingIn: 'easeinout'
    },
    {
      name:"Tunnel vision",
      opening: 'M -18 -26.90625 L -18 86.90625 L 98 86.90625 L 98 -26.90625 L -18 -26.90625 Z M 40 29.96875 C 40.01804 29.96875 40.03125 29.98196 40.03125 30 C 40.03125 30.01804 40.01804 30.03125 40 30.03125 C 39.98196 30.03125 39.96875 30.01804 39.96875 30 C 39.96875 29.98196 39.98196 29.96875 40 29.96875 Z',
      path: 'M -18 -26.90625 L -18 86.90625 L 98 86.90625 L 98 -26.90625 L -18 -26.90625 Z M 40 -25.6875 C 70.750092 -25.6875 95.6875 -0.7500919 95.6875 30 C 95.6875 60.750092 70.750092 85.6875 40 85.6875 C 9.2499078 85.6875 -15.6875 60.750092 -15.6875 30 C -15.6875 -0.7500919 9.2499078 -25.6875 40 -25.6875 Z',
      speedIn: 300,
      easingIn: 'easeinout'
    },
    {
      name:"Windscreen wiper",
      opening: 'M 40,100 150,0 -65,0 z',
      path: 'M 40,100 150,0 l 0,0 z',
      speedIn: 400,
      easingIn: 'easeinout'
    },
    {
      name:"Jammed blind",
      opening: 'M 0,60 80,60 80,50 0,40 0,60;M 0,60 80,60 80,25 0,40 0,60;M 0,60 80,60 80,25 0,10 0,60;M 0,60 80,60 80,0 0,0 0,60',
      closing: 'M 0,60 80,60 80,20 0,0 0,60;M 0,60 80,60 80,20 0,40 0,60;m 0,60 80,0 0,0 -80,0',
      path: 'm 0,60 80,0 0,0 -80,0',
      speedIn: 200,
      easingIn: 'linear'
    },
    {
      name:"Parallelogram",
      opening: 'M 0,0 0,60 80,60 80,0 z M 80,0 40,30 0,60 40,30 z',
      path: 'M 0,0 0,60 80,60 80,0 Z M 80,0 80,60 0,60 0,0 Z',
      speedIn: 300,
      speedOut: 600,
      easingIn: 'easeinout',
      easingOut: 'bounce'
    },
    {
      name:"Tilted",
      opening: 'M 0,0 80,-10 80,60 0,70 0,0',
      path: 'M 0,70 80,60 80,80 0,80 0,70',
      speedIn: 400,
      easingIn: 'easeinout'
    },
    {
      name:"Lateral Swipe",
      opening: 'M 40,-65 145,80 -65,80 40,-65',
      closing: 'm 40,-65 0,0 L -65,80 40,-65',
      path: 'M 40,-65 145,80 40,-65',
      speedIn: 500,
      easingIn: 'easeinout'
    },
    {
      name:"Wave",
      opening: 'm -5,-5 0,70 90,0 0,-70 z m 5,35 c 0,0 15,20 40,0 25,-20 40,0 40,0 l 0,0 C 80,30 65,10 40,30 15,50 0,30 0,30 z',
      path: 'm -5,-5 0,70 90,0 0,-70 z m 5,5 c 0,0 7.9843788,0 40,0 35,0 40,0 40,0 l 0,60 c 0,0 -3.944487,0 -40,0 -30,0 -40,0 -40,0 z',
      speedIn: 400,
      easingIn: 'easeinout'
    },
    {
      name:"Origami",
      opening: 'm -10,-10 0,80 100,0 0,-80 z m 50,-30.5 0,70.5 0,70 0,-70 z',
      path: 'm -10,-10 0,80 100,0 0,-80 z M 40,-40.5 120,30 40,100 -40,30 z',
      speedIn: 400,
      easingIn: 'easeinout'
    },
    {
      name:"Curtain",
      opening: 'm 40,-80 190,0 -305,290 C -100,140 0,0 40,-80 z',
      path: 'm 75,-80 155,0 0,225 C 90,85 100,30 75,-80 z',
      speedIn: 700,
      easingIn: 'easeinout'
    }
  ]

  /**
   * get effect data
   * @param index: not valid is random
   */
  getEffect(index:number = -1):EffectData{
    let effectObj:any,
      initialPath,
      openingSteps,
      openingStepsStr,
      openingStepsTotal,
      closingSteps,
      closingStepsStr,
      closingStepsTotal,
      speedOut,
      easingOut;
    let effects = this.effects;
    let effectData:EffectData;
    if(index < 0 || index > effects.length - 1){
      effectObj = effects[Math.floor(Math.random() * 13)]
    }else{
      effectObj = effects[index];
    }

    initialPath = effectObj.path;

    openingStepsStr = effectObj.opening;
    openingSteps = openingStepsStr ? openingStepsStr.split(';') : '';
    openingStepsTotal = openingStepsStr ? openingSteps.length : 0;

    if(openingStepsTotal === 0){
      throw new Error("openingStepsTotal can't be zero!");
    }

    closingStepsStr = effectObj.closing || initialPath;
    closingSteps = closingStepsStr ? closingStepsStr.split(';') : '';
    closingStepsTotal = closingStepsStr ? closingSteps.length : 0;

    speedOut = effectObj.speedOut || effectObj.speedIn;
    easingOut = effectObj.easingOut || effectObj.easingIn;

    effectData = {
      initialPath: initialPath,
      openingSteps: openingSteps,
      openingStepsTotal: openingStepsTotal,
      closingSteps: closingSteps,
      closingStepsTotal: closingStepsTotal,
      speedOut: speedOut,
      easingOut: easingOut,
      speedIn: effectObj.speedIn,
      easingIn: effectObj.easingIn
    };

    return effectData;
  }

  init(element:any,Renderer2:Renderer2){
    return this._animator = new SVGAnimator(element,Renderer2);
  }

  show(effectIndex:number){
    this._animator.show(this.getEffect(effectIndex));
  }

  hide(){
    this._animator.hide();
  }

  get animator(){
    return this._animator;
  }
}
