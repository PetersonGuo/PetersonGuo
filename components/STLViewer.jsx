"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import WindowFrame from "@/components/WindowFrame";

const DEG = Math.PI / 180;

/**
 * cad: {
 *   assembly: [{ src, position:[x,y,z], rotation?:[rx,ry,rz] }]  // degrees
 *   parts:    [{ name, src }]
 * }
 *
 * The CAD parts were each exported at their own origin, so the assembled view
 * places every instance explicitly (see ProjectData). Individual parts are
 * shown centred on their own.
 */
export default function STLViewer({ cad }) {
  const mountRef = useRef(null);
  const { assembly = [], parts = [] } = cad ?? {};

  // null = assembled view, otherwise an index into `parts`
  const [active, setActive] = useState(assembly.length ? null : 0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const instances =
      active === null
        ? assembly
        : [{ src: parts[active].src, position: [0, 0, 0] }];
    if (!instances.length) return;

    setLoading(true);
    setError(null);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0d1117);

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const key = new THREE.DirectionalLight(0xffffff, 1.0);
    key.position.set(1, 2, 3);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x4488ff, 0.4);
    fill.position.set(-2, -1, -2);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0xffffff, 0.3);
    rim.position.set(0, -1, -3);
    scene.add(rim);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.2;

    const material = new THREE.MeshPhongMaterial({
      color: 0x58a6ff,
      specular: 0x334455,
      shininess: 80,
      side: THREE.DoubleSide,
    });

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    resize();

    let disposed = false;
    let raf;
    const geometries = new Map();
    const group = new THREE.Group();

    const loader = new STLLoader();
    const load = (src) =>
      new Promise((resolve, reject) => loader.load(src, resolve, undefined, reject));

    // Load each distinct STL once; finger segments are reused across instances.
    Promise.all(
      [...new Set(instances.map((i) => i.src))].map((src) =>
        load(src).then((g) => {
          g.computeVertexNormals();
          geometries.set(src, g);
        })
      )
    )
      .then(() => {
        if (disposed) return;

        for (const inst of instances) {
          const mesh = new THREE.Mesh(geometries.get(inst.src), material);
          const [x = 0, y = 0, z = 0] = inst.position ?? [];
          mesh.position.set(x, y, z);
          if (inst.rotation) {
            const [rx = 0, ry = 0, rz = 0] = inst.rotation;
            mesh.rotation.set(rx * DEG, ry * DEG, rz * DEG);
          }
          group.add(mesh);
        }

        // Recentre the whole assembly on the origin so it orbits about itself.
        const box = new THREE.Box3().setFromObject(group);
        const center = new THREE.Vector3();
        const size = new THREE.Vector3();
        box.getCenter(center);
        box.getSize(size);
        group.position.sub(center);
        scene.add(group);

        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        camera.position.set(maxDim * 0.5, maxDim * 0.45, maxDim * 1.25);
        camera.near = maxDim / 1000;
        camera.far = maxDim * 100;
        camera.updateProjectionMatrix();
        controls.minDistance = maxDim * 0.3;
        controls.maxDistance = maxDim * 5;
        controls.target.set(0, 0, 0);
        controls.update();

        setLoading(false);
      })
      .catch((e) => {
        console.error("STL load error:", e);
        if (!disposed) {
          setError("Failed to load model");
          setLoading(false);
        }
      });

    const animate = () => {
      raf = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    window.addEventListener("resize", resize);
    // The window does not resize when the panel is maximised, so watch the
    // container itself as well.
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", resize);
      controls.dispose();
      geometries.forEach((g) => g.dispose());
      material.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [active, assembly, parts]);

  const tabs = [
    ...(assembly.length ? [{ key: null, label: "Assembled" }] : []),
    ...parts.map((p, i) => ({ key: i, label: p.name })),
  ];

  return (
    <WindowFrame title="CAD Viewer" hint="drag · scroll · right-click pan">
      {({ maximized }) => (
        <div className="flex min-h-0 flex-1 flex-col">
      {tabs.length > 1 && (
        <div className="flex flex-wrap gap-2 bg-[#161b22] border border-gray-700 rounded-t px-2 py-2">
          {tabs.map((t) => (
            <button
              key={t.label}
              onClick={() => setActive(t.key)}
              className={`px-3 py-1 text-xs rounded font-mono transition-colors ${
                t.key === active
                  ? "bg-blue-600 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-200"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}

      <div className={`relative ${maximized ? "min-h-0 flex-1" : ""}`}>
        <div
          ref={mountRef}
          className={`w-full rounded-b overflow-hidden border border-t-0 border-gray-800 ${
            maximized ? "h-full" : ""
          }`}
          style={maximized ? undefined : { height: "460px" }}
        />
        {(loading || error) && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span
              className={`text-xs font-mono ${
                error ? "text-red-400" : "text-gray-500"
              }`}
            >
              {error ?? "Loading model..."}
            </span>
          </div>
        )}
      </div>
        </div>
      )}
    </WindowFrame>
  );
}
