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
		this.id = id;
		this.base = base;
		this.top = top;
		this.height = height;
		this.slices = slices;
		this.stacks = stacks;

		this.initBuffers();
	}

	initBuffers() {
		this.vertices = [];
        this.indices = [];
        this.normals = [];
		this.texCoords = [];
		
		var delta_ang_slice =-(2*Math.PI)/this.slices;  // sentido negativo??? Angle variation in each slice
		var delta_z = this.height/this.stacks; 			// Stack's height
		var delta_radius;								// Radius variation in each stack
		var normal_ang;									// Angle between cylinder's normal and XOY plane 
		var delta = Math.abs(this.top-this.base);		// Difference between top and base radius
		
		// Initial values
		var radius = this.base;
		var z = 0;
		 
		if(this.top > this.base){
			delta_radius = (delta_z * delta)/this.height;
		}
		else{
			delta_radius = -(delta_z * delta)/this.height;
		}

		var alpha = Math.atan(delta/this.height);
		var beta = Math.PI/2 - alpha;
		normal_ang = Math.PI-(beta+Math.PI/2);
		
		for(var i = 0; i < this.stacks + 1; i++){

			var ang_slice = 0;

			for(var j = 0; j < this.slices; j++){

				this.vertices.push(Math.cos(ang_slice)*radius,Math.sin(ang_slice)*radius,z);
				
				this.normals.push(Math.cos(ang_slice),Math.sin(ang_slice),Math.sin(normal_ang));

				ang_slice += delta_ang_slice;
			}

			radius += delta_radius;

			z += delta_z;
		}

		for (var i = 0; i < this.stacks ; i++) {

			for (var j = 0; j < this.slices ; j++) {

				if (j == this.slices-1) {

					this.indices.push(i*this.slices + j,(i+1)*this.slices + j,(i+1)*this.slices);

					this.indices.push((i+1)*this.slices,i*this.slices,i*this.slices + j);
				} else {

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