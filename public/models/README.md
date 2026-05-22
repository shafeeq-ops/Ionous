# 3D Models

This folder holds the Blender-exported GLTF (`.glb`) models used by the
capability cards. The site auto-detects the presence of each file via a `HEAD`
request and falls back to procedural geometry when a model is absent.

## Expected filenames
- `space-infrastructure.glb` — a satellite (e.g. NASA TDRS, generic comms sat)
- `mission-systems.glb` — a launch vehicle or mission patch shape
- `enterprise-integration.glb` — a Deep Space Network antenna or comms array
- `software-engineering.glb` — *intentionally not provided*; this slug uses a
  procedural "orbital network" mesh by design.

## Export settings (from Blender)
- **Format**: glTF 2.0 (`.glb` binary)
- **Up axis**: Y-up
- **Scale**: 1.0 (bounding sphere ≤ 2 units works best with the Scene camera)
- **Include**: Selected only, Apply modifiers, Normals, UVs, Vertex colors
- **Materials**: Export, set roughness/metalness to taste (Scene tunes these)
- **Compression**: Draco (level 7, position quantization 14, normal 10)

## Optimize via gltf-transform
```bash
npx -y @gltf-transform/cli optimize input.glb space-infrastructure.glb \
  --texture-compress webp --simplify 0.5
```

## Sourcing public-domain / CC0 models
- NASA 3D Resources: <https://nasa3d.arc.nasa.gov/models>
- NASA Science 3D Models: <https://science.nasa.gov/resource/3d-models/>
- Poly Haven (CC0): <https://polyhaven.com/models>
- Sketchfab (filter to CC0): <https://sketchfab.com/3d-models?features=downloadable&licenses=cc0>
