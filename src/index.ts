import {
    ViewerApp,
    AssetManagerPlugin,
    GBufferPlugin,
    ProgressivePlugin,
    TonemapPlugin,
    SSRPlugin,
    SSAOPlugin,
    BloomPlugin,
    Vector3, GammaCorrectionPlugin, MeshBasicMaterial2, Color
} from "webgi";
import "./styles.css";

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

async function setupViewer(){

    const viewer = new ViewerApp({
        canvas: document.getElementById('webgi-canvas') as HTMLCanvasElement,
        // isAntialiased: true,
    })

    const manager = await viewer.addPlugin(AssetManagerPlugin)
    const camera = viewer.scene.activeCamera
    const position = camera.position
    const target = camera.target
    const exitButton = document.querySelector('.button--exit') as HTMLElement
    const customizerInterface = document.querySelector('.customizer--container') as HTMLElement

    // Add plugins individually.
    await viewer.addPlugin(GBufferPlugin)
    await viewer.addPlugin(new ProgressivePlugin(32))
    await viewer.addPlugin(new TonemapPlugin(true))
    await viewer.addPlugin(GammaCorrectionPlugin)
    await viewer.addPlugin(SSRPlugin)
    await viewer.addPlugin(SSAOPlugin)
    await viewer.addPlugin(BloomPlugin)

    viewer.renderer.refreshPipeline()

    await manager.addFromPath("./assets/scene2.glb")

    viewer.getPlugin(TonemapPlugin)!.config!.clipBackground = true;

    viewer.scene.activeCamera.setCameraOptions({controlsEnabled: false});

    onUpdate();


    function setupScrollAnimation(){
        const tl = gsap.timeline();
    // First Section
        tl
        .to(position,{
            x: -1.80, y: 1.75, z: 2.68,
            scrollTrigger: {
                trigger: ".section2",
                start: "top bottom",
                end: "top top",
                scrub: true,
                immediateRender: false
            },
            onUpdate
        })

        .to(".container1", { xPercent:'-150' , opacity:0,
        scrollTrigger: {
            trigger: ".section2",
            start:"top bottom",
            end: "top 80%", scrub: 1,
            immediateRender: false
    }})

        .to(target,{
            x: 0.27, z: 0.29, y: 0.60,
            scrollTrigger: {
                trigger: ".section2",
                start: "top bottom",
                end: "top top",
                scrub: true,
                immediateRender: false
            }})
// Final Section
        .to(position,{
            x: -1.42, y: -0.30, z: 2.06,
            scrollTrigger: {
                trigger: ".section3",
                start: "top bottom",
                end: "top top",
                scrub: true,
                immediateRender: false
            },
            onUpdate
        })

        .to(target,{
            x: -0.70, y: 0.62, z: 0.65,
            scrollTrigger: {
                trigger: ".section3",
                start: "top bottom",
                end: "top top",
                scrub: true,
                immediateRender: false
            }})
    
    }

    setupScrollAnimation();

    let needsUpdate = true;

    function onUpdate(){
        needsUpdate = true;
        // viewer.renderer.resetShadows();
        viewer.setDirty();
    }

    viewer.addEventListener("preFrame", () => {
        if (needsUpdate) {
            camera.positionTargetUpdated(true)
            needsUpdate = false;
        }
    });

    document.querySelector(".customize")?.addEventListener('click', () => {


    }

}





setupViewer()
