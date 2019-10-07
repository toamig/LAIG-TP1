/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 * @param radius - Sphere radius
 * @param slices - Sphere slices
 * @param stacks - Sphere stacks
 */
class MySphere extends CGFobject {
	constructor(scene, id, radius, slices, stacks) {
		super(scene);
		this.id = id;
		this.radius = radius;
        this.slices = slices;
        this.stacks = stacks;

		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [];
		this.indices = [];
		this.normals = [];
        this.texCoords = [];

        var delta_ang_slice = (2*Math.PI)/this.slices;
        var delta_ang_stack = (Math.PI/2)/this.stacks;
        var ang_slice = 0;
        var ang_stack = 0;
        
        for(var i = 0; i < this.stacks+1; i++){

            var stack_radius = this.radius * math.cos(ang_stack);

            for(var j = 0; j < this.slices; j++){

                if(i = 0){
                    this.vertices.push(stack_radius * Math.cos(ang_slice), stack_radius * Math.sin(ang_slice), this.radius * math.sin(ang_stack));
                    this.normals.push(stack_radius * Math.cos(ang_slice), stack_radius * Math.sin(ang_slice), this.radius * math.sin(ang_stack));
                }
                else if(i = this.stacks){
                    this.vertices.push(0, 0, this.radius);
                    this.normals.push(0, 0, 1);
                    this.vertices.push(0, 0, -this.radius);
                    this.normals.push(0, 0, -1);
                }
                else{
                    this.vertices.push(stack_radius * Math.cos(ang_slice), stack_radius * Math.sin(ang_slice), this.radius * math.sin(ang_stack));
                    this.normals.push(stack_radius * Math.cos(ang_slice), stack_radius * Math.sin(ang_slice), this.radius * math.sin(ang_stack));
                    this.vertices.push(stack_radius * Math.cos(ang_slice), stack_radius * Math.sin(ang_slice), -this.radius * math.sin(ang_stack));
                    this.normals.push(stack_radius * Math.cos(ang_slice), stack_radius * Math.sin(ang_slice), -this.radius * math.sin(ang_stack));
                }

                ang_slice += delta_ang_slice;
            }
            ang_stack += delta_ang_stack;
        }

        for(var i = 0; i < this.stacks; i++){

            for(var j = 0; j < this.slices; j++){

                if(i = 0){
                    if(j = this.slices-1){
                        
                    }
                    else{
                        this.indices.push(i*this.slices+j, (i+1)*this.slices+(j+2), (i+1)*this.slices+j);
                        this.indices.push()
                    }
                }
                else if(i = this.stacks-1){
                    if(j = this.slices-1){

                    }
                    else{

                    }
                }
                else{
                    if(j = this.slices-1){

                    }
                    else{

                    }
                }
            }
        }



		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

	/**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the rectangle
	 * @param {Array} coords - Array of texture coordinates
	 */
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}

