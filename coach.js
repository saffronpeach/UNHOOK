// Validated, local-only fallback and server-side routing for AI game suggestions.
export const choices=['loop','switch','notifications','adventure'];
export const baseline={
 bored:{game:'loop',insight:'Boredom may feel uncomfortable, but you can choose what to do next.',action:'Try a one-minute phone-free activity and notice how you feel.'},
 stressed:{game:'adventure',insight:'Distraction and genuine rest are not always the same.',action:'Try a short screen-free break and notice if it feels restorative.'},
 stuck:{game:'switch',insight:'A tiny first step can make starting a task easier.',action:'Open your task and attempt only its first 30-second step.'},
 fomo:{game:'notifications',insight:'Not every alert requires an immediate response.',action:'Silence one optional notification until your next planned check-in.'}
};
export function fallback(message='',selected='bored'){
 const t=message.toLowerCase();let trigger=['bored','stressed','stuck','fomo'].includes(selected)?selected:'bored';
 if(/homework|study|exam|procrastinat|start|overwhelm|assignment|task/.test(t))trigger='stuck';
 else if(/notif|message|miss|fomo|friend|reply/.test(t))trigger='fomo';
 else if(/stress|anxious|tired|relax|exhaust/.test(t))trigger='stressed';
 else if(/bored|nothing to do|restless/.test(t))trigger='bored';
 return {trigger,...baseline[trigger],source:'local'};
}
export function safeResult(r){
 if(!r||typeof r!=='object'||!choices.includes(r.game)||typeof r.trigger!=='string'||typeof r.insight!=='string'||typeof r.action!=='string')return null;
 const trim=(x,n)=>x.trim().slice(0,n);
 const result={trigger:trim(r.trigger,60),game:r.game,insight:trim(r.insight,260),action:trim(r.action,240),source:'ai'};
 return result.insight&&result.action?result:null;
}
