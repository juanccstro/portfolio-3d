// lighting.ts — All lights and the day/night update system.
// Modificado para la estética GTA VI / Vice City (Neón, Sunset y Vaporwave).

import * as THREE from 'three';

// Room constants (shared with room.ts, character.ts)
export const BED_X = -3.5, BED_Z = -7.1;

export interface LightRefs {
    ambient: THREE.AmbientLight;
    dirLight: THREE.DirectionalLight;
    fillLeft: THREE.PointLight;
    fillRight: THREE.PointLight;
    ceiling: THREE.PointLight;
    deskGlow: THREE.PointLight;
    lampLight: THREE.SpotLight;
    nightLightPt: THREE.SpotLight;
    windowPane: THREE.Mesh | null; // assigned after room.ts builds walls
}

export function createLights(scene: THREE.Scene): LightRefs {
    // Soft ambient - Vice City pinkish ambient
    const ambient = new THREE.AmbientLight(0xffb0c8, 1.25); 
    scene.add(ambient);

    // Main directional - Golden hour orange / Sunset
    const dirLight = new THREE.DirectionalLight(0xff8b62, 2.7); 
    dirLight.position.set(5, 10, 6);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.set(1024, 1024);
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 40;
    dirLight.shadow.camera.left = dirLight.shadow.camera.bottom = -10;
    dirLight.shadow.camera.right = dirLight.shadow.camera.top = 10;
    dirLight.shadow.bias = -0.001;
    scene.add(dirLight);

    // Cool left fill - Vice City Teal/Cyan neon fill
    const fillLeft = new THREE.PointLight(0x58e4d2, 1.25, 12); 
    fillLeft.position.set(-4, 3, -3);
    scene.add(fillLeft);

    // Warm right fill - Vice City Hot Pink neon fill
    const fillRight = new THREE.PointLight(0xff3f8e, 1.55, 10); 
    fillRight.position.set(4, 2, -2);
    scene.add(fillRight);

    // Ceiling panel
    const ceiling = new THREE.PointLight(0xffc7a4, 1.35, 14);
    ceiling.position.set(0, 6, -4);
    scene.add(ceiling);

    // Desk ambient glow - Intense cyan terminal glow (Hacking vibe)
    const deskGlow = new THREE.PointLight(0x5ee7d0, 1.15, 5); 
    deskGlow.position.set(-0.3, 1.5, -6.5);
    scene.add(deskGlow);

    // Toggleable desk lamp spotlight
    const lampLight = new THREE.SpotLight(0xffb36b, 2.2, 5, Math.PI / 5, 0.35, 1.5);
    lampLight.position.set(0.7, 2.2, -6.15);
    lampLight.target.position.set(-0.3, 0, -6.5);
    lampLight.castShadow = true;
    lampLight.shadow.mapSize.set(512, 512);
    lampLight.shadow.bias = -0.002;
    scene.add(lampLight);
    scene.add(lampLight.target);

    // Night moonlight through window → bed - Magenta/Purple moonlight
    const nightLightPt = new THREE.SpotLight(0xff3f8e, 0, 9, Math.PI / 8, 0.4, 1.5); 
    nightLightPt.position.set(-4.7, 3.0, -5.8);
    nightLightPt.target.position.set(BED_X, 0.5, BED_Z);
    scene.add(nightLightPt);
    scene.add(nightLightPt.target);

    return { ambient, dirLight, fillLeft, fillRight, ceiling, deskGlow, lampLight, nightLightPt, windowPane: null };
}

/**
 * updateRoomLighting — drives all lights based on simulated time.
 * dayT: 0 = full night, 1 = full day.
 */
export function updateRoomLighting(
    refs: LightRefs,
    dayT: number,
    lampOn: boolean,
    laptopScreenMats: THREE.MeshStandardMaterial[],
    hour: number
): { deskGlowBase: number; lampLightBase: number; nightT: number } {
    const nightT = Math.max(0, 1 - dayT * 2.15);

    // Ambient - Warm magenta to sunset orange transition
    refs.ambient.intensity = 0.28 + dayT * 0.92;
    refs.ambient.color.setHSL(0.94 - dayT * 0.10, 0.62, 0.54 + dayT * 0.10); 

    // Main directional - Orange sun, deep purple night
    refs.dirLight.intensity = 0.32 + dayT * 2.05;
    refs.dirLight.color.setHex(dayT > 0.52 ? 0xff8b62 : 0x4b214d); 

    // Fill lights
    refs.fillLeft.intensity = 0.22 + dayT * 0.78;
    refs.fillRight.intensity = 0.42 + dayT * 0.62;

    // Ceiling panel off at night
    refs.ceiling.intensity = 0.12 + dayT * 1.28;

    // Desk glow (monitor)
    const deskGlowBase = 0.38 + dayT * 0.55;
    refs.deskGlow.intensity = deskGlowBase;

    // Lamp
    const lampLightBase = lampOn ? 1.7 + dayT * 0.55 : 0;
    refs.lampLight.intensity = lampLightBase;

    // Moonlight
    refs.nightLightPt.intensity = nightT * 1.25;
    if (refs.nightLightPt.userData.poolMat) {
        refs.nightLightPt.userData.poolMat.opacity = nightT * 0.55;
    }
    if (refs.nightLightPt.userData.bedPoolMat) {
        refs.nightLightPt.userData.bedPoolMat.opacity = nightT * 0.45;
    }

    // Window panes glow blue at night
    if (refs.windowPane) {
        const mat = refs.windowPane.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = (1 - dayT) * 0.55;
        mat.emissive.setHex(dayT < 0.5 ? 0xff3f8e : 0xffd6c7); // Ventanas con brillo magenta de noche
    }

    // Laptop screens off at night
    const screensOn = !(hour < 7 || hour >= 23);
    for (const m of laptopScreenMats) {
        m.emissiveIntensity = screensOn ? 1.15 : 0;
        // Si quieres que la pantalla en sí emita luz cyan puro en tu modelo, 
        m.emissive.setHex(0x5ee7d0);
    }

    return { deskGlowBase, lampLightBase, nightT };
}