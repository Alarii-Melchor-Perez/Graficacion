
//import { Input } from './Input.js';
import { Obj3D } from './Obj3D.js';
//import { Canvas3D } from './Canvas3D.js';
//import { CvWireframe } from './CvWireFrame.js';
import { CvHLines } from './CvHLines.js';
import { Rota3D } from './Rota3D.js';
import { Point3D } from './Point3D.js';

let canvas: HTMLCanvasElement;
let graphics: CanvasRenderingContext2D;

canvas = <HTMLCanvasElement>document.getElementById('circlechart');
graphics = canvas.getContext('2d');

let cv: CvHLines;
let obj: Obj3D;
let ang: number=0;

function leerArchivo(e:any) {
  var archivo = e.target.files[0];
  if (!archivo) {
    return;
  }
  var lector = new FileReader();
  lector.onload = function(e) {
    var contenido = e.target.result;
    mostrarContenido(contenido);
    obj = new Obj3D();
    if (obj.read(contenido)) {
      //sDir = sDir1;
      cv = new CvHLines(graphics, canvas);
      cv.setObj(obj);
      cv.paint();
    }
  };
  lector.readAsText(archivo);
}

function mostrarContenido(contenido:any) {
  var elemento = document.getElementById('contenido-archivo');
  //
  //readObject(new Input(contenido));
  elemento.innerHTML = contenido;
}

function vp(dTheta:number, dPhi:number, fRho:number):void{  // Viewpoint
  if (obj != undefined) {
    let obj: Obj3D = cv.getObj();
    if (!obj.vp(cv, dTheta, dPhi, fRho))
      alert('datos no validos');
  }
  else
    alert('aun no has leido un archivo');
}

function eyeDownFunc() {
  vp(0, 0.1, 1);
}

function eyeUpFunc() {
  vp(0, -0.1, 1);
}

function eyeLeftFunc() {
  vp(-0.1, 0, 1);
}

function eyeRightFunc() {
  vp(0.1, 0, 1);
}

function incrDistFunc() {
  vp(0, 0, 2);
}

function decrDistFunc() {
  vp(0, 0, 0.5);
}
let contI: number = 0;

let contII: number = 0;

function AbrirPuerta1() {
  let af = 30;
  if(contI<=2){
	Rota3D.initRotate( obj.w[139], obj.w[140], -af*Math.PI/180);	
	
  for (let i = 1; i <= 16; i++){
    obj.w[i] = Rota3D.rotate(obj.w[i]);
	}
	cv.setObj(obj);
  cv.paint();	
  contI++;
  }else{
    alert('No se puede abrir mas');
  }
}

function CerrarPuerta1() {
  let af = 30;
  if(contI> 0 && contI<=3){
	Rota3D.initRotate( obj.w[139], obj.w[140], af*Math.PI/180);	
	
  for (let i = 1; i <= 16; i++){
    obj.w[i] = Rota3D.rotate(obj.w[i]);
	}
	cv.setObj(obj);
  cv.paint();	
  contI--;
  }else{
    alert('No se puede cerrar mas');
  }
}

function AbrirPuerta2() {
  let af = 30;
  if(contII<=2){
	Rota3D.initRotate( obj.w[139], obj.w[140], -af*Math.PI/180);	
	
  for (let i = 17; i <= 32; i++){
    obj.w[i] = Rota3D.rotate(obj.w[i]);
	}
	cv.setObj(obj);
  cv.paint();	
  contII++;
  }else{
    alert('No se puede abrir mas');
  }
}

function CerrarPuerta2() {
  let af = 30;
  if(contII> 0 && contII<=3){
	Rota3D.initRotate( obj.w[139], obj.w[140], af*Math.PI/180);	
	
  for (let i = 17; i <= 32; i++){
    obj.w[i] = Rota3D.rotate(obj.w[i]);
	}
	cv.setObj(obj);
  cv.paint();	
  contII--;
  }else{
    alert('No se puede cerrar mas');
  }
}

document.getElementById('file-input').addEventListener('change', leerArchivo, false);
document.getElementById('eyeDown').addEventListener('click', eyeDownFunc, false);
document.getElementById('eyeUp').addEventListener('click', eyeUpFunc, false);
document.getElementById('eyeLeft').addEventListener('click', eyeLeftFunc, false);
document.getElementById('eyeRight').addEventListener('click', eyeRightFunc, false);
document.getElementById('incrDist').addEventListener('click', incrDistFunc, false);
document.getElementById('decrDist').addEventListener('click', decrDistFunc, false);


//movimiento de piezas
document.getElementById('pza1Der').addEventListener('click', AbrirPuerta1, false);
document.getElementById('pza1Izq').addEventListener('click', CerrarPuerta1, false);
document.getElementById('pza1Der2').addEventListener('click', AbrirPuerta2, false);
document.getElementById('pza1Izq2').addEventListener('click', CerrarPuerta2, false);

let Pix: number, Piy: number;
let Pfx: number, Pfy: number;
let theta = 0.3, phi = 1.3, SensibilidadX = 0.02, SensibilidadY = 0.02;
let flag: boolean = false;

function handleMouse(evento: any) {
  Pix=evento.offsetX;
  Piy = evento.offsetY;
  flag = true;
}

function makeVizualization(evento: any) {
  if (flag) {
    Pfx = evento.offsetX;
    Pfy = evento.offsetY;
    //console.log(Pfx, Pfy)
    let difX = Pix - Pfx;
    let difY = Pfy - Piy;
    vp(0, 0.1 * difY / 50, 1);
    Piy = Pfy;
    vp(0.1 * difX, 0 / 50, 1);
    Pix = Pfx;
    /*if( Piy>Pfy+1 ){
      phi += SensibilidadY;
      vp(0, 0.1*, 1);
      //cv.redibuja(theta, phi, tamanoObjeto);
      Piy=Pfy;
    }

    if(Pfy>Piy+1){
      phi -= SensibilidadY;
      vp(0,-0.1, 1);
      //cv.redibuja(theta, phi, tamanoObjeto);
      Piy=Pfy;
    }*/

    /*if (Pix > Pfx + 1) {
      theta += SensibilidadX;
      vp(0.1, 0, 1);
      //cv.redibuja(theta, phi, tamanoObjeto);
      Pix = Pfx;
    }
        
    if (Pfx > Pix + 1) {
      theta -= SensibilidadX;
      vp(-0.1, 0, 1);
      //cv.redibuja(theta, phi, tamanoObjeto);
      Pix = Pfx;
    }*/
  }
}

function noDraw() {
  flag = false;
}

canvas.addEventListener('mousedown', handleMouse);
canvas.addEventListener('mouseup', noDraw);
canvas.addEventListener('mousemove', makeVizualization);