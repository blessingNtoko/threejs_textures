import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public scene = new THREE.Scene();
  public camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, .1, 1000);
  public renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  public controls = new OrbitControls(this.camera, this.renderer.domElement);
  public loadManager = new THREE.LoadingManager();
  public loader = new THREE.TextureLoader(this.loadManager);
  public objects = [];

  ngOnInit() {
    this.init();
  }

  private init() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.controls.update();

    this.scene.background = new THREE.Color(0x000);
    this.camera.position.z = 5;

    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const materials = [
      new THREE.MeshBasicMaterial({
        map: this.loader.load('./assets/quote1.png')
      }),
      new THREE.MeshBasicMaterial({
        map: this.loader.load('./assets/quote2.png')
      }),
      new THREE.MeshBasicMaterial({
        map: this.loader.load('./assets/quote3.png')
      }),
      new THREE.MeshBasicMaterial({
        map: this.loader.load('./assets/quote4.png')
      }),
      new THREE.MeshBasicMaterial({
        map: this.loader.load('./assets/quote5.png')
      }),
      new THREE.MeshBasicMaterial({
        map: this.loader.load('./assets/quote6.png')
      }),
    ];

    this.loadManager.onLoad = () => {
      const cube = new THREE.Mesh(cubeGeometry, materials);
      this.scene.add(cube);
      this.objects.push(cube);
    };


    window.addEventListener('resize', () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    }, false);

    const animate = () => {
      this.objects.forEach(obj => {
        obj.rotation.y += .02;
      });

      this.controls.update();

      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(animate);
    }
    animate();
  }
}
