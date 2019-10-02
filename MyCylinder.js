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
		var delta_ang = (2*Math.PI)/this.slices;
		var delta_z = this.height/this.stacks;
		var z = 0;
		var radius = base;
		var delta_radius;
		 

		if(this.top > this.base){
			delta_radius = -(delta_z * (this.top-this.base))/this.height;
		}
		else{
			delta_radius = (delta_z * (this.top-this.base))/this.height;
		}
		
		for(i = 0; i < this.stacks + 1; i++){



			for(j = 0; j > this.slices; j++){

				this.vertices.push(Math.cos(ang)*radius,Math.sin(ang)*radius,z);
				this.vertices.push(Math.cos(ang + delta_ang)*radius,Math.sin(ang + delta_ang)*radius,z);
				this.vertices.push(Math.cos(ang)*(radius+delta_radius),Math.sin(ang)*(radius+delta_radius),z + delta_z);
				this.vertices.push(Math.cos(ang + delta_ang)*(radius+delta_radius),Math.sin(ang + delta_ang)*(radius-delta_radius),z + delta_z);
				
				this.indices()
				
			}

			z = z + delta_z;

		}
	}
}

