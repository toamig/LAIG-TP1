/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 * @param base - Cylinder base radius
 * @param top - Cylinder top radius
 * @param height - Cylinder height
 * @param slices - Cylinder slices
 * @param stacks - Cylinder stacks
 */

class MyCylinder extends CGFobject {
	constructor(scene, id, base, top, height, slices, stacks) {
		super(scene);
		this.base = base;
		this.top = top;
		this.height = height;
		this.slices = slices;
		this.stacks = stacks;

		this.initBuffers();
	}

	//Still not done from this point forward

	initBuffers() {
		this.vertices = [];
        this.indices = [];
        this.normals = [];
		this.texCoords = [];
		
		var ang = 0;
		var delta_ang =-(2*Math.PI)/this.slices; // sentido negativo???
		var delta_z = this.height/this.stacks;
		var z = 0;
		var radius = this.base;
		var delta_radius;
		var normal_ang;
		var delta;
		var alpha;
		var beta;

		if(this.top > this.base){
			delta = this.top-this.base;
		}
		else if(this.top < this.base){
			delta = this.base-this.top;
		}
		else{
			delta = 0;
		}

		alpha = Math.atan(delta/this.height);
		beta = Math.PI/2 - alpha;
		normal_ang = Math.PI-(beta+Math.PI/2);
		 

		if(this.top > this.base){
			delta_radius = -(delta_z * (this.top-this.base))/this.height;
		}
		else{
			delta_radius = (delta_z * (this.base - this.top))/this.height;
		}
		
		for(var i = 0; i < this.stacks + 1; i++){

			for(var j = 0; j < this.slices; j++){

				this.vertices.push(Math.cos(ang)*radius,Math.sin(ang)*radius,z);
				
				this.normals.push(Math.cos(ang),Math.sin(ang),Math.sin(normal_ang));

				ang = ang + delta_ang;
			}

			radius = radius + delta_radius;

			z = z + delta_z;

			ang = 0;

		}

		for (var i = 0; i < this.stacks ; i++) {
			for (var j = 0; j < this.slices ; j++) {
				if (j==this.slices-1) {
					this.indices.push(i*this.slices + j,(i+1)*this.slices + j,(i+1)*this.slices);
					this.indices.push((i+1)*this.slices,i*this.slices,i*this.slices + j);
				} else {
					//this.indices.push(i*this.slices + j,(i+1)*this.slices + j,(i+1)*this.slices+(j+1));
					//this.indices.push((i+1)*this.slices+(j+1),i*this.slices+j+1,i*this.slices + j);

					this.indices.push(i*this.slices+j+1,i*this.slices + j,(i+1)*this.slices+(j+1));
					this.indices.push((i+1)*this.slices+(j+1),i*this.slices + j,(i+1)*this.slices + j);
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