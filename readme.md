# README - 3D Globe Visualization

This code is a JavaScript application for creating a 3D globe visualization using the Three.js library. The visualization includes a rotating Earth-like sphere with a custom shader for realistic texturing, an atmospheric halo, and a background of stars. It also allows users to interact with the globe by moving their mouse to change the rotation of the globe.

## Features
- Realistic 3D Earth-like sphere.
- Custom shader for detailed and textured appearance.
- Atmospheric halo effect around the sphere.
- Background filled with stars for a space-like ambiance.
- Interactive mouse movement to control the globe's rotation.

## Getting Started
1. Clone the repository to your local machine.
2. Ensure you have Node.js installed.
3. Navigate to the project directory and run `npm install` to install the required dependencies.
4. Open the `index.html` file in a web browser to view the 3D globe.

## Usage
- Move your mouse over the globe to interactively rotate it.
- Observe the realistic shading and texturing of the Earth-like sphere.
- Enjoy the atmospheric halo effect around the globe.
- Admire the stars in the background.

## Customization
You can customize this 3D globe visualization by making the following changes:

### Globe Texture
You can replace the default globe texture by replacing the image file located at `./img/globe.jpeg` with your own texture image. Ensure the new image has the same dimensions and projection.

### Shader Effects
You can modify the vertex and fragment shaders for both the globe and atmosphere effects by editing the corresponding `.glsl` files in the `./shaders/` directory. This allows you to create your own unique visual effects.

### Sphere Properties
You can adjust the properties of the Earth-like sphere by modifying the `sphere_geometry` and `shader_material` settings in the code. You can change the sphere's size, resolution, and other properties to fit your requirements.

### Stars
You can customize the star background by adjusting the number of stars, their color, and distribution by modifying the `star_material` and `star_vertices` settings in the code.

## Credits
- This code utilizes the [Three.js](https://threejs.org/) library for 3D graphics rendering.
- It also makes use of the [gsap](https://greensock.com/gsap/) library for smooth animations.

## License
This code is provided under the [MIT License](LICENSE), allowing for open use and modification.

Feel free to use and modify this code to create your own 3D globe visualizations or as a starting point for other 3D web projects. If you have any questions or suggestions, please feel free to reach out to the author.