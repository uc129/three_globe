uniform sampler2D globeTexture;
varying vec2 vertexUV;//[0,0.24] x, y coordinates fro the flat image to be mapped to the sphere
varying vec3 vertexNormal;//normal of the vertex
void main(){
    
    // gl_FragColor=texture2D(globeTexture,vertexUV);   step 1: just display the texture
    
    // texture2D(globeTexture,vertexUV).xyz cretaes a vec3,  //.xyz restricts it to the first 3 elements of the vec4  // .xyz allows addition of alpha value to the color
    
    // gl_FragColor=vec4(texture2D(globeTexture,vertexUV).xyz,1.0); //step 2: display the texture with alpha value of 1
    
    // gl_FragColor=vec4(vec3(0,0,1)+texture2D(globeTexture,vertexUV).xyz,1); //step 3: display the texture with blue color and alpha value of 1
    
    float intensity=1.05-dot(vertexNormal,vec3(0.,0.,1.));
    
    vec3 atmosphere=vec3(.0824,.3725,.9098)*pow(intensity,1.5);
    
    gl_FragColor=vec4(atmosphere+texture2D(globeTexture,vertexUV).xyz,1);
    
}

