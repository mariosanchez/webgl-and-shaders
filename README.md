## Glosary

- Shader: Tiny little program run on the GPU.
    - Fragment Shader: Used for rendering pixels and for coming up with the color for a pixel.
    - Vertex Shader: Used for rendering vertex and for coming up with the atributes for a vertex
    lilke its position in the space. It also can decices how a camera work (like isometric vs perspective).

- GLSL: OpenGL Shading Language is a strongly typed language you use to program shaders.

- Uniforms: Special type of properties of GLSL, that can no ve asigned, are read only and we can pass them with JavaScript, this is their pourpose. They are also not changing for each pixel of the surface, that's why they are called `uniform`.

- Attributes: Data contained in each of the vertex, like position, or color, texture coordinates, random numbers. You can have custom attrubutes, just have to declare it.

- [GPGPU](https://en.wikipedia.org/wiki/General-purpose_computing_on_graphics_processing_units) or General-purpose computing on graphics processing units.

- [Equirectangular images](https://www.google.com/search?q=equirectangular+image&tbm=isch&ved=2ahUKEwi3oPTFkdfpAhVcDWMBHeNrB_wQ2-cCegQIABAA&oq=equirectangular+image&gs_lcp=CgNpbWcQAzICCAAyBAgAEB4yBggAEAUQHjIGCAAQBRAeMgYIABAFEB4yBggAEAUQHjIGCAAQBRAeMgYIABAIEB4yBggAEAgQHjIGCAAQCBAeOgQIIxAnUK0mWIUvYOwvaABwAHgAgAGSAogBpgeSAQU2LjEuMZgBAKABAaoBC2d3cy13aXotaW1n&sclient=img&ei=HfzPXvedLtyajLsP49ed4A8&bih=981&biw=1920) or HDR maps are images that can be mapped onto a sphere.

- PBR or phisically based rendering texture maps 
    - Diffuse map: The colors of a texture.
    - Normal map: Gives us the information about the surface of a geometry and how it will react with light hitting it and bouncing off of it.
    - Metalness map: Defines which parts of the texture are more metalic and which are more rough. 

## Resources
- https://github.com/mattdesl/workshop-webgl-glsl - workshop-webgl-glsl
- https://three-demos.glitch.me/ - Three.js demos by [@mattdesl](https://twitter.com/mattdesl).
- https://freepbr.com/ - Free PBR textures.
- https://www.shadertoy.com/ - Browse shaders.