"use client";

import { useEffect, useRef } from "react";
import styles from "./HeroExperience.module.css";

type Props = {
  motion: boolean;
  study: number;
  wireframe: boolean;
  onStatus: (status: "ready" | "fallback") => void;
};

/** A real, locally rendered sculpture. No remote models, textures or render service. */
export function HeroSculpture({ motion, study, wireframe, onStatus }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const settings = useRef({ motion, study, wireframe });
  const invalidate = useRef<() => void>(() => {});

  useEffect(() => {
    settings.current = { motion, study, wireframe };
    invalidate.current();
  }, [motion, study, wireframe]);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let disposed = false;
    let cleanup = () => {};

    async function mount() {
      const [THREE, { OrbitControls }, { RoomEnvironment }] = await Promise.all([
        import("three"),
        import("three/addons/controls/OrbitControls.js"),
        import("three/addons/environments/RoomEnvironment.js"),
      ]);
      if (disposed || !element) return;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
      // Register a basic disposer before allocating the rest of the scene.
      cleanup = () => {
        renderer.dispose();
        renderer.domElement.remove();
      };
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setClearColor(0x10110f, 0);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.45;
      const canvas = renderer.domElement;
      canvas.setAttribute(
        "aria-label",
        "Interactive chrome sculpture. Drag or use arrow keys to rotate; use the buttons below to change its shape.",
      );
      canvas.setAttribute("role", "img");
      canvas.tabIndex = 0;
      element.appendChild(canvas);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 50);
      camera.position.set(0, 0, 10.4);
      const pmrem = new THREE.PMREMGenerator(renderer);
      const room = new RoomEnvironment();
      const accentGeometry = new THREE.PlaneGeometry(8, 6);
      const accentMaterial = new THREE.MeshBasicMaterial({
        color: 0xbaff15,
        side: THREE.DoubleSide,
      });
      const accent = new THREE.Mesh(accentGeometry, accentMaterial);
      accent.position.set(3, -3, 1);
      accent.rotation.x = Math.PI / 2;
      room.add(accent);
      const environment = pmrem.fromScene(room, 0.04);
      scene.environment = environment.texture;
      room.dispose();
      accentGeometry.dispose();
      accentMaterial.dispose();
      pmrem.dispose();

      // Matching topology lets the actual surface flow between three studies.
      const shapes = [
        new THREE.TorusKnotGeometry(1.43, 0.43, 200, 28, 2, 3),
        new THREE.TorusKnotGeometry(1.3, 0.36, 200, 28, 1, 1),
        new THREE.TorusKnotGeometry(1.24, 0.3, 200, 28, 3, 5),
      ];
      const sculptureRadius = 2.3;
      for (const shape of shapes) {
        shape.center();
        shape.computeBoundingSphere();
        const radius = shape.boundingSphere?.radius;
        if (!radius) throw new Error("Sculpture geometry has no measurable bounds");
        const scale = sculptureRadius / radius;
        shape.scale(scale, scale, scale);
      }
      const geometry = shapes[0].clone();
      const material = new THREE.MeshPhysicalMaterial({
        color: 0xd8dfd0,
        metalness: 1,
        roughness: 0.19,
        clearcoat: 1,
        clearcoatRoughness: 0.12,
        envMapIntensity: 1.8,
      });
      const sculpture = new THREE.Mesh(geometry, material);
      const group = new THREE.Group();
      group.rotation.set(0.35, -0.3, -0.4);
      group.add(sculpture);
      scene.add(group);
      const rim = new THREE.DirectionalLight(0xe7ffac, 5);
      rim.position.set(4, -3, 2);
      scene.add(rim);

      const controls = new OrbitControls(camera, canvas);
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.enableDamping = true;
      controls.dampingFactor = 0.075;
      controls.rotateSpeed = 0.7;
      // Vertical touch gestures keep scrolling the page; horizontal ones turn the object.
      canvas.style.touchAction = "pan-y";

      let frame = 0;
      let visible = true;
      let previousTime = 0;
      let morphing = false;
      let selected = 0;
      let wire = false;
      let dragging = false;
      let settling = 0;
      const pointer = { x: 0, y: 0 };
      const tilt = { x: 0, y: 0 };
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

      const wake = () => {
        if (!frame && visible && !document.hidden && !disposed)
          frame = requestAnimationFrame(render);
      };
      const resize = () => {
        const { width, height } = element.getBoundingClientRect();
        if (!width || !height) return;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        // Fit a rotation-safe sphere to the tighter field of view, with breathing room.
        // All studies share this radius, so changing shape cannot crop or shrink the art.
        const verticalFov = THREE.MathUtils.degToRad(camera.fov);
        const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * camera.aspect);
        const distance =
          sculptureRadius / Math.sin(Math.min(verticalFov, horizontalFov) / 2) / 0.84;
        camera.position.setLength(distance);
        controls.saveState();
        camera.updateProjectionMatrix();
        wake();
      };
      function render(time: number) {
        frame = 0;
        if (disposed || !visible || document.hidden) return;
        const delta = Math.min((time - previousTime) / 1000, 0.04);
        previousTime = time;
        const current = settings.current;
        if (selected !== current.study) {
          selected = current.study;
          morphing = true;
        }
        if (wire !== current.wireframe) {
          wire = current.wireframe;
          material.wireframe = wire;
          material.color.setHex(wire ? 0xd9ff43 : 0xd8dfd0);
          material.metalness = wire ? 0 : 1;
          material.emissive.setHex(wire ? 0x70851e : 0x000000);
          material.emissiveIntensity = wire ? 0.8 : 0;
        }
        if (morphing) {
          const position = geometry.attributes.position;
          const target = shapes[selected].attributes.position.array;
          const values = position.array;
          const amount = reducedMotion.matches || !current.motion ? 1 : 1 - Math.exp(-delta * 7);
          let difference = 0;
          for (let i = 0; i < values.length; i++) {
            const distance = target[i] - values[i];
            difference = Math.max(difference, Math.abs(distance));
            values[i] += distance * amount;
          }
          position.needsUpdate = true;
          geometry.computeVertexNormals();
          geometry.computeBoundingSphere();
          morphing = difference > 0.002 && amount !== 1;
          if (!morphing) {
            values.set(target);
            position.needsUpdate = true;
            geometry.computeVertexNormals();
          }
        }
        if (current.motion && !dragging) {
          sculpture.rotation.y += delta * 0.1;
          sculpture.rotation.z += delta * 0.025;
        }
        tilt.x += ((current.motion ? pointer.x : 0) - tilt.x) * 0.045;
        tilt.y += ((current.motion ? pointer.y : 0) - tilt.y) * 0.045;
        group.rotation.x = 0.35 + tilt.y * 0.1;
        group.rotation.y = -0.3 + tilt.x * 0.18;
        controls.enableDamping = current.motion && !reducedMotion.matches;
        controls.update();
        renderer.render(scene, camera);
        if (current.motion || morphing || dragging || settling-- > 0) wake();
      }
      const move = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        const bounds = element.getBoundingClientRect();
        pointer.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
        pointer.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
        wake();
      };
      const leave = () => {
        pointer.x = 0;
        pointer.y = 0;
      };
      const start = () => {
        dragging = true;
        canvas.style.cursor = "grabbing";
        wake();
      };
      const end = () => {
        dragging = false;
        settling = 45;
        canvas.style.cursor = "";
        wake();
      };
      const change = () => wake();
      const keydown = (event: KeyboardEvent) => {
        if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home"].includes(event.key))
          return;
        event.preventDefault();
        if (event.key === "Home") {
          controls.reset();
          sculpture.rotation.set(0, 0, 0);
        } else {
          sculpture.rotation.y +=
            event.key === "ArrowLeft" ? -0.16 : event.key === "ArrowRight" ? 0.16 : 0;
          sculpture.rotation.x +=
            event.key === "ArrowUp" ? -0.16 : event.key === "ArrowDown" ? 0.16 : 0;
        }
        wake();
      };
      const contextLost = (event: Event) => {
        event.preventDefault();
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
        visible = false;
        element.dataset.ready = "false";
        onStatus("fallback");
      };
      const observer = new ResizeObserver(resize);
      observer.observe(element);
      const intersection = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
          if (visible) wake();
        },
        { rootMargin: "80px" },
      );
      intersection.observe(element);
      canvas.addEventListener("pointermove", move);
      canvas.addEventListener("pointerleave", leave);
      canvas.addEventListener("keydown", keydown);
      canvas.addEventListener("webglcontextlost", contextLost);
      controls.addEventListener("start", start);
      controls.addEventListener("end", end);
      controls.addEventListener("change", change);
      document.addEventListener("visibilitychange", wake);
      invalidate.current = () => {
        settling = 60;
        wake();
      };
      resize();
      renderer.render(scene, camera);
      element.dataset.ready = "true";
      onStatus("ready");
      cleanup = () => {
        if (frame) cancelAnimationFrame(frame);
        invalidate.current = () => {};
        observer.disconnect();
        intersection.disconnect();
        document.removeEventListener("visibilitychange", wake);
        canvas.removeEventListener("pointermove", move);
        canvas.removeEventListener("pointerleave", leave);
        canvas.removeEventListener("keydown", keydown);
        canvas.removeEventListener("webglcontextlost", contextLost);
        controls.removeEventListener("start", start);
        controls.removeEventListener("end", end);
        controls.removeEventListener("change", change);
        controls.dispose();
        geometry.dispose();
        for (const shape of shapes) shape.dispose();
        material.dispose();
        environment.dispose();
        renderer.dispose();
        canvas.remove();
      };
    }

    mount().catch(() => {
      cleanup();
      if (!disposed) onStatus("fallback");
    });
    return () => {
      disposed = true;
      cleanup();
    };
  }, [onStatus]);

  return (
    <div ref={host} className={styles.sculpture}>
      <img
        className={styles.fallback}
        src="/images/chrome-knot.webp"
        alt="An abstract polished chrome knot"
        width="1536"
        height="1024"
        fetchPriority="high"
      />
    </div>
  );
}
