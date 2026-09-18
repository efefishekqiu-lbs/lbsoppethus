$(document).ready(function(){
   let currentStep=0;
   let isScrolling=false;
   const steps=[$(".viewPort"),$(".information"),$('.projects'),$('.footer')];
   const duration=700;

   function easeInOut(t){
       return t<0.5
           ?2*t*t
           :1-Math.pow(-2*t+2,2)/2;
   }

   function goToStep(step){
       if(step<0||step>=steps.length||isScrolling)return;
       $('.header-options-option').css('color', '#dedede')
       $('.header-options-option > div').hide()
       $('.header-options-option').css({
           'position': 'relative',
           'top': '0',
       })
       if (step == 1) {
           $('.header-options-option[data-type="about"]').css('color', '#fff')
           $('.header-options-option[data-type="about"]>div').show()
           $('.header-options-option[data-type="about"]').css({
               'position': 'relative',
               'top': '-0.5vh',
           })
       }
       if (step == 2) {
           $('.header-options-option[data-type="work"]').css('color', '#fff')
           $('.header-options-option[data-type="work"]>div').show()
           $('.header-options-option[data-type="work"]').css({
               'position': 'relative',
               'top': '-0.5vh',
           })
       }
       if (step == 3) {
           $('.header-options-option[data-type="contact"]').css('color', '#fff')
           $('.header-options-option[data-type="contact"]>div').show()
           $('.header-options-option[data-type="contact"]').css({
               'position': 'relative',
               'top': '-0.5vh',
           })
       }

       isScrolling=true;
       currentStep=step;

       const target=step===0?0:steps[step].offset().top-50;
       const start=window.scrollY;
       const distance=target-start;
       const startTime=performance.now();

       function animate(time){
           const progress=Math.min((time-startTime)/duration,1);
           const eased=easeInOut(progress);

           window.scrollTo(0,start+(distance*eased));

           if(progress<1){
               requestAnimationFrame(animate);
           }else{
               window.scrollTo(0,target);
               isScrolling=false;
           }
       }

       requestAnimationFrame(animate);
   }

   $(window).on("wheel",function(e){
       e.preventDefault();
       if(isScrolling)return;

       if(e.originalEvent.deltaY>0){
           goToStep(currentStep+1);
       }else if(e.originalEvent.deltaY<0){
           goToStep(currentStep-1);
       }
   });

   $(document).on("keydown",function(e){
       if(e.key==="ArrowDown"){
           e.preventDefault();
           goToStep(currentStep+1);
       }else if(e.key==="ArrowUp"){
           e.preventDefault();
           goToStep(currentStep-1);
       }
   });


   document.querySelectorAll('.present-art,.tilt-3d').forEach(el=>{
      el.style.transition='transform .15s ease';
      el.style.transformStyle='preserve-3d';
      el.style.willChange='transform';
    
      el.addEventListener('mousemove',e=>{
        const r=el.getBoundingClientRect();
        const x=(e.clientX-r.left)/r.width-.5;
        const y=(e.clientY-r.top)/r.height-.5;
    
        el.style.transition='transform .05s linear';
        el.style.transform=`perspective(800px) rotateX(${-y*20}deg) rotateY(${x*20}deg) scale(1.03)`;
      });
    
      el.addEventListener('mouseleave',()=>{
        el.style.transition='transform .4s ease';
        el.style.transform='perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
      });
    });
})

