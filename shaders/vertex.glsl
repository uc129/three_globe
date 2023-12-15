varying vec2 vertexUV;//pass the UV coordinates to the fragment shader
varying vec3 vertexNormal;//pass the normal to the fragment shader

void main(){
    vertexUV=uv;// comes from threee js default attributes
    vertexNormal=normalize(normal*normalMatrix);// comes from threee js default attributes
    gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);
}
