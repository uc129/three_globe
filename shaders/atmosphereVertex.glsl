varying vec3 vertexNormal;//pass the normal to the fragment shader

void main(){
    vertexNormal=normalize(normal*normalMatrix);// comes from threee js default attributes
    gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);
}