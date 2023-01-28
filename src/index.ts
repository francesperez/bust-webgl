import {
    ViewerApp,
    AssetManagerPlugin,
    TonemapPlugin,
    
    addBasePlugins,
    TweakpaneUiPlugin, AssetManagerBasicPopupPlugin, CanvasSnipperPlugin,

    IViewerPlugin,

} from "webgi";
import "./styles.css";

import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

async function setupViewer(){

    const viewer = new ViewerApp({
        canvas: document.getElementById('webgi-canvas') as HTMLCanvasElement,
    })
    const manager = await viewer.addPlugin(AssetManagerPlugin)
    await viewer.addPlugin(AssetManagerBasicPopupPlugin)


    await addBasePlugins(viewer)

    await viewer.addPlugin(CanvasSnipperPlugin)

    viewer.renderer.refreshPipeline()

    await manager.addFromPath("./assets/bustXglossy.glb")

    viewer.getPlugin(TonemapPlugin)!.config!.clipBackground = true;

// Uncomment later: this is in video 
    // viewer.scene.activeCamera.setCameraOptions({controlsEnabled: false});

    // Load an environment map if not set in the glb file
    // await viewer.scene.setEnvironment(
    //     await manager.importer!.importSinglePath<ITexture>(
    //         "./assets/environment.hdr"
    //     )
    // );

    // Add some UI for tweak and testing.
    const uiPlugin = await viewer.addPlugin(TweakpaneUiPlugin)
    // Add plugins to the UI to see their settings.
    uiPlugin.setupPlugins<IViewerPlugin>(TonemapPlugin, CanvasSnipperPlugin)

}

setupViewer()
