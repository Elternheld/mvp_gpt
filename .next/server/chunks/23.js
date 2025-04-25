"use strict";exports.id=23,exports.ids=[23],exports.modules={1023:(e,t,a)=>{a.d(t,{clerkDevelopmentCache:()=>r,createConfirmationMessage:()=>createConfirmationMessage,createKeylessModeMessage:()=>createKeylessModeMessage});var s=a(2776);let createKeylessModeMessage=e=>`
\x1b[35m
[Clerk]:\x1b[0m You are running in keyless mode.
You can \x1b[35mclaim your keys\x1b[0m by visiting ${e.claimUrl}
`,createConfirmationMessage=()=>`
\x1b[35m
[Clerk]:\x1b[0m Your application is running with your claimed keys.
You can safely remove the \x1b[35m.clerk/\x1b[0m from your project.
`,r=function(){if((0,s.vf)())return global.__clerk_internal_keyless_logger||(global.__clerk_internal_keyless_logger={__cache:new Map,log:function({cacheKey:e,msg:t}){var a;this.__cache.has(e)&&Date.now()<((null==(a=this.__cache.get(e))?void 0:a.expiresAt)||0)||(console.log(t),this.__cache.set(e,{expiresAt:Date.now()+6e5}))},run:async function(e,{cacheKey:t,onSuccessStale:a=6e5,onErrorStale:s=6e5}){var r,i;if(this.__cache.has(t)&&Date.now()<((null==(r=this.__cache.get(t))?void 0:r.expiresAt)||0))return null==(i=this.__cache.get(t))?void 0:i.data;try{let s=await e();return this.__cache.set(t,{expiresAt:Date.now()+a,data:s}),s}catch(e){throw this.__cache.set(t,{expiresAt:Date.now()+s}),e}}}),globalThis.__clerk_internal_keyless_logger}()}};