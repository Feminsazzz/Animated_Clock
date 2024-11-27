const facecolor = document.getElementById('face-color');
const bordercolor = document.getElementById('border-color');
const linecolor = document.getElementById('line-color');
const lhcolor = document.getElementById('large-hand-color');
const shcolor = document.getElementById('second-hand-color');
const canvas = document.getElementById('my-canvas');


function clock() {
  const now  = new Date();
  const ctx = canvas.getContext('2d');

  // Setting up canvas
  ctx.save()
  ctx.clearRect(0,0,500,500);
  ctx.translate(250,180);
  ctx.rotate(-Math.PI / 2); //Rotating 90 deg
  

  // These are the default styles
  ctx.strokeStyle = '#000000';
  ctx.fillStyle = '#f4f4f4';
  ctx.lineWidth = 5 ;
  ctx.lineCap = 'round' ;

  // Drawing the clock
  ctx.save();  // Save the state
  ctx.beginPath();
  ctx.lineWidth = 14 ;
  ctx.strokeStyle = bordercolor.value;
  ctx.fillStyle = facecolor.value;
  ctx.arc(0,0,142,0,Math.PI*2,true);
  ctx.stroke();
  ctx.fill();
  ctx.restore();

  //Draw hour lines
  ctx.save();
  ctx.strokeStyle = linecolor.value;
  for(let i = 0 ; i < 12 ; i++){
    ctx.beginPath();
    ctx.rotate(Math.PI / 6); // Here the number you put just doubles the value of lines
    ctx.moveTo(100 , 0);
    ctx.lineTo(120,0);
    ctx.stroke();
  }
  ctx.restore();
  
  //Draw the minute lines
  ctx.save();
  ctx.strokeStyle = linecolor.value;
  ctx.lineWidth = 4;
  for(let i = 0 ; i < 60 ; i++){
    if(i%5 !== 0){
      ctx.beginPath();
      ctx.moveTo(115 , 0);
      ctx.lineTo(120,0);
      ctx.stroke();
    }
    ctx.rotate(Math.PI / 30); // Here the number you put just doubles the value of lines
  }
  ctx.restore();

  // Get Current Time
  const hr = now.getHours() % 12;
  const min = now.getMinutes();
  const sec = now.getSeconds();

  //console.log(`${hr}:${min}:${sec}`);

  //Draw hour hand
  ctx.save();
  ctx.rotate((Math.PI /6)*hr + (Math.PI /360)*min +(Math.PI /21600)*sec);
  ctx.strokeStyle = lhcolor.value;
  ctx.lineWidth = 10 ;
  ctx.beginPath();
  ctx.moveTo(-20,0);
  ctx.lineTo(85,0);
  ctx.stroke();
  console.log((Math.PI /6)*hr + (Math.PI /360)*min +(Math.PI /21600)*sec); // we have 12 hours so we are / by 6
  ctx.restore();

  //Draw minute hand
  ctx.save();
  ctx.rotate((Math.PI /30)*min +(Math.PI /1800)*sec);
  ctx.strokeStyle = shcolor.value;
  ctx.lineWidth = 8 ;
  ctx.beginPath();
  ctx.moveTo(-28,0);
  ctx.lineTo(112,0);
  ctx.stroke();
  ctx.restore();

  //Draw second hand
  ctx.save();
  ctx.rotate((Math.PI /30)*sec);
  ctx.strokeStyle = '#FF7F50';
  ctx.fillStyle = '#FF7F50';
  ctx.lineWidth = 4 ;
  ctx.beginPath();
  ctx.moveTo(-38,0);
  ctx.lineTo(122,0);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0,0,10,0,Math.PI*2 ,true);
  ctx.fill();
  ctx.restore();

  ctx.restore(); // restore default state

  requestAnimationFrame(clock);
}

requestAnimationFrame(clock);

document.getElementById('save-btn').addEventListener('click', ()=>{
  const dataUrl = canvas.toDataURL('image/png'); // converting canvas to a image
  const link = document.createElement('a'); // creating an anchor tag
  link.download = 'clock.png'; // downloading the clock
  link.href = dataUrl ; // giving the web address to dataurl
  link.click(); // trigerring the download so that it will download
});
